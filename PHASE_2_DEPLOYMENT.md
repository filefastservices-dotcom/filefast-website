# Phase 2 — Quick Start Guide

## 🚀 Deployment in 5 Minutes

### Step 1: Update Vercel Environment Variables

Go to **vercel.com** → Your project → **Settings** → **Environment Variables**

Add these new variables:

```
NEXT_PUBLIC_RAZORPAY_KEY = your_razorpay_test_key
NEXT_PUBLIC_DEFAULT_LANGUAGE = en
```

If Razorpay key is not available yet, leave it empty (optional for now).

### Step 2: Push Phase 2 Code to GitHub

On your computer (with Git installed):

```bash
cd /path/to/filefast
git add .
git commit -m "Phase 2: Appointments, Payments, Blog/Testimonials Admin, Multi-language"
git push origin main
```

### Step 3: Vercel Auto-Deploys

Vercel automatically detects changes and redeploys in 3-5 minutes.

Check deployment status at: **vercel.com** → **Deployments**

Once you see ✅ "Production" status, your Phase 2 is LIVE!

---

## 📍 New Features Available Immediately

After deployment, these new pages are live:

### Public Pages (Users can access)
- **`/appointments`** — Book appointment form
- **`/payment-success`** — Payment confirmation
- **`/payment-failed`** — Payment error page
- **`/client-portal`** — Client dashboard (coming in Phase 3)

### Admin Pages (Only you can access with login)
- **`/admin/appointments`** — Manage all appointments
- **`/admin/blog`** — Create/edit/delete blog posts
- **`/admin/testimonials`** — Create/edit/delete testimonials
- **`/admin/payments`** — Track all payments and revenue

---

## 💳 Optional: Enable Razorpay Payments

To accept real online payments:

1. Go to **https://razorpay.com**
2. Sign up (free account, no setup fee)
3. Get your API keys from dashboard
4. Add key to Vercel environment variables: `NEXT_PUBLIC_RAZORPAY_KEY`
5. Redeploy by doing another `git push`

For now, payments work in "test mode" — no real money changes hands.

---

## 🌍 Multi-Language Feature

Your website now supports:
- **English** (en)
- **Tamil** (ta)
- **Hindi** (hi)

Language switcher appears in the bottom-right corner for users.

To change default language:
1. Edit `/src/lib/i18n.js`
2. Update `NEXT_PUBLIC_DEFAULT_LANGUAGE` in `.env.example`
3. Deploy

To add a new language:
1. Edit `/src/lib/i18n.js`
2. Add translations object for new language code
3. Add to `languages` array
4. Deploy

---

## 📊 What You Can Do Now

### Admin Dashboard (Log in at `/admin/login`)

1. **Services** → Already exists, manage all services
2. **Blog** → Create/edit/delete blog posts with SEO meta tags
3. **Testimonials** → Add client success stories
4. **Appointments** → View and manage appointment bookings
5. **Payments** → Track revenue, see payment status
6. **Leads** → View all contact form submissions

### Public Website

Users can now:
- Book appointments with preferred date/time
- Make online payments (once Razorpay is set up)
- Read blog posts
- View client testimonials
- Choose language (English/Tamil/Hindi)

---

## ❓ FAQ

**Q: Do I need Razorpay to deploy Phase 2?**
A: No. You can deploy without it. Payment records will be created and stored, but checkout won't work until Razorpay key is added.

**Q: Can users create accounts?**
A: Not yet. That's Phase 3. For now, appointments and payments require only basic contact info.

**Q: How do I add more languages?**
A: Edit `/src/lib/i18n.js` and add translations for new language code. It takes 5 minutes.

**Q: Will appointments send notifications?**
A: Not yet. Phase 3 will add email and SMS notifications.

---

## ✅ Verification Checklist

After deployment, verify these work:

- [ ] Visit `/appointments` — form appears
- [ ] Visit `/admin/appointments` — login required
- [ ] Create test appointment via form
- [ ] See it appear in `/admin/appointments`
- [ ] Log in to `/admin/blog` — create test post
- [ ] See post appear on `/blog` page
- [ ] Click language switcher — English/Tamil/Hindi options appear
- [ ] Visit `/admin/payments` — shows payment tracking (empty initially)

---

## 🎉 Done!

Your Phase 2 website is now LIVE with:
- ✅ Appointment booking
- ✅ Payment tracking
- ✅ Blog admin
- ✅ Testimonials admin
- ✅ Multi-language support

Next phase (Phase 3) will add:
- Client portal with login
- Email notifications
- SMS reminders
- Advanced analytics
