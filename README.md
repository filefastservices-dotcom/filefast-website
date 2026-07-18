# FileFast Website — Global Tax & Compliance

A Next.js + MongoDB website for FileFast with a dynamic service management
system and admin dashboard. Everything below can be done from your phone's
browser — no laptop, no installing Node.js on your device required.

## What's included

- Public site: Home, Services (filterable by category), dynamic service pages,
  About Founder, Testimonials, Blog, Contact
- Dynamic Service Management System: add/edit/delete/publish services from the
  admin panel — each one automatically gets its own SEO-friendly page at
  `/services/your-slug`. No code changes needed, ever.
- Lead capture: every contact/service form submission is saved to MongoDB
- Admin Dashboard: secure login, full Services CRUD, Leads list with search
  and CSV export
- WhatsApp floating button, Call Now buttons throughout
- SEO: per-service meta titles/descriptions/keywords, auto-generated
  sitemap.xml and robots.txt
- Starter content: 9 pre-written services ready to seed into the database
- Global Tax page for India, UK, US and EU market expansion, with VAT/sales-tax, income-tax and cross-border compliance coordination positioning

## What's next (Phase 2 — same patterns, quick to add)

- Admin UI for Blog posts and Testimonials (the database models and public
  pages already exist; only the admin forms are left, built the same way as
  the Services admin form)
- Multi-language (Tamil/Hindi)
- Client portal, online payments, appointment booking

---

## Part 1 — Get the code onto GitHub (from your phone)

1. Go to **github.com** in your phone's browser and sign in (or create a free
   account).
2. Tap **+** → **New repository**. Name it `filefast-website`. Keep it
   Private if you prefer. Create it.
3. On the new repo page, tap **Add file → Upload files**.
4. From this chat, download the `filefast-website.zip` file I've attached,
   unzip it (most phone file managers can unzip — look for "Extract" when you
   tap the zip file), then upload all the extracted files and folders into
   GitHub using the uploader. GitHub's mobile web uploader accepts whole
   folders on most browsers; if yours doesn't, upload file-by-file starting
   with the `src` folder.
5. Commit the upload.

## Part 2 — Create your free MongoDB database

1. Go to **mongodb.com/cloud/atlas/register** and create a free account.
2. Create a free **M0 cluster** (no credit card needed).
3. Under **Database Access**, create a database user with a username and
   password — save these somewhere safe.
4. Under **Network Access**, add IP address `0.0.0.0/0` (allow access from
   anywhere) so Vercel can connect.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/filefast?retryWrites=true&w=majority`
   Replace `USERNAME` and `PASSWORD` with what you created in step 3.

## Part 3 — Deploy to Vercel (free hosting, built for Next.js)

1. Go to **vercel.com** and sign up using your GitHub account.
2. Tap **Add New → Project**, then select your `filefast-website` repo.
3. Before deploying, open **Environment Variables** and add:
   | Key | Value |
   |---|---|
   | `MONGODB_URI` | the connection string from Part 2 |
   | `ADMIN_EMAIL` | the email you want to log into /admin with |
   | `ADMIN_PASSWORD` | a strong password |
   | `JWT_SECRET` | any random 32+ character string |
   | `NEXT_PUBLIC_SITE_URL` | `https://filefast.in` (or your vercel.app URL for now) |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919444614182` |
4. Tap **Deploy**. Vercel builds and gives you a live URL in a couple of
   minutes, e.g. `filefast-website.vercel.app`.

## Part 4 — Add your starter services

You don't need a terminal for this — once deployed, just log into
`/admin/login` with the email/password you set above, and use **Add New
Service** to create each one. Use the content in `scripts/seed.js` in this
project as ready-made copy you can paste in for the first 9 services (GST
Registration, ITR Filing, MSME Registration, FSSAI Registration, etc.) —
just copy each field across.

(If you ever get access to a computer, running `npm run seed` will insert all
9 automatically in one go.)

## Part 5 — Connect your domain filefast.in

1. In your Vercel project, go to **Settings → Domains**, add `filefast.in`.
2. Vercel shows you DNS records to add. Log into wherever you bought
   filefast.in (GoDaddy, Hostinger, etc.) from your phone browser, go to DNS
   settings, and add the records Vercel shows you.
3. DNS changes can take a few hours to apply.

---

## Using the Admin Panel day-to-day

- Go to `filefast.in/admin/login`
- **Services** tab: Add New Service → fill in the form → Create. The page
  goes live immediately at `/services/your-slug`.
- Toggle **Published/Unpublished** any time without deleting.
- **Leads** tab: see every form submission, search by name/mobile/email, tap
  **Export CSV** to download all leads as a spreadsheet.

## A note on the admin login

This Phase 1 build uses a single admin email/password (set as environment
variables) rather than a full user-management system. It's secure for one
or two people running the site. If you'll have multiple staff logging in
with separate accounts later, that's a Phase 2 addition.

## Local development (if you later get a laptop)

```
npm install
cp .env.example .env.local   # then fill in your real values
npm run dev
```

Visit http://localhost:3000
