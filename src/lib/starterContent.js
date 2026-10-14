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
  baseService({
    name: "GST Registration",
    slug: "gst-registration",
    category: "GST Services",
    isFeatured: true,
    sortOrder: 1,
    shortDescription: "GST registration support for eligible businesses in Chennai and across India.",
    fullDescription: "GST registration gives eligible businesses a GST Identification Number (GSTIN) and supports compliance such as issuing GST tax invoices and reporting taxable supplies. FileFast helps you identify the appropriate registration route, prepare the application details, check supporting documents and respond to routine application requirements. Approval timelines and document requirements depend on the facts of the business and any GST department verification.",
    benefits: [
      "Understand whether GST registration applies to your business",
      "Prepare the application and supporting documents",
      "Get help with address proof and rented-premises documents",
      "Prepare for e-commerce seller and B2B compliance needs"
    ],
    eligibility: [
      "Businesses whose turnover or activity requires GST registration",
      "Certain e-commerce sellers and other persons required to register under GST law",
      "Businesses applying voluntarily after reviewing the implications"
    ],
    requiredDocuments: [
      "PAN details of the proprietor or business entity",
      "Aadhaar and contact details of the proprietor or authorised signatory, as applicable",
      "Business constitution proof, where applicable",
      "Principal place of business address proof",
      "Rent or lease agreement and owner consent/supporting proof, where applicable",
      "Bank account details or supporting proof when required",
      "Photograph and authorised signatory details, as applicable"
    ],
    processFlow: [
      { title: "Check eligibility and registration type", description: "Review the business activity, turnover, state and registration requirement." },
      { title: "Prepare the documents", description: "Check PAN, contact details, business address proof and entity documents." },
      { title: "Submit and track the application", description: "Prepare the portal application and assist with clarification or verification steps if requested." }
    ],
    pricingInfo: "Contact FileFast for the current professional fee and scope. Government fees, if applicable, and any separate statutory or third-party charges will be explained before work begins.",
    faqs: [
      { question: "What documents are required for GST registration?", answer: "Common documents include PAN, identity and contact details, business address proof, entity documents where applicable, and authorised signatory information. The exact list depends on the business type and premises." },
      { question: "What address proof is accepted for GST registration?", answer: "The appropriate proof depends on whether the premises are owned, rented, leased or used with consent. Keep the relevant ownership or occupancy document and supporting utility or property records available for review." },
      { question: "How long does GST registration take?", answer: "There is no guaranteed approval time. Processing depends on complete and consistent information, portal checks, verification and whether the department requests clarification." },
      { question: "Can an online seller apply for GST registration?", answer: "Some e-commerce and interstate business activities can trigger specific registration requirements. The correct position depends on the sales model, goods or services and applicable GST rules." }
    ],
    relatedServiceSlugs: ["gstr-1-filing", "gstr-3b-filing"],
    metaTitle: "GST Registration in Chennai",
    metaDescription: "Need GST registration in Chennai or elsewhere in India? Check common documents, business address proof and application steps with FileFast Global.",
    seoKeywords: "GST registration Chennai, documents required for GST registration, GST address proof, GSTIN registration online"
  }),
  baseService({
    name: "GSTR-1 Filing",
    slug: "gstr-1-filing",
    category: "GST Services",
    sortOrder: 2,
    shortDescription: "GSTR-1 sales return preparation and filing for monthly and QRMP taxpayers.",
    fullDescription: "GSTR-1 reports outward supplies such as B2B and B2C sales, exports, credit notes and applicable amendments. FileFast helps organise sales data, review invoice classifications and prepare the return for the applicable monthly or quarterly filing period. Final entries depend on your records and GST portal validations.",
    benefits: [
      "Organise B2B, B2C and export sales data",
      "Review credit notes, debit notes and amendments",
      "Prepare applicable HSN and e-commerce reporting",
      "Reduce avoidable errors before submission"
    ],
    eligibility: ["Registered taxpayers required to report outward supplies, subject to the applicable return scheme and exemptions"],
    requiredDocuments: [
      "GSTIN and return period",
      "Sales register and tax invoices",
      "Credit notes, debit notes and amendment details",
      "HSN summary and applicable e-invoice data",
      "E-commerce marketplace reports, where applicable",
      "Previous GSTR-1 and reconciliation notes"
    ],
    processFlow: [
      { title: "Collect sales records", description: "Gather invoices, credit/debit notes and marketplace or export reports." },
      { title: "Reconcile and prepare", description: "Review customer GSTINs, tax rates, invoice values and applicable reporting tables." },
      { title: "Review and file", description: "Confirm the prepared summary with you before submission and share the acknowledgement." }
    ],
    pricingInfo: "Nil GSTR-1 filing starts at ₹199. Returns with transactions generally start at ₹499; the final fee depends on invoice volume, complexity and the filing period. Confirm the fee before work begins.",
    faqs: [
      { question: "What documents are required for GSTR-1 filing?", answer: "Usually the sales register, tax invoices, credit/debit notes, export and e-commerce reports where applicable, HSN summary and previous return details are needed." },
      { question: "What is the GSTR-1 due date?", answer: "Monthly filers generally have a due date on the 11th of the following month, while QRMP quarterly filers generally have a quarterly due date on the 13th. Extensions and special cases can apply, so check the current GST portal due date for your period." },
      { question: "Can GSTR-1 be filed with no sales?", answer: "A Nil return may be appropriate when there are no reportable outward supplies or other entries for the period. Check the full facts, including credit notes, amendments and other reportable transactions, before filing Nil." }
    ],
    relatedServiceSlugs: ["gst-registration", "gstr-3b-filing"],
    metaTitle: "GSTR-1 Return Filing Services",
    metaDescription: "Get help preparing and filing GSTR-1. FileFast reviews sales invoices, credit notes, HSN and marketplace data for monthly or QRMP returns.",
    seoKeywords: "GSTR-1 filing, GSTR-1 return filing, GST sales return, GSTR-1 documents required"
  }),
  baseService({
    name: "GSTR-3B Filing",
    slug: "gstr-3b-filing",
    category: "GST Services",
    sortOrder: 3,
    shortDescription: "GST liability, eligible input tax credit and GSTR-3B return filing support.",
    fullDescription: "GSTR-3B is the summary return used by applicable taxpayers to report GST liability, eligible input tax credit and the resulting payment or other adjustments. FileFast helps reconcile sales summaries, purchase records and GSTR-2B before preparing the return. Tax liability and credit claims must be checked against the underlying documents and current rules.",
    benefits: [
      "Review output tax liability and tax-period figures",
      "Reconcile purchase records with GSTR-2B",
      "Review eligible input tax credit before reporting",
      "Prepare return figures and payment summary for review"
    ],
    eligibility: ["GST-registered taxpayers required to file GSTR-3B for the relevant tax period, subject to applicable rules"],
    requiredDocuments: [
      "GSTIN and return period",
      "Sales register and output tax summary",
      "Purchase register and expense invoices relevant to ITC",
      "GSTR-2B and previous GSTR-3B",
      "Credit/debit notes and adjustment details",
      "GST portal liability, cash ledger and credit ledger details"
    ],
    processFlow: [
      { title: "Collect sales and purchase data", description: "Gather sales, purchase, credit-note and portal reconciliation reports." },
      { title: "Reconcile liability and ITC", description: "Check output tax and review input tax credit eligibility against available records." },
      { title: "Confirm figures and file", description: "Review the liability and payment summary with you before filing." }
    ],
    pricingInfo: "Nil GST return filing starts at ₹199. Returns with transactions generally start at ₹499; the final fee depends on transaction volume, reconciliation requirements and the filing period. Confirm the fee before work begins.",
    faqs: [
      { question: "What documents are needed for GSTR-3B?", answer: "Common records include the sales and purchase registers, GSTR-2B, relevant invoices and credit notes, the previous GSTR-3B, and GST portal liability and ledger details." },
      { question: "Can I claim all ITC shown in GSTR-2B?", answer: "No. GSTR-2B is an important reconciliation source, but eligibility, restrictions, business use and other applicable conditions still need to be checked before claiming credit." },
      { question: "Can GSTR-3B be filed as Nil?", answer: "Only use a Nil return when the facts and portal rules support it. Check output liability, inward supplies, ITC, adjustments and any other reportable amounts for the period first." }
    ],
    relatedServiceSlugs: ["gst-registration", "gstr-1-filing"],
    metaTitle: "GSTR-3B Filing & GST Return Support",
    metaDescription: "Get GSTR-3B filing support with GST liability review, GSTR-2B reconciliation and input tax credit checks from FileFast Global.",
    seoKeywords: "GSTR-3B filing, GST return filing, GSTR-3B documents required, GST ITC reconciliation"
  }),
  baseService({
    name: "ITR Filing",
    slug: "itr-filing",
    category: "Income Tax Services",
    isFeatured: true,
    sortOrder: 4,
    shortDescription: "Online income-tax return filing support for salaried individuals, freelancers and eligible businesses.",
    fullDescription: "The correct income-tax return depends on your taxpayer category, income sources and applicable filing rules. FileFast helps organise income information, review tax statements and supporting documents, identify the relevant return preparation route and guide you through filing and verification. Complex business, capital-gains or international-income cases may need additional review.",
    benefits: [
      "Organise income and tax deduction records",
      "Review AIS, TIS and Form 26AS information",
      "Identify documents relevant to deductions and tax credits",
      "Keep the filed return and acknowledgement for your records"
    ],
    eligibility: ["Individuals and eligible taxpayers who need assistance preparing and filing an income-tax return"],
    requiredDocuments: [
      "PAN and Aadhaar details, as applicable",
      "Form 16 and salary details, where applicable",
      "Annual Information Statement (AIS), TIS and Form 26AS",
      "Bank interest and other income statements",
      "Capital gains, securities or property transaction statements, if applicable",
      "Proofs for eligible deductions and tax-saving claims",
      "Business or professional income records, where applicable"
    ],
    processFlow: [
      { title: "Understand your income sources", description: "Identify salary, interest, capital gains, business or other income." },
      { title: "Review documents and tax details", description: "Compare your records with AIS, TIS, Form 26AS and supporting statements." },
      { title: "Prepare, review and file", description: "Confirm the return details, complete filing and follow the applicable verification steps." }
    ],
    pricingInfo: "The professional fee depends on your income sources, return type and complexity. FileFast will confirm the scope and fee before starting.",
    faqs: [
      { question: "What documents are required for ITR filing?", answer: "The list depends on your income sources. Common records include PAN, Form 16 where applicable, AIS, TIS, Form 26AS, bank interest statements, capital-gains statements and proofs for eligible deductions." },
      { question: "Which ITR form should I use?", answer: "The appropriate form depends on your taxpayer status and income sources, including business or professional income, capital gains and other conditions. Review the current income-tax department instructions before selecting a form." },
      { question: "Do I need to verify my ITR after filing?", answer: "Yes, where verification is required, complete it within the applicable deadline and keep the acknowledgement for your records." }
    ],
    relatedServiceSlugs: ["tds-return-filing"],
    metaTitle: "ITR Filing Services in Chennai",
    metaDescription: "Get online ITR filing help in Chennai and across India. Organise Form 16, AIS, Form 26AS, bank interest and deduction documents with FileFast Global.",
    seoKeywords: "ITR filing Chennai, income tax return filing, documents required for ITR filing, online ITR filing help"
  }),
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

  baseService({
    name: "UK VAT Registration & Returns Support",
    slug: "uk-vat-compliance",
    category: "Global Tax & VAT",
    sortOrder: 20,
    shortDescription: "UK VAT registration readiness, return preparation support and compliance coordination for businesses selling into the United Kingdom.",
    fullDescription: "UK VAT obligations depend on the business establishment, goods and services supplied, where goods are located, sales channels and customer type. FileFast Global helps organise transaction records, assess the questions to review, prepare a document pack and coordinate with an appropriately qualified UK VAT professional where registration, advice or filing requires local expertise. We do not promise that every business must register or that a particular threshold applies to every case.",
    benefits: ["Organise UK sales and marketplace records", "Prepare information for a VAT registration assessment", "Support VAT return data preparation and reconciliations", "Coordinate specialist review for UK-specific questions"],
    eligibility: ["Indian and international businesses selling goods or services connected with the UK", "E-commerce sellers who need to assess UK VAT obligations", "Businesses seeking help organising VAT records before speaking with a UK specialist"],
    requiredDocuments: ["Business incorporation and ownership details", "UK and overseas VAT numbers, if already registered", "Sales invoices and credit notes", "Marketplace statements and payment reports", "Goods location, import and fulfilment information", "Customer location and transaction summaries", "Prior VAT returns and HMRC correspondence, if applicable"],
    processFlow: [
      { title: "Map the business activity", description: "Identify establishment, customer locations, goods movement, marketplace use and current registrations." },
      { title: "Prepare the records", description: "Organise invoices, sales summaries, marketplace reports and import or fulfilment records." },
      { title: "Coordinate local review", description: "Confirm the appropriate registration or filing route with a qualified UK professional where required." }
    ],
    pricingInfo: "Fees depend on the country-specific scope, transaction volume and whether local professional representation or filing is required. Request a case-specific quote before work begins; government or adviser fees may be separate.",
    faqs: [
      { question: "Does every overseas seller need UK VAT registration?", answer: "No single answer applies to every seller. The position can depend on where goods are located, how sales are made, the seller's establishment and the type of supply. Get the facts reviewed before deciding." },
      { question: "Can FileFast help with UK VAT returns?", answer: "We can help organise transaction data and coordinate preparation or local professional review. The precise filing and representation scope will be confirmed for your case." },
      { question: "What records should an online seller prepare?", answer: "Prepare order-level sales, refunds, marketplace fees, customer and delivery locations, import information, inventory location and any prior VAT records." }
    ],
    relatedServiceSlugs: ["eu-vat-oss-ioss", "us-tax-sales-tax"],
    metaTitle: "UK VAT Registration & Returns Support",
    metaDescription: "UK VAT compliance support for international and e-commerce businesses. Organise records and coordinate registration or return review with FileFast Global.",
    seoKeywords: "UK VAT registration support, UK VAT returns, UK VAT for overseas sellers, UK e-commerce VAT compliance"
  }),
  baseService({
    name: "EU VAT, OSS & IOSS Compliance Support",
    slug: "eu-vat-oss-ioss",
    category: "Global Tax & VAT",
    sortOrder: 21,
    shortDescription: "EU VAT readiness and OSS/IOSS workflow coordination for cross-border and e-commerce sellers.",
    fullDescription: "European Union VAT treatment can vary by the seller's establishment, goods location, customer type, sales channel and route used to deliver goods. OSS and IOSS are specific schemes with eligibility and process requirements; they are not interchangeable with a general VAT registration. FileFast Global helps map the sales model, organise records and coordinate review with an appropriate EU-country tax professional where local advice, registration or filing is required.",
    benefits: ["Map cross-border sales and fulfilment flows", "Organise marketplace and order-level records", "Prepare information for OSS/IOSS eligibility review", "Coordinate country-specific VAT registration and reporting questions"],
    eligibility: ["Businesses selling to EU customers across borders", "Online sellers using marketplaces or fulfilment centres", "Businesses assessing whether an OSS or IOSS scheme may be relevant"],
    requiredDocuments: ["Business and ownership details", "Countries where goods are stored or dispatched", "Order-level sales and refund reports", "Customer country and VAT ID data where applicable", "Marketplace and payment processor statements", "Import and customs records where applicable", "Existing EU VAT registrations and prior returns"],
    processFlow: [
      { title: "Map the EU sales model", description: "Review where goods start and end, the customer type, sales channel and business establishment." },
      { title: "Prepare transaction evidence", description: "Organise country-level sales, refunds, marketplace reports and import records." },
      { title: "Confirm the right scheme", description: "Coordinate eligibility and registration questions with an appropriate local professional before filing." }
    ],
    pricingInfo: "Pricing depends on the number of countries, registrations, transaction volume, reporting frequency and local adviser involvement. Request a tailored quote after the business model is reviewed.",
    faqs: [
      { question: "What is the difference between OSS and IOSS?", answer: "They are different EU VAT schemes designed for particular types of supplies. Eligibility and reporting depend on the transaction and seller circumstances, so confirm the correct scheme before using it." },
      { question: "Does an OSS registration replace every local VAT registration?", answer: "No. OSS does not automatically remove all domestic or other country-specific registration obligations, for example where goods are stored or other transactions occur." },
      { question: "What records should an EU e-commerce seller keep?", answer: "Keep order-level transactions, customer country, goods dispatch and destination, refunds, marketplace reports, import records and relevant VAT registration details." }
    ],
    relatedServiceSlugs: ["uk-vat-compliance", "uae-vat-compliance"],
    metaTitle: "EU VAT, OSS & IOSS Compliance Support",
    metaDescription: "EU VAT and OSS/IOSS support for cross-border e-commerce businesses. Prepare sales records and coordinate local specialist review with FileFast Global.",
    seoKeywords: "EU VAT compliance, OSS registration support, IOSS support, EU VAT for e-commerce sellers, cross-border VAT"
  }),
  baseService({
    name: "UAE VAT Registration & Returns Support",
    slug: "uae-vat-compliance",
    category: "Global Tax & VAT",
    sortOrder: 22,
    shortDescription: "UAE VAT registration readiness, records preparation and return coordination for eligible businesses.",
    fullDescription: "UAE VAT obligations depend on the business, taxable supplies, turnover, place of establishment and applicable Federal Tax Authority rules. FileFast Global helps organise sales and purchase records, identify information needed for an assessment and coordinate with an appropriately qualified UAE tax professional where local advice, registration or filing is required. Registration thresholds and deadlines should be confirmed against current rules and the facts of the business.",
    benefits: ["Organise sales, purchase and expense records", "Prepare information for a UAE VAT registration assessment", "Support return-data reconciliation", "Coordinate UAE-specific professional review where needed"],
    eligibility: ["Businesses operating in or supplying into the UAE", "E-commerce sellers reviewing UAE VAT exposure", "Businesses seeking a clear records checklist before local tax review"],
    requiredDocuments: ["Trade licence and entity documents", "Ownership and authorised signatory details", "Sales and purchase invoices", "Revenue summaries and bank records", "Import/export and customs documents, where applicable", "Existing TRN and prior VAT returns, if registered", "Business activity and customer/supplier details"],
    processFlow: [
      { title: "Review business facts", description: "Identify entity status, business activities, supplies and relevant turnover information." },
      { title: "Prepare documents and figures", description: "Organise invoices, sales summaries, purchases and import/export records." },
      { title: "Coordinate registration or filing", description: "Confirm the applicable route and any local adviser involvement before submission." }
    ],
    pricingInfo: "Fees depend on registration or return scope, record volume and local professional involvement. Request a tailored quote; any government charges or third-party adviser fees will be clarified separately.",
    faqs: [
      { question: "Can any business register for UAE VAT?", answer: "Eligibility and whether registration is mandatory or voluntary depend on the business facts and current UAE rules. Confirm the position with a qualified UAE professional." },
      { question: "What records are useful for a UAE VAT return?", answer: "Typically, sales and purchase invoices, credit notes, import/export records, accounting summaries and prior return information are relevant. The final checklist depends on the business." },
      { question: "Can an overseas business have UAE VAT obligations?", answer: "Some overseas businesses may have UAE VAT considerations depending on the supplies and circumstances. A fact-specific review is important before assuming that registration is or is not required." }
    ],
    relatedServiceSlugs: ["uk-vat-compliance", "eu-vat-oss-ioss"],
    metaTitle: "UAE VAT Registration & Returns Support",
    metaDescription: "UAE VAT compliance support for businesses. Prepare records and coordinate registration or return review with FileFast Global.",
    seoKeywords: "UAE VAT registration support, UAE VAT returns, UAE VAT compliance, VAT for overseas businesses UAE"
  }),
  baseService({
    name: "US Tax & Sales Tax Compliance Coordination",
    slug: "us-tax-sales-tax",
    category: "Global Tax & VAT",
    sortOrder: 23,
    shortDescription: "US tax and state sales-tax readiness support for international businesses and online sellers.",
    fullDescription: "The United States has federal, state and local tax rules, and sales-tax obligations can vary by state, nexus, product or service, marketplace activity and business structure. FileFast Global helps businesses organise transaction and entity information, map questions for review and coordinate with an appropriately qualified US tax professional where advice, registration or filing requires local expertise. This service is not a substitute for individual US tax advice.",
    benefits: ["Organise US marketplace and direct-sales records", "Prepare information for state sales-tax nexus review", "Collect entity and transaction data for adviser review", "Coordinate federal and state filing questions with local specialists"],
    eligibility: ["Non-US businesses selling to US customers", "E-commerce sellers using marketplaces or direct-to-consumer channels", "Founders assessing US business and tax compliance requirements"],
    requiredDocuments: ["Entity formation and ownership records", "US and non-US tax identification numbers, if any", "Sales by state and sales channel", "Marketplace facilitator reports and settlement statements", "Product/service descriptions and refund data", "Inventory or fulfilment locations", "Prior federal/state returns and tax notices, if applicable"],
    processFlow: [
      { title: "Map the US activity", description: "Review entity structure, sales channels, states served, inventory and marketplace involvement." },
      { title: "Organise state-level records", description: "Prepare sales, refunds, marketplace collections and other relevant transaction information." },
      { title: "Coordinate specialist assessment", description: "Refer federal, state and local tax questions for appropriate US professional review before any filing." }
    ],
    pricingInfo: "Pricing depends on entity structure, number of states, return types, transaction volume and the local professional scope. Request a tailored quote after an initial review; government and third-party fees may be separate.",
    faqs: [
      { question: "Is US sales tax the same in every state?", answer: "No. Rules, rates, thresholds and filing requirements vary by state and sometimes by locality. The business facts and current state rules need to be reviewed." },
      { question: "Do marketplaces collect all sales tax for a seller?", answer: "Marketplace collection rules can cover some transactions, but they do not automatically resolve every seller obligation or every tax type. Keep marketplace and direct-sale records separate for review." },
      { question: "Can FileFast file US tax returns directly?", answer: "We help organise records and coordinate with an appropriately qualified US tax professional where local advice or filing is required. The scope and responsible filer must be confirmed for each case." }
    ],
    relatedServiceSlugs: ["uk-vat-compliance", "eu-vat-oss-ioss"],
    metaTitle: "US Tax & Sales Tax Compliance Support",
    metaDescription: "US tax and sales-tax readiness support for international and e-commerce businesses. Organise records and coordinate specialist review with FileFast Global.",
    seoKeywords: "US sales tax support, sales tax for international sellers, US tax compliance coordination, e-commerce sales tax"
  })

];

// Public reviews transcribed from FileFast's Google Business Profile (August 2026).
// Keep attribution and wording intact; replace only with new verified reviews.
export const starterTestimonials = [
  { _id: "review-ayesha", clientName: "Ayesha Patel", clientRole: "Google reviewer", serviceUsed: "GST filing", rating: 5, quote: "Excellent service! My GST filing was completed accurately and on time. The entire process was smooth, and all my queries were answered clearly and professionally. I truly appreciate the support and highly recommend their services.", sourceUrl: "https://maps.app.goo.gl/So4DsfCgYrfANdD38" },
  { _id: "review-dhruv", clientName: "Dhruv Gupta", clientRole: "Google reviewer", serviceUsed: "GST filings", rating: 5, quote: "I have been getting my GST filings done through them, and the experience has been excellent. Their service is very prompt, accurate, and they handle everything professionally. Highly recommended for anyone looking for reliable tax services!", sourceUrl: "https://maps.app.goo.gl/So4DsfCgYrfANdD38" },
  { _id: "review-sivakumar", clientName: "89 SIVAKUMAR.I T/M", clientRole: "Google reviewer", serviceUsed: "GST registration", rating: 5, quote: "Very helpful team. They guided me through GST registration for my new business and made the whole process very simple. Good consultancy and affordable fees.", sourceUrl: "https://maps.app.goo.gl/So4DsfCgYrfANdD38" },
  { _id: "review-sagar", clientName: "Sagar Hagir", clientRole: "Google Local Guide", serviceUsed: "GST return filing", rating: 5, quote: "Advi helped me complete my pending GST returns without any hassle and clearly explained the late fees and penalties. Good service and totally recommended 5 stars!!", sourceUrl: "https://maps.app.goo.gl/So4DsfCgYrfANdD38" },
  { _id: "review-krishan", clientName: "Krishan Kumar Das", clientRole: "Google Local Guide", serviceUsed: "GST return filing", rating: 5, quote: "Excellent support for GST return filing. They helped me understand the process and ensured everything was filed correctly. Very fast service and professional communication.", sourceUrl: "https://maps.app.goo.gl/So4DsfCgYrfANdD38" }
];

export const starterBlogPosts = [
  { _id: "starter-blog-1", slug: "gst-registration-documents-checklist", category: "GST", title: "GST Registration: Documents Checklist for New Businesses", excerpt: "A practical overview of the information commonly needed before starting a GST registration application.", content: "Starting a GST registration is easier when your documents are ready. Keep PAN and Aadhaar details, business address proof, bank account information and photographs available.\n\nThe exact requirements can vary by business type and premises. Before filing, verify that the address proof and bank details match the application information. If your business operates from a rented location, keep the relevant occupancy documents available.\n\nFileFast can review your documents and explain the steps that apply to your business before the application is submitted.", metaTitle: "GST Registration Documents Checklist | FileFast", metaDescription: "Prepare for GST registration with this simple document checklist." },
  { _id: "starter-blog-2", slug: "itr-filing-guide", category: "Income Tax", title: "A Simple Guide to Preparing for ITR Filing", excerpt: "Organise your income and deduction details before filing your income-tax return.", content: "Preparing early helps make ITR filing smoother. Collect Form 16 where applicable, interest certificates, capital-gains statements, rent receipts and proofs for eligible deductions.\n\nReview your information carefully before filing. The right return form depends on your income sources and taxpayer category, so a quick professional review can prevent common mistakes.\n\nAfter filing, complete verification within the applicable time limit and keep the acknowledgement for your records.", metaTitle: "ITR Filing Preparation Guide | FileFast", metaDescription: "Key documents and steps to prepare before filing your income-tax return." },
  { _id: "starter-blog-3", slug: "fssai-registration-basics", category: "Business Compliance", title: "FSSAI Registration Basics for Food Businesses", excerpt: "Understand why food businesses may need an FSSAI registration or licence.", content: "Food businesses must meet food-safety requirements that are appropriate to their activity and scale. The applicable FSSAI registration or licence can depend on factors such as turnover, type of business and location.\n\nBefore applying, identify the nature of your food activity and collect the related business and premises documents. Using the correct category from the beginning helps avoid delays.\n\nFileFast can help you assess the application route and prepare the required information.", metaTitle: "FSSAI Registration Basics | FileFast", metaDescription: "An introduction to FSSAI registration and licence requirements for food businesses." },
  { _id: "starter-blog-4", slug: "global-tax-readiness-indian-businesses", category: "Global Business", title: "Global Tax Readiness: A Starting Checklist for Indian Businesses", excerpt: "A practical first checklist for founders selling, hiring or expanding beyond India.", content: "International expansion introduces new registrations, invoicing, record-keeping and tax questions. The right starting point is to map where your customers, team, goods and payments are located.\n\nBefore entering a market, collect your company documents, GST and PAN details, ownership information, expected turnover, invoice samples and contracts. This gives a local specialist the context to assess the appropriate requirements.\n\nFileFast helps founders organise the India-side compliance work and coordinate with country-specific professionals where required. This article is general information, not country-specific tax or legal advice.", metaTitle: "Global Tax Readiness for Indian Businesses | FileFast", metaDescription: "A practical first checklist for Indian businesses planning cross-border growth." },
  {
    _id: "starter-blog-5",
    slug: "documents-required-for-gst-return-filing",
    category: "GST",
    title: "Documents Required for GST Return Filing: A Practical Checklist",
    excerpt: "Prepare the sales, purchase, tax and marketplace records commonly needed for GSTR-1 and GSTR-3B filing.",
    content: "Preparing the right records before GST return filing helps reduce avoidable mismatches and follow-up questions. The exact checklist depends on your business activity, return period and the transactions recorded during that period.\n\nFor GSTR-1, organise the sales register, tax invoices, credit notes, debit notes, export invoices and amendments. Prepare the HSN summary and e-invoice details where applicable. E-commerce sellers should also reconcile marketplace sales, returns, fees and settlement reports before finalising outward supplies.\n\nFor GSTR-3B, prepare the sales and output-tax summary, purchase register, relevant expense invoices, eligible input tax credit working and GSTR-2B. Keep the previous GSTR-3B, GST portal liability details, cash ledger and credit ledger available for reconciliation. Do not claim every amount shown in GSTR-2B automatically; check eligibility and restrictions under the applicable rules.\n\nDepending on the business, you may also need e-way bill summaries, bank or payment-gateway reports, export and LUT records, and a reconciliation of credit notes or refunds. Nil filing should be considered only after checking all reportable transactions for the period.\n\nA useful workflow is to reconcile the sales register with invoices and marketplace reports, compare purchase records with GSTR-2B, review differences, confirm tax values and then prepare GSTR-1 and GSTR-3B for review. Keep the filed acknowledgement and working papers with your records.\n\nRead our GST registration documents checklist if you are registering a new business. For filing support, see our GSTR-1 filing and GSTR-3B filing services. FileFast can review your records and explain the applicable checklist before work begins.",
    metaTitle: "Documents Required for GST Return Filing",
    metaDescription: "See the records commonly needed for GSTR-1 and GSTR-3B, including sales invoices, purchase records, GSTR-2B, credit notes and marketplace reports."
  },
  {
    _id: "starter-blog-6",
    slug: "gst-registration-address-proof",
    category: "GST",
    title: "GST Registration Address Proof: Owned, Rented and Shared Premises",
    excerpt: "Understand common address-proof documents for GST registration and what may be needed for rented or shared business premises.",
    content: "Business address proof is an important part of a GST registration application. The documents that fit your case depend on whether the premises are owned, rented, leased or used with the owner's consent. The portal or GST officer may ask for additional clarification, so keep the documents consistent with the address entered in the application.\n\nFor owned premises, commonly used supporting records can include a property-tax receipt, municipal record or recent utility bill, depending on the available documents and current portal requirements. Keep the address and ownership details readable and consistent.\n\nFor rented or leased premises, keep the rent or lease agreement and supporting proof relating to the premises or owner available. If the agreement does not clearly establish the address or occupancy, additional supporting documents may be requested. Do not upload an altered or misleading document.\n\nFor premises used with consent, a consent letter and supporting proof from the owner may be relevant. Shared offices, coworking spaces and other special arrangements can need a different set of documents based on the actual arrangement and what the GST portal accepts for that case.\n\nBefore submitting, check that the complete address matches across the application and supporting records, the document is legible, and the applicant has permission to use the premises for the stated business purpose. Keep the PAN, identity and business-constitution documents ready as well.\n\nFor the wider GST registration documents checklist, read our GST registration documents checklist article. FileFast can help review the address-proof set and prepare the GST Registration service application based on your actual premises arrangement.",
    metaTitle: "GST Registration Address Proof: Document Guide",
    metaDescription: "Learn common GST registration address-proof documents for owned, rented and shared premises, including rent agreements and consent documents."
  },
];
