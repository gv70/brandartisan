import { 
  type NewsletterSubscription, 
  type InsertNewsletterSubscription,
  type ConsultationRequest,
  type InsertConsultationRequest
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Newsletter subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  
  // Consultation requests
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
}

export class MemStorage implements IStorage {
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private consultationRequests: Map<string, ConsultationRequest>;

  constructor() {
    this.newsletterSubscriptions = new Map();
    this.consultationRequests = new Map();
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
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
}

export const storage = new MemStorage();
