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
import { z } from 'zod';

// Inline schemas to avoid module resolution issues
const insertNewsletterSubscriptionSchema = z.object({
  email: z.string().email(),
});

const insertConsultationRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  service: z.enum(['su-misura', 'collezione']),
});

const insertGiftRequestSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().optional(),
  nomeDestinatario: z.string().min(1),
  messaggio: z.string().optional(),
  importo: z.string().optional(),
});

type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
type NewsletterSubscription = InsertNewsletterSubscription & {
  id: string;
  subscribedAt: Date;
};

type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
type ConsultationRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  service: 'su-misura' | 'collezione';
  createdAt: Date;
};

type InsertGiftRequest = z.infer<typeof insertGiftRequestSchema>;
type GiftRequest = {
  id: string;
  nome: string;
  email: string;
  telefono: string | null;
  nomeDestinatario: string;
  messaggio: string | null;
  importo: string | null;
  createdAt: Date;
};

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
  // On Vercel, static files should be served by Vercel itself via outputDirectory
  // But we need to handle the SPA routing fallback for non-API routes
  // Try to find the static files directory in various locations
  const possibleBasePaths = [
    process.cwd(),
    "/var/task",
    path.resolve(process.cwd(), ".."),
    path.resolve(process.cwd(), "..", ".."),
  ];
  
  let staticBasePath: string | null = null;
  for (const basePath of possibleBasePaths) {
    const testPath = path.resolve(basePath, "dist", "public");
    console.log(`Checking path: ${testPath}, exists: ${fs.existsSync(testPath)}`);
    if (fs.existsSync(testPath)) {
      const indexPath = path.resolve(testPath, "index.html");
      console.log(`Checking index.html at: ${indexPath}, exists: ${fs.existsSync(indexPath)}`);
      if (fs.existsSync(indexPath)) {
        staticBasePath = testPath;
        console.log(`✓ Found static files at: ${staticBasePath}`);
        // List some files to verify
        try {
          const files = fs.readdirSync(testPath);
          console.log(`Files in static directory: ${files.slice(0, 5).join(", ")}...`);
        } catch (e) {
          console.error("Error reading directory:", e);
        }
        break;
      }
    }
  }
  
  if (staticBasePath) {
    // Serve static files with proper caching
    app.use(express.static(staticBasePath, {
      maxAge: '1y',
      etag: true,
      immutable: true,
    }));
    
    // Fallback to index.html for SPA routing (only for non-API, non-file requests)
    app.use("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Not found" });
      }
      
      // Check if it's a file request (has extension)
      if (req.path.match(/\.[a-zA-Z0-9]+$/)) {
        return res.status(404).send("File not found");
      }
      
      // Serve index.html for SPA routing
      const indexPath = path.resolve(staticBasePath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Not found");
      }
    });
  } else {
    console.warn("Static files directory not found. Tried paths:", possibleBasePaths.map(p => path.resolve(p, "dist", "public")).join(", "));
    // Fallback: serve a basic HTML page that tries to load assets
    app.use("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Not found" });
      }
      
      // For file requests, return 404
      if (req.path.match(/\.[a-zA-Z0-9]+$/)) {
        return res.status(404).send("File not found");
      }
      
      // For HTML requests, return a basic page
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="it">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mathilde Studio - Sartoria Artigianale</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 40px;
                background: #f8f6f4;
                color: #0b3d2e;
                text-align: center;
              }
              h1 { font-family: 'Playfair Display', serif; }
            </style>
          </head>
          <body>
            <h1>Mathilde Studio</h1>
            <p>Sartoria Artigianale Italiana</p>
            <p>L'applicazione è in caricamento...</p>
            <p style="font-size: 12px; color: #666;">Se questa pagina persiste, i file statici potrebbero non essere stati deployati correttamente.</p>
          </body>
        </html>
      `);
    });
  }
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

