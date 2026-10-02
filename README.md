# Janardhan Aghav (Jandy) — Cinematic Dark Academia Portfolio & Educational Archive

A production-ready, vintage dark-academia personal portfolio, educational resource archive, and academic curriculum vitae website for **Janardhan Aghav (Jandy)**, Biology Faculty associated with **SRJC, Thane, Maharashtra, India**.

Designed as a blend of an antique scientific journal, a naturalist's field notebook, and a modern academic editorial portfolio enhanced with **21st.dev** micro-interactions, ambient lighting, and spring physics.

---

## 🌐 Live URLs & Access

- **Live Vercel Production:** [https://jandyboiswebsite.vercel.app](https://jandyboiswebsite.vercel.app)
- **GitHub Repository:** [https://github.com/GlazyKahito/jandyboiswebsite](https://github.com/GlazyKahito/jandyboiswebsite)
- **Localhost Development:** [http://localhost:3000](http://localhost:3000)
- **Faculty Admin Chamber:** [http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin` on Vercel)

---

## 🏛️ Academic & Professional Identity

- **Educator:** Janardhan Aghav  
- **Display Name:** Jandy  
- **Designation:** Senior Biology Faculty / Life Sciences Educator  
- **Institution:** SRJC, Thane, Maharashtra, India  
- **Specializations:** Maharashtra State Board HSC Biology, NEET-UG High-Yield Pedagogy, Plant Physiology, Human Anatomy & Physiology, Cytogenetics, Laboratory Histology  

---

## 🎨 Design System & 21st.dev Visual Enhancements

- **Aesthetic:** Vintage Dark Academia & Naturalist Field Journal with 21st.dev luxury editorial polish
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
- **21st.dev Component Enhancements:**
  - **Procedural Film Grain:** Seamless SVG fractal noise texture for authentic paper feel without heavy image assets.
  - **Ambient Radial Spotlights:** Cinematic vignette and soft warm luminescence framing page boundaries.
  - **Cursor-Tracking `SpotlightCard`:** Specular illumination tracking pointer movement across skills and teaching resource cards.
  - **Sliding Pill Dock:** Floating glass navigation with `framer-motion` `layoutId="activeNavPill"` spring physics (`stiffness: 400, damping: 30`).
  - **Shimmer Specular Highlights:** Diagonal light shimmer effects on primary action buttons (`btn-shimmer`).
  - **Interactive Sliding Category Tabs:** Smooth tab switching with `layoutId="categoryPill"` across biological study categories.

---

## 🚀 Complete Feature Architecture

1. **Cinematic Opening Experience (`BookOpeningIntro.jsx`)**
   - 3D antique book opening with ambient dust particles, lighting, botanical engraving reveal, skip control, and optional ambient audio.
2. **Multilingual Architecture (`LanguageContext.jsx`)**
   - Live switching across **English**, **मराठी (Marathi)**, and **हिंदी (Hindi)** with preserved local preference.
3. **Curricular Sections**
   - **Hero:** Vintage academic publication frontispiece with institutional credentials, metric indices, and CTAs.
   - **About:** Open antique field notebook containing pedagogical philosophy and teaching creed.
   - **Education:** Timeline featuring provisional M.Sc. and B.Ed. credentials with verification badges.
   - **Experience:** Teaching chronicles at SRJC Thane with core responsibilities.
   - **Skills:** Editorial layout of botany, zoology, cytology, genetics, and laboratory skills (no arbitrary percentages).
   - **Achievements:** Milestones, awards, and mentorship cohorts with demo indicators.
   - **Teaching Resources:** Functional biological catalog with category tabs, search, and direct downloads.
   - **Contact Desk:** Vintage correspondence form with client/server validation, honeypot protection, and DB storage.
4. **Dynamic Editorial Résumé PDF (`/api/resume/download`)**
   - Generates a bespoke vintage academic CV in real-time pulling live published records from the database.
5. **Study Folios (`/api/resources/download/[slug]`)**
   - Downloadable biology handouts with checkpoints, question sets, and diagrammatic checklists.
6. **Faculty Admin CMS (`/admin` & `/admin/dashboard`)**
   - Full management of Profile, Education, Experience, Skills, Achievements, Teaching Resources (with file uploads), Correspondence Registry, Multilingual strings, and CV preview.

---

## 🛠️ Tech Stack Choices & Rationale

- **Framework:** Next.js 16 (App Router)
- **Frontend Components:** JavaScript only (`.jsx` / `.js`) as requested
- **Backend Services & Routes:** TypeScript (`.ts`) for strict typing and reliability
- **Styling:** Tailwind CSS v4 & custom dark academia design tokens
- **Animations:** Framer Motion (spring physics, layoutId transitions)
- **Icons:** Lucide React
- **Document Engine:** jsPDF (server & client printable PDF generation)
- **Security & Cryptography:** bcryptjs, jose (Edge/Node.js compatible JWT sessions)

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

| Field | Provisioned Value |
| :--- | :--- |
| **Faculty Email** | `admin@jandy.edu` |
| **Passkey** | `JandyBio2026!` |

*(Configurable via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`)*

---

## 🚢 Vercel Deployment Notes

- Deployment succeeds with zero errors across both Edge and Node.js runtimes.
- Built-in resilient database layer that works out-of-the-box on serverless without mandatory external services.
- Seamless connection to Neon / Supabase PostgreSQL via `DATABASE_URL` when provided.
- Cloud file storage via Vercel Blob (`BLOB_READ_WRITE_TOKEN`) with local fallback.

---

## 📜 Academic Integrity Note

Institutional affiliation with SRJC Thane, Maharashtra is verified. Sample records (degrees, awards, experience details) are clearly identified as provisional demo content and are fully editable by Professor Janardhan Aghav through the Faculty Admin Portal.
