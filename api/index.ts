// Vercel serverless function handler
// This wraps the Express app for Vercel deployment
import { app, initializeApp } from '../server/index';

// Ensure app is initialized before handling requests
let appReady = false;

export default async function handler(req: any, res: any) {
  if (!appReady) {
    await initializeApp();
    appReady = true;
  }
  return app(req, res);
}

