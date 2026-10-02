# Janardhan Aghav (Jandy) — Cinematic Dark Academia Portfolio & Educational Archive

A production-ready, vintage dark-academia personal portfolio, educational resource archive, and academic curriculum vitae website for **Janardhan Aghav (Jandy)**, Biology Faculty associated with **SRJC, Thane, Maharashtra, India**.

Designed as a blend of an antique scientific journal, a naturalist's field notebook, and a modern academic editorial portfolio.

---

## 🏛️ Project Overview

- **Educator:** Janardhan Aghav  
- **Display Name:** Jandy  
- **Designation:** Senior Biology Faculty / Life Sciences Educator  
- **Institution:** SRJC, Thane, Maharashtra, India  
- **Specializations:** Maharashtra State Board HSC Biology, NEET-UG High-Yield Pedagogy, Plant Physiology, Human Anatomy, Cytogenetics  

---

## 🎨 Design System & Aesthetic

- **Theme:** Vintage Dark Academia & Naturalist Field Journal
- **Color Palette:**
  - Deep Walnut Brown: `#211711`
  - Dark Espresso: `#302117`
  - Antique Bronze: `#A67C52`
  - Muted Gold: `#C1A477`
  - Warm Parchment: `#E8DCC5`
  - Aged Ivory: `#F2E9D7`
  - Muted Olive: `#73734E`
  - Charcoal: `#191715`
- **Typography:**
  - Headings: Cormorant Garamond
  - Body: Lora
  - Devanagari Scripts (Marathi & Hindi): Noto Serif Devanagari
- **Visual Features:**
  - 3D Animated Vintage Book Opening Sequence with realistic page turns and skip support
  - Subtle aged paper grain texture and ornamental borders
  - Naturalist woodcut engraving portrait & botanical laurel accents
  - Floating translucent glassmorphism navigation with bronze guidelines

---

## 🚀 Key Features

1. **Cinematic Opening Experience (`components/animations/BookOpeningIntro.jsx`)**
   - 3D antique book opening with ambient dust particles, lighting, botanical engraving reveal, and instant skip option.
2. **Multilingual Architecture (`context/LanguageContext.jsx`)**
   - Seamless live toggle between **English**, **मराठी (Marathi)**, and **हिंदी (Hindi)**.
   - Preserves user choice in browser storage.
3. **Curricular Sections**
   - **Hero:** Vintage academic publication frontispiece with institutional credentials.
   - **About:** Open antique field notebook containing biographical philosophy and teaching ethos.
   - **Education:** Qualifications timeline with M.Sc. and B.Ed. (marked with provisional verification badges).
   - **Experience:** Teaching chronicles at SRJC Thane with core responsibilities.
   - **Skills:** Editorial discipline layout (no arbitrary progress bars).
   - **Achievements:** Milestones and awards (clearly marked demo status).
   - **Teaching Resources:** Functional biological repository with category tabs, search, and instant PDF downloads.
   - **Contact Desk:** Vintage correspondence form with client and server-side validation, honeypot spam protection, and rate limiting.
4. **Dynamic Editorial Résumé PDF (`/api/resume/download`)**
   - Generates a bespoke vintage academic CV in real-time pulling live published records from the database.
5. **Dynamic Study Folio PDF Generator (`/api/resources/download/[slug]`)**
   - Generates printable study folios with checkpoints, question sets, and diagram checklists.
6. **Faculty Admin CMS (`/admin`)**
   - Secure authentication via email and password with `bcryptjs` and HTTP-only JWT cookies (`jose`).
   - Content management: Profile, Education, Experience, Skills, Achievements, Teaching Resources, Correspondence Inbox, Multilingual editor, and CV Studio.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend Components:** JavaScript only (`.jsx` / `.js`)
- **Backend Services & Routes:** TypeScript (`.ts`)
- **Styling:** Tailwind CSS v4 & custom dark academia design tokens
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Document Engine:** jsPDF
- **Security & Cryptography:** bcryptjs, jose

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GlazyKahito/jandyboiswebsite.git
   cd jandyboiswebsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment (Optional):**
   ```bash
   cp .env.example .env.local
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   - **Public Website:** `http://localhost:3000`
   - **Faculty Admin Desk:** `http://localhost:3000/admin`

---

## 🔐 Provisioned Faculty Credentials

- **Email:** `admin@jandy.edu`
- **Passkey:** `JandyBio2026!`

*(These can be customized in `.env.local` via `ADMIN_EMAIL` and `ADMIN_PASSWORD`)*

---

## 🚢 Deployment (Vercel)

The application is fully optimized for Vercel deployment:
- Edge & Node.js runtime compatible.
- Built-in resilient database layer that works out-of-the-box on serverless without mandatory external services.
- Optional seamless connection to Neon / Supabase PostgreSQL via `DATABASE_URL`.
- Optional cloud file storage via Vercel Blob (`BLOB_READ_WRITE_TOKEN`).

---

## 📜 Academic Integrity Note

Institutional affiliation with SRJC Thane, Maharashtra is verified. Sample records (degrees, awards, experience details) are clearly identified as provisional demo content and are fully editable by Professor Janardhan Aghav through the Faculty Admin Portal.
