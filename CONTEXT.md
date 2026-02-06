# Product Requirements Document (PRD)

## 1. Product Overview

### Product Name (Working)

**Wanderlist** – A Travel Bucket List Website

### Problem Statement

Many people dream of traveling but struggle to:

* Organize scattered travel ideas
* Discover destinations aligned with their interests
* Track trips they have completed vs. those they aspire to take
* Preserve memories and experiences in one meaningful place

Existing solutions are either too transactional (booking-focused) or too cluttered. There is a gap for a **calm, aspirational, and personal travel planning space**.

### Solution

A **web-based travel bucket list platform** that helps users create, manage, and reflect on their travel dreams. The product acts as a **personal travel journal + aspirational planner**, suitable for solo travelers, families, and casual dreamers.

### Primary Goal

Help users **create, manage, and track their travel bucket lists** in an elegant, intuitive, and emotionally engaging way.

---

## 2. Target Users & Personas

### Persona 1: The Solo Dreamer

**Demographics & Background**

* Age: 18–30
* Student or early-career professional
* Limited budget but strong desire to explore

**Travel Habits & Pain Points**

* Saves destinations across Instagram, Notes, and Google Maps
* Feels overwhelmed when planning
* Struggles to visualize long-term travel goals

**What They Want**

* A clean place to list dream destinations
* Inspiration without pressure to book immediately
* Visual progress tracking ("one day I’ll go")

---

### Persona 2: The Planner Traveler

**Demographics & Background**

* Age: 25–40
* Working professional or couple
* Takes 1–3 trips per year

**Travel Habits & Pain Points**

* Plans trips months in advance
* Wants structure but not complexity
* Loses track of completed vs. future trips

**What They Want**

* Organized bucket lists by category (countries, cities, experiences)
* Ability to mark destinations as completed
* A polished interface that feels premium

---

### Persona 3: The Family Explorer

**Demographics & Background**

* Age: 30–50
* Parents traveling with children

**Travel Habits & Pain Points**

* Plans trips around school holidays
* Needs shared visibility with family members
* Wants meaningful memory keeping

**What They Want**

* Shared bucket lists
* Simple progress tracking
* A memory-focused experience, not just planning

---

## 3. Core Features

### 3.1 User Accounts & Authentication

* Email + password authentication
* Optional social login (Google)
* Secure session management
* Password reset and email verification

### 3.2 User Profile Management

* Profile photo
* Short bio or travel philosophy
* Country of residence (optional)
* Travel stats:

  * Destinations planned
  * Destinations completed

### 3.3 Bucket List Creation & Management

* Create bucket list items:

  * Destination name
  * Country / region
  * Category (Dream, Planned, Completed)
  * Notes (why this place matters)
* Edit and delete items
* Reorder items via drag-and-drop

### 3.4 Discovery & Inspiration

* Curated destination suggestions
* Categories like:

  * Nature
  * Cities
  * Cultural experiences
* Minimal algorithmic pressure (inspiration over optimization)

### 3.5 Progress Tracking

* Visual indicators:

  * Completed vs. pending destinations
* Timeline or map-based view (future scope)
* Gentle celebratory micro-interactions when marking a trip completed

### 3.6 Sharing & Social (Lightweight)

* Shareable public bucket list link
* Optional private / public toggle
* No aggressive social feed (keeps experience personal)

---

## 4. User Flows

### Flow 1: New User Onboarding

1. Landing page
2. Sign up
3. Short onboarding (choose travel interests)
4. Create first bucket list item
5. Land on dashboard

### Flow 2: Add a Destination

1. Dashboard
2. “Add destination” CTA
3. Fill in destination details
4. Save
5. Destination appears as a card

### Flow 3: Mark Destination as Completed

1. Open destination card
2. Click “Mark as completed”
3. Optional reflection / note
4. Visual confirmation

---

## 5. UI / UX Requirements

### Design Principles

* Minimal, elegant, and calm
* Aspirational rather than transactional
* Emotion-driven storytelling

### Typography

* **Headings:** Playfair Display or Cormorant Garamond
* **Body:** Inter / Poppins / Source Sans 3
* Large headings, breathable line spacing

### Color System

* Background: Warm off-white (#FAFAF7)
* Primary accent: Forest green / muted teal (#1F3D3A / #2E5E5A)
* Secondary accent: Sand beige (#D6CFC4)
* Highlight: Muted terracotta (#C46A4A)
* Text: Charcoal gray

### Visual Elements

* Full-width immersive imagery
* Rounded cards with soft shadows
* Thin dividers, no harsh borders
* Outline icons only

### Interaction Design

* Subtle hover states
* Gentle animations (fade, slide)
* No visual clutter

---

## 6. Platform & Technical Scope

* **Platform:** Web-only (responsive)
* Desktop-first, mobile-friendly
* Modern browsers support

---

## 7. Performance Requirements

* Page load time < 2 seconds
* Smooth interactions (60 FPS animations)
* Optimized image loading (lazy loading)
* Reliable session handling

---

## 8. Success Metrics (KPIs)

* User sign-up conversion rate
* Average bucket list items per user
* Monthly active users (MAU)
* Percentage of users marking destinations completed
* Return visits per user

---

## 9. Risks & Constraints

* Overcomplicating features may reduce emotional appeal
* Too much social functionality may break the personal feel
* Image-heavy UI could impact performance if not optimized

---

## 10. Future Enhancements

* Interactive world map view
* Collaborative family bucket lists
* Travel memory uploads (photos, journals)
* AI-powered destination suggestions
* Mobile app version

---

## 11. Non-Goals

* Direct booking or pricing comparison
* Aggressive social networking
* Complex trip itineraries

---

## 12. Summary

This product aims to be a **quiet, beautiful space for dreaming about travel** — not rushing it. It prioritizes emotional connection, clarity, and long-term engagement over short-term transactions.

this is the stack:

Next.js (React)

Tailwind CSS

Prisma ORM

PostgreSQL

Auth.js

Next.js API Routes