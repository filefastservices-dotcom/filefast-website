// Run with: npm run seed
// Populates MongoDB with starter services, so the site isn't empty on first launch.
// Safe to run multiple times — it skips services that already exist (by slug).

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const services = [
  {
    name: "GST Registration",
    slug: "gst-registration",
    category: "GST Services",
    shortDescription: "Get your business GST registered quickly and correctly.",
    fullDescription:
      "GST registration is mandatory for businesses crossing the prescribed turnover limit, as well as for e-commerce sellers and certain other categories. FileFast handles the entire registration process for you.",
    benefits: ["Legally collect GST from customers", "Claim input tax credit", "Required to sell on most e-commerce platforms"],
    eligibility: ["Businesses with turnover above the threshold limit", "E-commerce sellers", "Interstate suppliers"],
    requiredDocuments: ["PAN Card", "Aadhaar Card", "Business address proof", "Bank account details", "Passport size photo"],
    processFlow: [
      { title: "Document Collection", description: "We collect and verify your documents" },
      { title: "Application Filing", description: "We file your GST application on the GST portal" },
      { title: "GSTIN Issued", description: "Receive your GST number, typically in 3-7 working days" }
    ],
    pricingInfo: "Contact us for current pricing",
    faqs: [{ question: "How long does it take?", answer: "Usually 3-7 working days." }],
    isFeatured: true,
    sortOrder: 1
  },
  {
    name: "GSTR-1 Filing",
    slug: "gstr-1-filing",
    category: "GST Services",
    shortDescription: "Monthly/quarterly outward supply return filing.",
    benefits: ["Stay compliant", "Avoid late fees"],
    pricingInfo: "Contact us for current pricing",
    sortOrder: 2
  },
  {
    name: "GSTR-3B Filing",
    slug: "gstr-3b-filing",
    category: "GST Services",
    shortDescription: "Monthly summary GST return filing.",
    benefits: ["Stay compliant", "Avoid penalties"],
    pricingInfo: "Contact us for current pricing",
    sortOrder: 3
  },
  {
    name: "ITR Filing",
    slug: "itr-filing",
    category: "Income Tax Services",
    shortDescription: "Accurate, on-time income tax return filing for individuals and businesses.",
    benefits: ["Avoid penalties", "Claim eligible deductions", "Needed for loan and visa applications"],
    pricingInfo: "Contact us for current pricing",
    isFeatured: true,
    sortOrder: 4
  },
  {
    name: "MSME Registration",
    slug: "msme-registration",
    category: "Business Registration",
    shortDescription: "Register your business as an MSME (Udyam) and unlock government benefits.",
    benefits: ["Access to government schemes", "Easier loans at lower interest", "Protection against delayed payments"],
    pricingInfo: "Contact us for current pricing",
    isFeatured: true,
    sortOrder: 5
  },
  {
    name: "FSSAI Registration",
    slug: "fssai-registration",
    category: "Licenses",
    shortDescription: "Mandatory food business license for restaurants, food sellers and manufacturers.",
    benefits: ["Legally required to sell food", "Builds customer trust"],
    pricingInfo: "Contact us for current pricing",
    isFeatured: true,
    sortOrder: 6
  },
  {
    name: "TDS Return Filing",
    slug: "tds-return-filing",
    category: "Compliance Services",
    shortDescription: "Quarterly TDS return filing for businesses deducting tax at source.",
    pricingInfo: "Contact us for current pricing",
    sortOrder: 7
  },
  {
    name: "Import Export Code (IEC) Registration",
    slug: "iec-registration",
    category: "Licenses",
    shortDescription: "Mandatory code for businesses involved in import or export.",
    pricingInfo: "Contact us for current pricing",
    sortOrder: 8
  },
  {
    name: "GeM Registration",
    slug: "gem-registration",
    category: "Digital Business Services",
    shortDescription: "Register on the Government e-Marketplace to sell to government buyers.",
    pricingInfo: "Contact us for current pricing",
    sortOrder: 9
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found. Add it to .env.local first.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  for (const s of services) {
    const exists = await Service.findOne({ slug: s.slug });
    if (exists) {
      console.log(`Skipping (already exists): ${s.name}`);
      continue;
    }
    await Service.create(s);
    console.log(`Created: ${s.name}`);
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
