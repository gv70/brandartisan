# Replit.md

## Overview

Mathilde is a contemporary Italian sartorial brand website built as a React/Express full-stack application. The project showcases an artisanal tailoring business specializing in custom menswear and womenswear with a focus on minimalist design, sustainable practices, and personalized craftsmanship. The website features elegant animations, newsletter subscriptions, consultation booking functionality, and a sophisticated design system inspired by Nordic minimalism with Mediterranean warmth.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Single-page application using React with TypeScript, built with Vite for fast development and optimized production builds
- **Component System**: Modular architecture with shadcn/ui components for consistent design language
- **Styling**: Tailwind CSS with custom design tokens for brand colors (cream, sand, stone, charcoal, navy, sage)
- **Typography**: Google Fonts integration with Playfair Display (serif) for headings and Inter (sans-serif) for body text
- **Animations**: Custom scroll reveal animations and intersection observer-based effects for engaging user experience
- **State Management**: TanStack Query for server state management and form handling
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Express.js Server**: RESTful API server with middleware for logging, JSON parsing, and error handling
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development, designed to be easily swapped for database integration
- **API Endpoints**: Newsletter subscription and consultation request handling with validation
- **Development Setup**: Vite middleware integration for hot module replacement during development

### Database Schema (Drizzle ORM)
- **Newsletter Subscriptions**: Email storage with timestamps and unique constraints
- **Consultation Requests**: Customer inquiry system with contact details, service type, and message fields
- **PostgreSQL Ready**: Drizzle configuration set up for PostgreSQL with Neon database integration

### UI/UX Design System
- **Minimalist Aesthetic**: Clean layouts with generous white space and neutral color palette
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: Semantic HTML, proper ARIA labels, and keyboard navigation support
- **Animation Philosophy**: Subtle scroll-triggered animations that enhance rather than distract from content

## External Dependencies

### Core Framework Dependencies
- **React & TypeScript**: Frontend framework with type safety
- **Express.js**: Backend server framework
- **Vite**: Build tool and development server
- **Drizzle ORM**: Database ORM with PostgreSQL support

### UI Component Libraries
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component system built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL database (configured but not actively used)
- **@neondatabase/serverless**: Database driver for Neon integration

### Development & Build Tools
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### Animation & Interaction Libraries
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for API endpoints and forms
- **Embla Carousel**: Carousel component for image galleries

### Fonts & Assets
- **Google Fonts**: Playfair Display and Inter font families
- **Unsplash Images**: High-quality stock photography for content sections

### Development Environment
- **Replit Integration**: Custom Replit plugins for development environment
- **Hot Module Replacement**: Vite-powered development server with instant updates