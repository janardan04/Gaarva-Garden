# 📋 Gaarva Garden — Required Information from Client

> **Status:** Currently the project has all 6 pages built (Home, Events, Booking, Contact, Admin Login, Admin Dashboard) with placeholder/dummy data. Below is everything we need from the client to make it production-ready.

---

## 1. 🏢 Business Details (Basic Info)

| # | Question | Currently Used (Placeholder) |
|---|----------|------------------------------|
| 1 | Full restaurant name & tagline | "Gaarva Garden Resto & Bar" |
| 2 | Complete address | "123 Garden Street, Kothrud, Pune, Maharashtra 411038" |
| 3 | Phone number(s) | +91 98765 43210 |
| 4 | Email address | info@gaarvagarden.com |
| 5 | Google Maps location link / embed URL | ❌ Missing — only a placeholder shown |
| 6 | About the restaurant (story, year founded, tagline) | Generic placeholder text |

---

## 2. ⏰ Operating Hours

| # | Question | Currently Used |
|---|----------|----------------|
| 1 | Weekday hours (Mon–Fri) | 11 AM – 11 PM |
| 2 | Weekend hours (Sat–Sun) | 10 AM – 12 AM |
| 3 | Is there a Happy Hour? If yes, timings? | 4 PM – 7 PM |
| 4 | Any closed days or holidays? | Not mentioned |

---

## 3. 🎉 Events Information

> Currently 8 placeholder events are listed. Client needs to confirm or provide the real events.

| # | Question |
|---|----------|
| 1 | What events does the restaurant actually host? (Live music, DJ nights, brunch, corporate, etc.) |
| 2 | For each event: **Name, Day/Date, Time, Starting Price, Description** |
| 3 | Which events should be marked as "Featured"? |
| 4 | Event categories to use (currently: Music, Food, Corporate, Celebration, Entertainment) |
| 5 | Do events have actual images/photos? If yes, provide them |
| 6 | Maximum guest capacity for events? (currently set to 500 in booking form) |

---

## 4. 🖼️ Images & Branding

| # | Question | Status |
|---|----------|--------|
| 1 | Restaurant logo (high-quality PNG/SVG) | ✅ Logo exists (`gaarva-logo.png`) — confirm if final |
| 2 | Photos of the venue (interior, garden, ambiance) | ❌ Missing — emoji placeholders used |
| 3 | Photos of events (live music, parties, food) | ❌ Missing |
| 4 | Food/menu photos | ❌ Not included |
| 5 | Brand colors — are they happy with the green theme? | Green theme currently used |
| 6 | Any specific font preference? | Currently using system defaults |

---

## 5. 🌐 Social Media Links

| # | Question | Currently Used |
|---|----------|----------------|
| 1 | Facebook page URL | `#` (placeholder) |
| 2 | Instagram profile URL | `#` (placeholder) |
| 3 | Twitter/X profile URL | `#` (placeholder) |
| 4 | Any other social media? (YouTube, WhatsApp Business, etc.) | Not listed |

---

## 6. 🔥 Firebase / Backend Setup

> Currently Firebase config is all placeholder values. This is **critical** for the app to actually work.

| # | Question |
|---|----------|
| 1 | Does the client have a Firebase project? If not, should we create one? |
| 2 | Do they want **Firebase Authentication** for admin login? (Currently hardcoded: `admin@gaarvagarden.com` / `admin123`) |
| 3 | Do they want **Firestore** to store booking requests & contact form submissions? |
| 4 | What should happen with booking submissions? (Email notification? WhatsApp message? Just store in database?) |
| 5 | What should happen with contact form submissions? (Same as above) |
| 6 | Admin credentials — what email/password should the real admin use? |

---

## 7. 📊 Admin Dashboard Features

| # | Question |
|---|----------|
| 1 | What data should the admin see? (Bookings, contact messages, analytics?) |
| 2 | Should admin be able to add/edit/delete events from the dashboard? |
| 3 | Should admin be able to approve/reject booking requests? |
| 4 | Do they need multiple admin accounts? |
| 5 | Do they want email/SMS notifications when a new booking comes in? |

---

## 8. 📑 Stats & Credibility Numbers

> Currently shown on the Home page — need real numbers:

| # | Question | Currently Used |
|---|----------|----------------|
| 1 | Total events hosted | 500+ |
| 2 | Average guest rating | 4.9★ |
| 3 | Years in business | 8+ |

---

## 9. 🚀 Deployment & Domain

| # | Question |
|---|----------|
| 1 | Do they have a custom domain? (e.g., gaarvagarden.com) |
| 2 | Where should the site be hosted? (Vercel, Netlify, Firebase Hosting, etc.) |
| 3 | Do they need SSL certificate setup? |
| 4 | Any SEO keywords they want to target? |

---

## 10. 📋 Additional Features (Ask if Needed)

| # | Question |
|---|----------|
| 1 | Do they want a **Menu/Food page** with their dishes and prices? |
| 2 | Do they want **online payment integration** for bookings? (Razorpay, etc.) |
| 3 | Do they want a **Gallery page** with venue/event photos? |
| 4 | Do they want **WhatsApp chat button** on the website? |
| 5 | Do they want **Google Reviews** integration? |
| 6 | Do they need multi-language support (Hindi/Marathi)? |

---

## ⚡ Priority Order for Client

> [!IMPORTANT]
> **Must-have first:** Items 1, 2, 4 (images), 5, 6 (Firebase), and 8
> **Nice-to-have:** Items 7, 9, 10
