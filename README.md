# 🦷 Roots Dental Care — Official Website

A modern, fully responsive dental clinic website built with **React**, **TypeScript**, and **Tailwind CSS** for **Roots Dental Care**, Hubballi, Karnataka.

---

## 🏥 About the Clinic

**Roots Dental Care**
1st floor, Hubli Central Mall, above Vishal Mega Mart,
beside Shushruta Hospital, Vidya Nagar, Hubballi
Dharwad – 580021

📞 +91 8904481179
🕐 Mon–Sat: 10:00 AM – 2:00 PM & 5:00 PM – 9:00 PM

---

## ✨ Features

- **Fully Responsive** — optimised for mobile, tablet, and desktop
- **Smooth Scroll Navigation** — header nav links scroll to each section with offset for the fixed header
- **Live Open/Closed Status** — hero section shows real-time clinic open/closed status based on current time
- **Click-to-Call** — phone number is a direct `tel:` link on mobile
- **WhatsApp Booking** — contact form sends pre-filled appointment details directly to the clinic's WhatsApp
- **Floating WhatsApp Button** — persistent enquiry button visible on all pages
- **Native Share** — Share button uses Web Share API on mobile; falls back to clipboard copy on desktop with a "Link Copied!" confirmation
- **Google Maps Embed** — live map pinned to the clinic location
- **Get Directions** — links directly to Google Maps navigation
- **FAQ Accordion** — 14 common dental questions with smooth expand/collapse
- **Services Carousel** — infinite-scroll carousel of 27 treatments, desktop (3-up) and mobile (1-up)
- **Social Links** — Facebook, Instagram, and WhatsApp

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.tsx       # Fixed nav bar with mobile hamburger menu
│   ├── Hero.tsx         # Landing section with clinic info, hours, directions
│   ├── About.tsx        # About the clinic
│   ├── Doctors.tsx      # Meet the doctors
│   ├── Services.tsx     # 27-treatment infinite carousel
│   ├── Gallery.tsx      # Photo gallery
│   ├── FAQ.tsx          # Accordion FAQ (14 Q&A)
│   ├── Contact.tsx      # Booking form + map + clinic info
│   └── Footer.tsx       # Links, social icons, contact info
├── App.tsx              # Root component + floating WhatsApp button
└── main.tsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/roots-dental-care.git
cd roots-dental-care
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Build tool |
| Lucide React | Icons |

---

## 📱 Pages / Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Clinic info, hours, ratings, directions |
| About | `#about` | Clinic background and philosophy |
| Doctors | `#doctors` | Doctor profiles |
| Treatments | `#services` | 27 dental services carousel |
| Gallery | `#gallery` | Clinic photo gallery |
| FAQ | `#faq` | 14 frequently asked questions |
| Contact | `#contact` | Appointment booking + Google Maps |

---

## 📲 WhatsApp Integration

The **Book via WhatsApp** button in the Contact section sends a pre-filled message to **+91 8904481179** with the patient's:
- Full Name
- Phone Number
- Selected Service
- Additional Message

The **floating WhatsApp button** (bottom-right, all pages) opens a general enquiry message.

---

## 🌐 Deployment

This site can be deployed to any static hosting provider:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the dist/ folder to netlify.com/drop
```

### GitHub Pages
```bash
npm run build
# Push the dist/ folder contents to your gh-pages branch
```

---

## 📸 Assets

Place the following images in the `public/` folder:

| File | Usage |
|---|---|
| `roots-dental-logo.jpg` | Header & footer logo |
| `home.png` | Hero section illustration |

---

## 📬 Contact

For website-related queries, reach out via the clinic's WhatsApp: **+91 8904481179**

---

*Built with ❤️ for Roots Dental Care, Hubballi*
