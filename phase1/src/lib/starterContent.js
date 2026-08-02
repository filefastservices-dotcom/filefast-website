// Public fallback content. It keeps the website useful before MongoDB is configured
// or while the admin collection is empty. Database records take precedence.
const baseService = (data) => ({
  _id: `starter-${data.slug}`,
  isPublished: true,
  pricingInfo: "Contact FileFast for current pricing and a document checklist.",
  eligibility: ["Individuals, proprietors, partnerships and companies, as applicable"],
  requiredDocuments: ["PAN card", "Aadhaar card", "Address proof", "Bank details"],
  processFlow: [
    { title: "Share your documents", description: "Send the required documents securely by WhatsApp or email." },
    { title: "We prepare and file", description: "Our team verifies the information and completes the application or return." },
    { title: "Receive confirmation", description: "We share the acknowledgement and guide you on the next steps." }
  ],
  faqs: [{ question: "How do I get started?", answer: "Call or WhatsApp FileFast to receive the exact checklist for your case." }],
  ...data
});

export const starterServices = [
  baseService({ name: "GST Registration", slug: "gst-registration", category: "GST Services", isFeatured: true, sortOrder: 1,
    shortDescription: "Get your business GST registered quickly and correctly.",
    fullDescription: "GST registration helps eligible businesses collect GST, issue tax invoices and claim input tax credit. FileFast reviews your details, prepares the application and supports you until your GSTIN is issued.",
    benefits: ["Legally collect GST from customers", "Claim eligible input tax credit", "Sell through e-commerce marketplaces"],
    relatedServiceSlugs: ["gstr-1-filing", "gstr-3b-filing"] }),
  baseService({ name: "GSTR-1 Filing", slug: "gstr-1-filing", category: "GST Services", sortOrder: 2,
    shortDescription: "Accurate monthly or quarterly filing of outward supplies.",
    fullDescription: "GSTR-1 reports sales and outward supplies. We reconcile invoices, prepare the return and file it within the applicable due date.",
    benefits: ["Timely return filing", "Clear invoice reporting", "Reduced risk of late fees"], relatedServiceSlugs: ["gstr-3b-filing", "gst-registration"] }),
  baseService({ name: "GSTR-3B Filing", slug: "gstr-3b-filing", category: "GST Services", sortOrder: 3,
    shortDescription: "Monthly summary GST return preparation and filing.",
    fullDescription: "GSTR-3B is the summary return used to declare GST liability and make payment. FileFast helps review your data and file the return accurately.",
    benefits: ["Stay GST compliant", "Track tax liability", "Avoid avoidable interest and penalties"], relatedServiceSlugs: ["gstr-1-filing", "gst-registration"] }),
  baseService({ name: "ITR Filing", slug: "itr-filing", category: "Income Tax Services", isFeatured: true, sortOrder: 4,
    shortDescription: "Accurate income-tax return filing for individuals and businesses.",
    fullDescription: "We prepare income-tax returns based on your income sources, deductions and supporting documents, then help you complete filing and verification.",
    benefits: ["Claim eligible deductions", "Meet filing deadlines", "Useful for loans and visa applications"], relatedServiceSlugs: ["tds-return-filing"] }),
  baseService({ name: "MSME Registration", slug: "msme-registration", category: "Business Registration", isFeatured: true, sortOrder: 5,
    shortDescription: "Udyam registration for small and medium enterprises.",
    fullDescription: "Udyam registration formally recognises eligible micro, small and medium enterprises and can help them access applicable schemes and benefits.",
    benefits: ["Access relevant MSME schemes", "Support for business finance", "Recognition for your enterprise"], relatedServiceSlugs: ["gem-registration"] }),
  baseService({ name: "FSSAI Registration", slug: "fssai-registration", category: "Licenses", isFeatured: true, sortOrder: 6,
    shortDescription: "Food-business registration and licence application support.",
    fullDescription: "Food businesses may need an FSSAI registration or licence depending on their scale and activity. FileFast helps identify the appropriate application and prepare it correctly.",
    benefits: ["Meet food-safety registration requirements", "Build customer confidence", "Guidance on the right licence category"], relatedServiceSlugs: ["gst-registration"] }),
  baseService({ name: "TDS Return Filing", slug: "tds-return-filing", category: "Compliance Services", sortOrder: 7,
    shortDescription: "Quarterly TDS return filing for employers and businesses.",
    fullDescription: "We help reconcile deductions, prepare quarterly TDS statements and support timely filing for applicable deductors.",
    benefits: ["Timely compliance", "Clear deduction reporting", "Support with filing acknowledgements"], relatedServiceSlugs: ["itr-filing"] }),
  baseService({ name: "Import Export Code (IEC) Registration", slug: "iec-registration", category: "Licenses", sortOrder: 8,
    shortDescription: "IEC application support for importers and exporters.",
    fullDescription: "An Import Export Code is generally required for businesses undertaking import or export activities. We assist with the application and documentation process.",
    benefits: ["Begin international trade formalities", "Guidance on documentation", "Online application support"], relatedServiceSlugs: ["gst-registration"] }),
  baseService({ name: "GeM Registration", slug: "gem-registration", category: "Digital Business Services", sortOrder: 9,
    shortDescription: "Register your business on the Government e-Marketplace.",
    fullDescription: "GeM registration helps eligible sellers participate in government procurement opportunities. FileFast supports profile setup and document preparation.",
    benefits: ["Reach government buyers", "Assistance with seller registration", "Guidance through the onboarding process"], relatedServiceSlugs: ["msme-registration"] })
];

// These are clearly-labelled examples, not claimed client endorsements. Replace them
// with verified client feedback through the admin dashboard when available.
export const starterTestimonials = [
  { _id: "starter-testimonial-1", clientName: "Sample client", clientRole: "Small-business owner", serviceUsed: "GST Registration", rating: 5, quote: "Example feedback: the GST registration process was explained clearly and the document checklist was easy to follow." },
  { _id: "starter-testimonial-2", clientName: "Sample client", clientRole: "Working professional", serviceUsed: "ITR Filing", rating: 5, quote: "Example feedback: the team made the tax-return process straightforward and answered questions promptly." },
  { _id: "starter-testimonial-3", clientName: "Sample client", clientRole: "Food-business owner", serviceUsed: "FSSAI Registration", rating: 5, quote: "Example feedback: helpful guidance on the licence application and documents required for our business." }
];

export const starterBlogPosts = [
  { _id: "starter-blog-1", slug: "gst-registration-documents-checklist", category: "GST", title: "GST Registration: Documents Checklist for New Businesses", excerpt: "A practical overview of the information commonly needed before starting a GST registration application.", content: "Starting a GST registration is easier when your documents are ready. Keep PAN and Aadhaar details, business address proof, bank account information and photographs available.\n\nThe exact requirements can vary by business type and premises. Before filing, verify that the address proof and bank details match the application information. If your business operates from a rented location, keep the relevant occupancy documents available.\n\nFileFast can review your documents and explain the steps that apply to your business before the application is submitted.", metaTitle: "GST Registration Documents Checklist | FileFast", metaDescription: "Prepare for GST registration with this simple document checklist." },
  { _id: "starter-blog-2", slug: "itr-filing-guide", category: "Income Tax", title: "A Simple Guide to Preparing for ITR Filing", excerpt: "Organise your income and deduction details before filing your income-tax return.", content: "Preparing early helps make ITR filing smoother. Collect Form 16 where applicable, interest certificates, capital-gains statements, rent receipts and proofs for eligible deductions.\n\nReview your information carefully before filing. The right return form depends on your income sources and taxpayer category, so a quick professional review can prevent common mistakes.\n\nAfter filing, complete verification within the applicable time limit and keep the acknowledgement for your records.", metaTitle: "ITR Filing Preparation Guide | FileFast", metaDescription: "Key documents and steps to prepare before filing your income-tax return." },
  { _id: "starter-blog-3", slug: "fssai-registration-basics", category: "Business Compliance", title: "FSSAI Registration Basics for Food Businesses", excerpt: "Understand why food businesses may need an FSSAI registration or licence.", content: "Food businesses must meet food-safety requirements that are appropriate to their activity and scale. The applicable FSSAI registration or licence can depend on factors such as turnover, type of business and location.\n\nBefore applying, identify the nature of your food activity and collect the related business and premises documents. Using the correct category from the beginning helps avoid delays.\n\nFileFast can help you assess the application route and prepare the required information.", metaTitle: "FSSAI Registration Basics | FileFast", metaDescription: "An introduction to FSSAI registration and licence requirements for food businesses." }
];
