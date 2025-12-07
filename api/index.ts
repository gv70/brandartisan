// Vercel serverless function handler
// This creates and initializes the Express app for Vercel deployment
import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { type Request, Response, NextFunction, type Express } from 'express';
import path from 'path';
import fs from 'fs';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/vite';

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

