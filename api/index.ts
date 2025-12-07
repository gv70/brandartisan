// Vercel serverless function handler
// This creates and initializes the Express app for Vercel deployment
import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { type Request, Response, NextFunction, type Express } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer, type Server } from 'http';
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';
import { insertNewsletterSubscriptionSchema, insertConsultationRequestSchema, insertGiftRequestSchema, type NewsletterSubscription, type InsertNewsletterSubscription, type ConsultationRequest, type InsertConsultationRequest, type GiftRequest, type InsertGiftRequest } from '@shared/schema';
import { z } from 'zod';

// Inline storage implementation to avoid module resolution issues
class MemStorage {
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private consultationRequests: Map<string, ConsultationRequest>;
  private giftRequests: Map<string, GiftRequest>;

  constructor() {
    this.newsletterSubscriptions = new Map();
    this.consultationRequests = new Map();
    this.giftRequests = new Map();
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const existingSubscription = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === insertSubscription.email
    );
    if (existingSubscription) {
      throw new Error("Email already subscribed");
    }
    const id = randomUUID();
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id,
      subscribedAt: new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email
    );
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = randomUUID();
    const request: ConsultationRequest = { 
      ...insertRequest, 
      id,
      message: insertRequest.message || null,
      phone: insertRequest.phone || null,
      createdAt: new Date()
    };
    this.consultationRequests.set(id, request);
    return request;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }

  async createGiftRequest(insertRequest: InsertGiftRequest): Promise<GiftRequest> {
    const id = randomUUID();
    const request: GiftRequest = { 
      ...insertRequest, 
      id,
      telefono: insertRequest.telefono || null,
      messaggio: insertRequest.messaggio || null,
      importo: insertRequest.importo || null,
      createdAt: new Date()
    };
    this.giftRequests.set(id, request);
    return request;
  }

  async getGiftRequests(): Promise<GiftRequest[]> {
    return Array.from(this.giftRequests.values());
  }
}

const storage = new MemStorage();

// Inline email service to avoid module resolution issues
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_EMAIL || 'info@mathildestudio.it',
      pass: process.env.OUTLOOK_PASSWORD || 'your-password'
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    },
    requireTLS: true,
    connectionTimeout: 60000
  });
};

async function sendGiftRequestEmail(giftData: InsertGiftRequest) {
  try {
    const transporter = createTransporter();
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0b3d2e; font-family: 'Playfair Display', serif;">Nuova Richiesta Buono Regalo - Mathilde</h2>
        <div style="background: #f8f6f4; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #0b3d2e; margin-top: 0;">Dati del Richiedente</h3>
          <p><strong>Nome:</strong> ${giftData.nome}</p>
          <p><strong>Email:</strong> ${giftData.email}</p>
          ${giftData.telefono ? `<p><strong>Telefono:</strong> ${giftData.telefono}</p>` : ''}
        </div>
        <div style="background: #efe3d4; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #0b3d2e; margin-top: 0;">Dettagli del Regalo</h3>
          <p><strong>Destinatario:</strong> ${giftData.nomeDestinatario}</p>
          ${giftData.importo ? `<p><strong>Importo desiderato:</strong> ${giftData.importo}</p>` : ''}
          ${giftData.messaggio ? `<p><strong>Messaggio personalizzato:</strong></p><div style="background: white; padding: 15px; border-radius: 5px; font-style: italic;">"${giftData.messaggio}"</div>` : ''}
        </div>
      </div>
    `;
    await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL || 'info@mathildestudio.it',
      to: 'info@mathildestudio.it',
      subject: `🎁 Nuova Richiesta Buono Regalo da ${giftData.nome}`,
      html: htmlContent
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending gift request email:', error);
    return { 
      success: false, 
      fallbackEmail: {
        to: 'info@mathildestudio.it',
        subject: `Richiesta Buono Regalo da ${giftData.nome}`,
        body: `Richiedente: ${giftData.nome}\nEmail: ${giftData.email}\nDestinatario: ${giftData.nomeDestinatario}`
      }
    };
  }
}

async function sendNewsletterSubscriptionEmail(subscriptionData: InsertNewsletterSubscription) {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL || 'info@mathildestudio.it',
      to: 'info@mathildestudio.it',
      subject: `📧 Nuova iscrizione newsletter: ${subscriptionData.email}`,
      html: `<div><h2>Nuova Iscrizione Newsletter</h2><p>Email: ${subscriptionData.email}</p></div>`
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending newsletter subscription email:', error);
    return { success: false };
  }
}

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Initialize app (only once)
let appReady = false;
let initPromise: Promise<void> | null = null;

// Register routes directly (to avoid module resolution issues)
async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      await sendNewsletterSubscriptionEmail(validatedData);
      res.json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email format" });
      } else if (error instanceof Error && error.message === "Email already subscribed") {
        res.status(409).json({ error: "Email already subscribed to newsletter" });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ error: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Consultation request endpoint
  app.post("/api/consultation/request", async (req, res) => {
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);
      res.json({ success: true, request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Consultation request error:", error);
        res.status(500).json({ error: "Failed to submit consultation request" });
      }
    }
  });

  // Get all consultation requests
  app.get("/api/consultation/requests", async (req, res) => {
    try {
      const requests = await storage.getConsultationRequests();
      res.json(requests);
    } catch (error) {
      console.error("Get consultation requests error:", error);
      res.status(500).json({ error: "Failed to fetch consultation requests" });
    }
  });

  // Gift request endpoint
  app.post("/api/gift/request", async (req, res) => {
    try {
      const validatedData = insertGiftRequestSchema.parse(req.body);
      const request = await storage.createGiftRequest(validatedData);
      const emailResult = await sendGiftRequestEmail(validatedData);
      
      if (emailResult.success) {
        res.json({ success: true, request, emailSent: true });
      } else {
        res.json({ 
          success: true, 
          request, 
          emailSent: false,
          fallbackEmail: emailResult.fallbackEmail
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Gift request error:", error);
        res.status(500).json({ error: "Failed to submit gift request" });
      }
    }
  });

  // Get all gift requests
  app.get("/api/gift/requests", async (req, res) => {
    try {
      const requests = await storage.getGiftRequests();
      res.json(requests);
    } catch (error) {
      console.error("Get gift requests error:", error);
      res.status(500).json({ error: "Failed to fetch gift requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Serve static files
function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    console.warn(`Build directory not found: ${distPath}`);
    return;
  }

  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

async function ensureAppReady() {
  if (appReady) return;
  
  if (!initPromise) {
    initPromise = (async () => {
      try {
        // Register routes
        await registerRoutes(app);
        
        // Serve static files in production
        serveStatic(app);
        
        appReady = true;
      } catch (error) {
        console.error('Failed to initialize app:', error);
        appReady = false;
        initPromise = null;
        throw error;
      }
    })();
  }
  
  await initPromise;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    await ensureAppReady();
    
    // Handle the request with Express app
    return new Promise<void>((resolve, reject) => {
      app(req as any, res as any, (err: any) => {
        if (err) {
          console.error('Express error:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

