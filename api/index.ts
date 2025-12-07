// Vercel serverless function handler
// This wraps the Express app for Vercel deployment
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app, initializeApp } from '../server/index';

// Ensure app is initialized before handling requests
let appReady = false;
let initPromise: Promise<void> | null = null;

async function ensureAppReady() {
  if (appReady) return;
  
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await initializeApp();
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
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

