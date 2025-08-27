import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriptionSchema, insertConsultationRequestSchema, insertGiftRequestSchema } from "@shared/schema";
import { sendGiftRequestEmail } from "./emailService";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
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

  // Get all consultation requests (for admin purposes)
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
      
      // Save to storage
      const request = await storage.createGiftRequest(validatedData);
      
      // Try to send email
      const emailResult = await sendGiftRequestEmail(validatedData);
      
      if (emailResult.success) {
        res.json({ success: true, request, emailSent: true });
      } else {
        // Email fallback - return data for client to open email app
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

  // Get all gift requests (for admin purposes)
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
