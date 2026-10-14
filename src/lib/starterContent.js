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
    metaTitle: "GST Registration Online in Chennai & India",
    metaDescription: "Get GST registration support in Chennai and across India. Check eligibility, address proof and required documents with FileFast Global before applying.",
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
    metaTitle: "GSTR-1 Filing Services for GST Returns",
    metaDescription: "Get GSTR-1 filing support for monthly or QRMP returns. Organise sales invoices, credit notes, HSN and marketplace data with FileFast Global.",
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
    metaDescription: "Get GSTR-3B filing support with GST liability review, GSTR-2B reconciliation and eligible input tax credit checks from FileFast Global.",
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
    metaTitle: "Income Tax Return Filing in Chennai & India",
    metaDescription: "Get income-tax return filing support in Chennai and across India. Organise Form 16, AIS, Form 26AS, interest and deduction documents with FileFast Global.",
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
    benefits: ["Reach government buyers", "Assistance with seller registration", "Guidance through the onboarding process"], relatedServiceSlugs: ["msme-registration"] }),

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
    metaDescription: "UK VAT registration and return support for cross-border businesses. Prepare sales records and coordinate country-specific specialist review with FileFast Global.",
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
    metaDescription: "Prepare for EU VAT, OSS and IOSS compliance with sales-record checks and cross-border e-commerce support coordinated by FileFast Global and local specialists.",
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
    metaDescription: "Get UAE VAT registration and return coordination support. Organise business records and prepare for country-specific tax review with FileFast Global.",
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
    metaDescription: "Prepare for US tax and sales-tax obligations with record organisation and e-commerce compliance coordination through FileFast Global and local specialists.",
    seoKeywords: "US sales tax support, sales tax for international sellers, US tax compliance coordination, e-commerce sales tax"
  })
,
  baseService({
  name: "Company Registration",
  slug: "company-registration",
  category: "Business Registration",
  sortOrder: 10,
  isFeatured: true,
  shortDescription: "Company and LLP registration guidance for founders and small businesses in India.",
  fullDescription: "Company registration in India starts with choosing a structure that fits the founders, ownership plan, funding needs and ongoing compliance capacity. FileFast Global helps founders prepare the information and documents needed for a company or LLP registration workflow and understand the next steps after incorporation. The appropriate route, forms and approvals depend on the entity type and current requirements of the Ministry of Corporate Affairs and other relevant authorities.\\n\\nOur support can include an initial requirements discussion, a document checklist, coordination of the application workflow and a practical overview of post-registration tasks such as PAN/TAN, bank-account preparation, accounting setup and recurring compliance. Professional and government charges are explained separately before work begins. Processing depends on complete information and authority review; approval dates cannot be guaranteed.",
  benefits: [
    "Compare common business structures before applying",
    "Prepare founder, director and registered-office information",
    "Coordinate registration documents and application steps",
    "Understand post-incorporation compliance tasks"
  ],
  eligibility: [
    "Founders planning a private limited company or LLP",
    "Small businesses formalising an existing operation",
    "Entrepreneurs needing a registration checklist"
  ],
  requiredDocuments: [
    "PAN and identity proof of proposed directors or partners",
    "Address proof and contact details",
    "Proposed business name and activity",
    "Registered-office proof and owner consent where applicable",
    "Ownership and capital/partner details"
  ],
  processFlow: [
    {
      title: "Choose the structure",
      description: "Discuss ownership, activity and compliance needs."
    },
    {
      title: "Prepare documents",
      description: "Compile identity, address, office and business details."
    },
    {
      title: "Coordinate filing",
      description: "Prepare the agreed application workflow and respond to document clarifications."
    },
    {
      title: "Plan next steps",
      description: "Review banking, accounting, tax registrations and recurring compliance."
    }
  ],
  pricingInfo: "Professional fees depend on entity type and scope. Government fees, stamp duty, digital signatures and third-party charges may be separate; these should be identified before starting.",
  faqs: [
    {
      question: "Should I register a private limited company or an LLP?",
      answer: "The right structure depends on ownership, fundraising plans, liability, tax and ongoing compliance. Discuss your business model before choosing."
    },
    {
      question: "What documents are commonly required?",
      answer: "Founder identity and address proof, proposed name and activity, contact details and registered-office documents are common starting points."
    },
    {
      question: "How long does company registration take?",
      answer: "Timing depends on document accuracy, application checks and government processing. A fixed approval date cannot be guaranteed."
    },
    {
      question: "Are government charges included in the professional fee?",
      answer: "Not necessarily. Government fees, stamp duty, digital signature and third-party charges should be identified separately."
    },
    {
      question: "What happens after incorporation?",
      answer: "You may need banking, accounting, tax registrations and ongoing statutory filings based on your entity and activities."
    }
  ],
  relatedServiceSlugs: [
    "gst-registration",
    "msme-registration",
    "tds-return-filing"
  ],
  metaTitle: "Company Registration in India | FileFast Global",
  metaDescription: "Plan company or LLP registration in India with a clear document checklist, application guidance and post-incorporation compliance support from FileFast Global.",
  seoKeywords: "company registration India, private limited company registration, LLP registration India, company registration Chennai, startup registration"
}),
  baseService({
  name: "Tax & Compliance Services",
  slug: "compliance-services",
  category: "Compliance Services",
  sortOrder: 11,
  isFeatured: true,
  shortDescription: "Recurring GST, income-tax, TDS and business compliance support for SMEs and growing teams.",
  fullDescription: "Keeping up with tax and business compliance can be difficult when invoices, purchase records, payroll information and filing deadlines are managed across different systems. FileFast Global helps small businesses organise recurring compliance work, prepare filing information and identify missing records before deadlines.\\n\\nDepending on the engagement, support may cover GST returns, TDS return preparation, income-tax return coordination, accounting records and reconciliation, and business registration or licence requirements. We start by understanding the legal entity, registrations, transaction volume, filing frequency and current backlog. We then agree a practical scope, document checklist and communication process.\\n\\nObligations differ by business type and activity, so not every service is required for every business. We confirm the applicable work and professional fee before starting and flag cases that need specialist review.",
  benefits: [
    "Map recurring filing responsibilities and deadlines",
    "Organise documents before each reporting period",
    "Coordinate GST, TDS and income-tax tasks",
    "Identify reconciliation gaps and missing information early"
  ],
  eligibility: [
    "SMEs needing recurring filing support",
    "Founders who want a compliance calendar",
    "Businesses with multiple registrations or pending returns"
  ],
  requiredDocuments: [
    "Business PAN and relevant GSTINs",
    "Sales and purchase registers",
    "Previous returns and filing acknowledgements",
    "Bank statements and accounting summaries",
    "TDS deduction and challan records where applicable",
    "Notices or portal communications requiring attention"
  ],
  processFlow: [
    {
      title: "Scope requirements",
      description: "Review entity type, registrations, filing periods and pending tasks."
    },
    {
      title: "Build the checklist",
      description: "Agree documents, owners and cut-off dates."
    },
    {
      title: "Prepare and reconcile",
      description: "Review records and identify missing data or mismatches."
    },
    {
      title: "File and track",
      description: "Complete agreed work and share acknowledgements or next steps."
    }
  ],
  pricingInfo: "Fees depend on registrations, return types, transaction volume and backlog. Request a monthly or per-filing quote with statutory charges clearly separated.",
  faqs: [
    {
      question: "What is included in compliance services?",
      answer: "The scope can include GST returns, TDS returns, ITR support, accounting and registration tasks. We confirm what your business needs before engagement."
    },
    {
      question: "Can you help with overdue returns?",
      answer: "We can review pending periods, records and portal status, then confirm the scope. Late fees and interest depend on the facts and applicable rules."
    },
    {
      question: "How should I send documents?",
      answer: "We provide a checklist and agree a suitable channel. Do not send passwords or OTPs."
    },
    {
      question: "Do you offer monthly support?",
      answer: "Recurring arrangements may be available depending on registrations, transaction volume and work required."
    },
    {
      question: "Can you guarantee no notices or penalties?",
      answer: "No provider can guarantee that. Accurate records and timely filing help manage risk, but outcomes depend on the facts and authority decisions."
    }
  ],
  relatedServiceSlugs: [
    "gstr-1-filing",
    "gstr-3b-filing",
    "itr-filing",
    "tds-return-filing"
  ],
  metaTitle: "Tax & Compliance Services for SMEs | FileFast Global",
  metaDescription: "Organise recurring GST, TDS, ITR and business compliance with document checklists, filing coordination and clear scope from FileFast Global.",
  seoKeywords: "tax compliance services India, GST compliance services, TDS return filing, compliance services for small businesses, outsourced tax compliance"
}),
  baseService({
  name: "Global Expansion Advisory",
  slug: "global-expansion-advisory",
  category: "Global Tax & VAT",
  sortOrder: 12,
  isFeatured: true,
  shortDescription: "Cross-border tax readiness and country-specific compliance coordination for Indian businesses expanding overseas.",
  fullDescription: "Expanding into another country can affect tax registration, indirect tax, invoicing, marketplace reporting, business structure and record-keeping. Requirements depend on where the business is established, where customers are located, whether goods cross borders, where inventory is stored and how sales are made.\\n\\nFileFast Global helps Indian founders prepare by mapping the proposed market, business model and transaction flows. We can organise company and ownership records, expected turnover, sample invoices, marketplace reports and current tax registrations, then coordinate next steps for India-side compliance and international VAT or tax workflows.\\n\\nCountry-specific tax advice, regulated filings or representation may require a qualified local professional. We clarify that boundary before engagement and do not present general information as a substitute for jurisdiction-specific advice.",
  benefits: [
    "Map target markets and cross-border transaction flows",
    "Prepare records for country-specific tax assessment",
    "Coordinate UK, EU, UAE and US tax/VAT workstreams",
    "Connect international planning with India-side compliance"
  ],
  eligibility: [
    "Indian businesses planning to sell goods or services overseas",
    "E-commerce sellers entering new markets",
    "Founders preparing for a local tax-adviser consultation"
  ],
  requiredDocuments: [
    "Company and ownership information",
    "Target countries and planned launch dates",
    "Product or service descriptions",
    "Expected sales, customer types and turnover",
    "Sample invoices, contracts and marketplace reports",
    "Current tax registrations"
  ],
  processFlow: [
    {
      title: "Define the expansion plan",
      description: "Identify target markets, products, sales channels and expected activity."
    },
    {
      title: "Map transaction flows",
      description: "Record customer location, inventory, fulfilment, payments and contracting entity."
    },
    {
      title: "Prepare a document pack",
      description: "Organise evidence for country-specific tax and legal review."
    },
    {
      title: "Coordinate next steps",
      description: "Agree India-side tasks and any local professional support."
    }
  ],
  pricingInfo: "Fees depend on countries involved, entities, transaction complexity and local adviser requirements. Scope and quote are agreed after an initial review.",
  faqs: [
    {
      question: "Can an Indian company sell internationally without setting up a foreign company?",
      answer: "It depends on the market, product, sales model and local rules. Cross-border selling and establishing locally are different questions."
    },
    {
      question: "Which countries can you help coordinate?",
      answer: "The website covers UK, EU, UAE and US tax/VAT workstreams alongside India compliance. Local professional involvement may be needed."
    },
    {
      question: "What should I prepare before expanding?",
      answer: "Prepare company documents, product details, target markets, expected sales, invoices, marketplace reports and inventory/fulfilment information."
    },
    {
      question: "Do tax rules work the same in every country?",
      answer: "No. Registration, thresholds and reporting rules differ by jurisdiction and can change."
    },
    {
      question: "Is the initial discussion a formal tax opinion?",
      answer: "No. It helps scope the facts and next steps. Formal jurisdiction-specific advice must be agreed with an appropriately qualified professional."
    }
  ],
  relatedServiceSlugs: [
    "uk-vat-compliance",
    "eu-vat-oss-ioss",
    "uae-vat-compliance",
    "us-tax-sales-tax",
    "gst-registration"
  ],
  metaTitle: "Global Expansion & International Tax Support",
  metaDescription: "Prepare for overseas growth with cross-border tax readiness, VAT coordination and a clear document plan for India-based businesses.",
  seoKeywords: "international tax advisory India, cross-border tax compliance, global tax services, overseas expansion tax, international business compliance"
}),
  baseService({
  name: "E-commerce Tax Compliance",
  slug: "ecommerce-tax-compliance",
  category: "Global Tax & VAT",
  sortOrder: 13,
  isFeatured: true,
  shortDescription: "GST and marketplace reconciliation support for online sellers across sales channels.",
  fullDescription: "E-commerce sellers often need to reconcile orders, cancellations, returns, marketplace fees, settlement reports, tax collected at source and GST return figures. Records may arrive in different formats from each platform, so a consistent reconciliation process is important before filing.\\n\\nFileFast Global helps sellers organise marketplace reports, sales registers, credit notes, returns and tax summaries. Depending on the engagement, work can include checking sales classifications, comparing platform settlements with books, preparing data for GSTR-1 and GSTR-3B, and identifying TCS or return adjustments that need to be matched against source records.\\n\\nThe correct treatment depends on the platform, transaction type, seller registrations and current GST rules. We review the available evidence and confirm scope before preparing filing entries. This service is designed for sellers who need a clearer record trail and repeatable month-end workflow.",
  benefits: [
    "Consolidate marketplace sales and settlement reports",
    "Reconcile cancellations, refunds and credit notes",
    "Review TCS and GST reporting data",
    "Prepare a repeatable month-end document workflow"
  ],
  eligibility: [
    "Sellers using marketplaces or direct e-commerce channels",
    "Businesses with multiple platforms or high invoice volumes",
    "Sellers reconciling GST returns with marketplace records"
  ],
  requiredDocuments: [
    "Platform sales and order reports",
    "Settlement and payment statements",
    "Returns, refunds and credit-note reports",
    "GSTIN and tax-period details",
    "TCS statements and portal records",
    "Sales and purchase registers",
    "Previous GSTR-1 and GSTR-3B"
  ],
  processFlow: [
    {
      title: "Collect platform reports",
      description: "Gather sales, settlement, returns and TCS reports."
    },
    {
      title: "Reconcile sales and adjustments",
      description: "Match orders, refunds, credit notes and settlements to records."
    },
    {
      title: "Prepare GST return data",
      description: "Organise reviewed figures for relevant return tables."
    },
    {
      title: "Share the review summary",
      description: "Document assumptions, missing evidence and next filing steps."
    }
  ],
  pricingInfo: "Pricing depends on platforms, order volume, tax periods and reconciliation complexity. Share sample reports for a scope and fee estimate.",
  faqs: [
    {
      question: "Can you help with Amazon, Flipkart and Meesho reports?",
      answer: "We can review supported marketplace reports and agree a workflow based on available files and your reporting needs."
    },
    {
      question: "Why can marketplace sales differ from bank settlements?",
      answer: "Settlements may reflect fees, refunds, reserves, adjustments and timing differences. Reconcile each component to platform reports and accounting records."
    },
    {
      question: "What is TCS in e-commerce GST reconciliation?",
      answer: "TCS is a tax-collection mechanism under applicable GST provisions. Reconcile it with relevant statements and portal records."
    },
    {
      question: "Can I file Nil if the marketplace had no payout?",
      answer: "A lack of payout does not prove there were no reportable transactions. Review orders, invoices, returns and adjustments first."
    },
    {
      question: "What files should I send for a quote?",
      answer: "Share tax period, platform names, approximate order count and sample sales, settlement, returns and TCS reports. Do not include passwords or OTPs."
    }
  ],
  relatedServiceSlugs: [
    "gst-registration",
    "gstr-1-filing",
    "gstr-3b-filing",
    "uk-vat-compliance",
    "eu-vat-oss-ioss"
  ],
  metaTitle: "E-commerce GST & Marketplace Tax Compliance",
  metaDescription: "Reconcile marketplace sales, refunds, settlements and TCS with GST return preparation support for Indian e-commerce sellers.",
  seoKeywords: "GST for e-commerce sellers, e-commerce GST compliance India, Amazon seller GST returns, Flipkart GST filing, Meesho TCS reconciliation"
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
  {
    "_id": "starter-blog-1",
    "slug": "gst-registration-documents-checklist",
    "category": "GST",
    "title": "GST Registration Documents Checklist for Businesses in India",
    "excerpt": "A detailed, practical GST registration checklist covering PAN, identity, business constitution, address proof, bank details and common application issues.",
    "metaTitle": "GST Registration Documents Checklist for Businesses",
    "metaDescription": "Review the GST registration documents commonly needed for proprietors, partnerships and companies, including owned, rented and shared premises.",
    "content": "GST registration document checklist: what to prepare before applying\n\nA complete, consistent document set makes a GST registration application easier to prepare and review. The exact requirements depend on the legal structure, principal place of business, authorised signatory, business activity and current GST portal instructions. Use this checklist as a starting point, then confirm the requirements that apply to your case.\n\n1. PAN and identity details\nKeep the PAN details of the proprietor or business entity ready. Depending on the applicant and authorised signatory, identity and contact details such as Aadhaar, mobile number and email address may also be needed for portal verification. Names and other details should match the underlying records. Do not submit altered, expired or unreadable documents.\n\n2. Proof of business constitution\nThe supporting document depends on the type of applicant. A proprietorship, partnership, LLP, company, trust or other entity may need different constitution and authorisation records. Partnerships should check the partnership deed and partner details; companies and LLPs should check the applicable incorporation and authorised-signatory records. Keep the names, PAN details and authority to sign consistent across the application.\n\n3. Principal place of business address proof\nThe evidence depends on whether the premises are owned, rented, leased, shared or used with consent. For owned premises, relevant property or utility records may support the address. For rented or leased premises, keep the rent or lease agreement and supporting records available. For consent-based premises, a consent letter and owner-related proof may be relevant. Coworking spaces and special arrangements require a review of the actual occupancy terms and current portal requirements.\n\nThe address should be entered consistently, including door or unit number, street, locality, city, state and PIN code. Check that the document is readable and supports the address declared in the application. See our detailed GST registration address proof guide for examples by premises type.\n\n4. Bank details\nPrepare the bank account details and supporting evidence requested for your application or compliance stage. The account holder name and details should be checked carefully. Where a bank document is requested, use a valid and legible record and follow the portal's current instructions rather than relying on an old checklist.\n\n5. Photographs and authorised signatory information\nA photograph and details of the proprietor, partners, directors or authorised signatory may be required depending on the entity and application. If someone other than the proprietor is submitting the application, ensure the authorisation is properly documented.\n\n6. Business activity information\nBefore starting, write down the nature of the goods or services, principal activity, additional places of business, expected business model and whether the business sells through an e-commerce marketplace or across state borders. These facts can affect the registration analysis. Do not choose a category simply because it seems convenient; describe the real activity accurately.\n\nCommon mistakes to check before submission\n- The business name or PAN details do not match the supporting documents.\n- The address entered on the portal differs from the address evidence.\n- A rent agreement or consent letter does not clearly support the applicant's use of the premises.\n- Scans are cropped, blurred or missing pages.\n- The authorised signatory is not correctly identified or supported.\n- The applicant assumes every business has the same registration requirement without checking turnover, activity and applicable exceptions.\n\nA practical pre-submission workflow\nFirst, confirm the legal entity and the person authorised to apply. Next, collect the PAN, constitution and identity details. Then finalise the principal place of business and supporting evidence. Finally, review the application fields against the documents before submitting, and monitor the portal for any clarification or verification request. Approval time is not guaranteed and depends on the facts, verification and department processing.\n\nAfter registration, keep the GSTIN and login access secure, maintain invoices and accounting records, and identify the returns and other compliance obligations that apply. Registration is not the end of compliance; filing and record-keeping need to be planned from the beginning.\n\nHow FileFast Global can help\nFileFast Global helps businesses organise GST registration information, review document consistency and prepare the application checklist for the actual business and premises. We explain the scope and professional fee before work begins. We do not guarantee approval or a fixed processing time because the decision and verification process are outside our control.\n\nRelated reading: GST registration address proof; documents required for GST return filing. For assistance, visit our GST Registration service page.\n\nDisclaimer: This article is general information, not legal or tax advice for a specific case. Verify current GST portal instructions and applicable law before applying."
  },
  {
    "_id": "starter-blog-2",
    "slug": "itr-filing-guide",
    "category": "Income Tax",
    "title": "Income Tax Return Filing Guide: Documents, Checks and Common Mistakes",
    "excerpt": "A step-by-step ITR preparation guide covering income records, AIS, Form 26AS, deductions, return selection and post-filing verification.",
    "metaTitle": "Income Tax Return Filing Guide: Documents and Checks",
    "metaDescription": "Prepare for ITR filing with a document checklist, AIS and Form 26AS reconciliation, income-source review and post-filing steps.",
    "content": "Income tax return filing guide: prepare before you submit\n\nAn income-tax return should reflect your complete and correctly classified income, eligible deductions and tax credits for the relevant financial year. The right return form and reporting requirements depend on your taxpayer status and income sources. Collect records early and reconcile them before filing instead of relying on one document alone.\n\n1. Identify every income source\nMake a list of salary, pension, interest, rent, business or professional receipts, capital gains, dividends, foreign income and any other applicable income. Not every taxpayer has all these categories, but missing a small bank interest amount or a securities transaction can create a mismatch. If you have freelance income, organise invoices, receipts, expense records and business-related bank entries.\n\n2. Collect common documents\nDepending on your situation, you may need PAN and identity details, Form 16, salary slips, bank interest certificates, annual bank statements, rent or housing-loan records, eligible deduction proofs, capital-gains statements, securities broker reports and records of tax already paid. Business and professional taxpayers may need books, turnover details, expense records and applicable financial statements. Keep documents for the full year, not only the last few months.\n\n3. Reconcile AIS, TIS and Form 26AS\nReview the Annual Information Statement (AIS), Taxpayer Information Summary (TIS) and Form 26AS where applicable. Compare the information with your own records. These statements are useful checks, but they should not replace your source documents or your responsibility to report income correctly. If an item appears unfamiliar, investigate it and follow the applicable process for feedback or correction where available. Do not ignore a mismatch simply because the amount is small.\n\n4. Select the appropriate ITR form\nThe correct form depends on factors such as taxpayer category, income sources, business or professional activity, capital gains and other conditions in the current instructions. Do not select a form solely because it was used last year. Review the current Income Tax Department guidance for the assessment year and seek professional review if you have multiple income types, foreign assets or income, complex capital gains, or business income.\n\n5. Review deductions, exemptions and tax regime choices\nClaim only deductions and benefits for which you qualify and can support with records. Check the applicable tax regime rules and the effect of your choices for the relevant year. Do not assume that a deduction is available merely because you made a payment; eligibility, limits and documentation matter. Keep proofs and calculations with your tax records.\n\n6. Check tax payments and credits\nCompare TDS, TCS, advance tax and self-assessment tax details with available statements and payment challans. Check the amount, taxpayer details and relevant financial year. If a credit is missing or differs, investigate before filing and follow the applicable correction route. Do not enter a tax credit without support.\n\n7. Review before submission\nBefore filing, confirm personal details, bank account information, income totals, deductions, tax regime, tax credits and tax payable or refund position. Check that the selected form is suitable and that schedules relevant to your income have been completed. Keep a copy of the final return and supporting calculations.\n\n8. Complete post-filing verification\nFiling and verification are separate steps where verification is required. Complete verification within the applicable time limit and save the acknowledgement and confirmation. Track any later communication or refund status through official channels. Do not share passwords, OTPs or full login credentials with an untrusted person.\n\nCommon ITR mistakes\n- Forgetting savings-account interest or other small income.\n- Reporting figures without reconciling AIS, TIS, Form 26AS and source records.\n- Choosing a form without reviewing the current eligibility rules.\n- Claiming unsupported deductions or missing required disclosures.\n- Entering incorrect bank details.\n- Forgetting verification after submission.\n- Waiting until the last minute to collect capital-gains or business records.\n\nA simple workflow is to collect documents, classify income, reconcile tax statements, determine the applicable form, calculate the tax, review the return, submit it, verify it and archive the acknowledgement. Keep a record of the assumptions and supporting documents used.\n\nHow FileFast Global can help\nFileFast Global helps organise income and tax records, review common statement mismatches and prepare eligible taxpayers' returns based on the information provided. Fees depend on income sources and complexity and are confirmed before work starts. Cases involving complex foreign income, residency questions or specialised tax issues may need additional specialist advice.\n\nRelated service: ITR filing.\n\nDisclaimer: General information only. Tax rules, forms and deadlines can change; use the official instructions for the relevant assessment year."
  },
  {
    "_id": "starter-blog-3",
    "slug": "fssai-registration-basics",
    "category": "Business Compliance",
    "title": "FSSAI Registration and Licence Guide for Food Businesses",
    "excerpt": "Understand how to prepare for FSSAI registration or licensing, which business details to collect and common application mistakes to avoid.",
    "metaTitle": "FSSAI Registration Guide for Food Businesses in India",
    "metaDescription": "A practical guide to FSSAI registration and licensing, business activity classification, documents, application preparation and renewal checks.",
    "content": "FSSAI registration and licence guide for food businesses\n\nFood businesses must identify the appropriate food-safety registration or licence for their activity. The correct route can depend on the kind of food business, scale of operations, location, turnover or capacity criteria and current Food Safety and Standards Authority of India (FSSAI) rules. Do not assume that every food business uses the same application category.\n\nWhich businesses should assess the requirement?\nExamples include food manufacturers, restaurants, caterers, cloud kitchens, retailers, distributors, storage operators, transporters, repackers, importers and certain home-based food businesses. The category and requirements depend on what the business actually does. A business that both manufactures and sells food may need a different assessment from a small retailer.\n\nInformation to collect before applying\nPrepare the legal name and constitution of the business, applicant and authorised-person details, contact information, operating address, nature of food activity and any information about manufacturing or storage capacity requested for the applicable category. Keep premises evidence and other supporting documents relevant to the business type available. The official application system may request additional information based on the activity and category.\n\nChoose the activity accurately\nDescribe the actual operation rather than selecting a category based only on the lowest fee or shortest form. For example, preparing food, repacking a product, storing food and distributing packaged products are not necessarily the same activity. If you operate more than one activity or location, assess each applicable requirement. Confirm the current classification and eligibility criteria before paying or submitting.\n\nApplication preparation workflow\n1. Map the business activities and operating locations.\n2. Identify the category using current official FSSAI guidance.\n3. Collect the identity, constitution, premises and activity-specific documents.\n4. Check that the business name and address are consistent across records.\n5. Complete the application carefully and review all declarations.\n6. Respond to any official clarification or inspection requirement.\n7. Save the registration or licence, note the validity and maintain a renewal reminder.\n\nCommon mistakes\n- Selecting a category that does not match the actual business activity.\n- Entering a different business address from the supporting records.\n- Omitting an activity or additional location.\n- Uploading incomplete, unclear or outdated documents.\n- Treating registration as a substitute for food-safety practices and record keeping.\n- Missing a renewal or failing to update information when circumstances change.\n\nWhat happens after approval?\nKeep the registration or licence accessible at the business premises as required, follow applicable food-safety and hygiene requirements, maintain relevant records, and monitor the validity and conditions of the approval. The licence does not remove other obligations that may apply, such as local trade permissions, tax registrations, labour requirements or fire and premises rules. These are separate questions and depend on the location and business model.\n\nHow FileFast Global can help\nFileFast Global can help organise application details, identify the documents to prepare and support the submission process based on the business information supplied. The applicable category and approval remain subject to current rules and authority review. We do not promise a guaranteed approval or timeline.\n\nBefore applying, verify the latest category criteria, fee and document requirements through official FSSAI resources. This article is general information, not legal advice."
  },
  {
    "_id": "starter-blog-4",
    "slug": "global-tax-readiness-indian-businesses",
    "category": "Global Business",
    "title": "Global Tax Readiness Checklist for Indian Businesses Expanding Overseas",
    "excerpt": "A cross-border planning checklist for Indian founders selling abroad, hiring overseas or opening a new international operation.",
    "metaTitle": "Global Tax Readiness Checklist for Indian Businesses",
    "metaDescription": "Plan cross-border growth with a checklist covering markets, indirect tax, invoicing, contracts, records, hiring and local professional advice.",
    "content": "Global tax readiness: a checklist for Indian businesses expanding overseas\n\nSelling internationally can create tax, registration, invoicing, customs, employment and record-keeping questions in both India and the destination market. The right answer depends on what you sell, where customers are located, how goods move, where people work and which legal entities sign the contracts. A checklist helps you identify questions early; it cannot replace country-specific advice.\n\n1. Map the business model\nWrite down the countries where you have customers, suppliers, inventory, staff, agents, contractors or offices. Identify whether you sell goods, digital products, software, consulting or other services. Note where the service is delivered, where goods are stored and dispatched, and which entity receives payment. These details may affect indirect tax, customs, income tax and reporting obligations.\n\n2. Understand indirect tax and registration triggers\nDo not assume that an Indian GST registration automatically covers foreign obligations. A destination market may have VAT, GST, sales tax or other registration rules based on sales, customer type, local inventory, marketplace arrangements or business presence. Thresholds, registration requirements and filing frequency differ by jurisdiction and can change. Ask a qualified local adviser to confirm the rules before trading at scale.\n\n3. Review export and import documentation\nFor goods, map invoices, shipping documents, customs declarations, product classification, origin and any licence or product-safety requirements. For services, preserve contracts, statements of work, invoices, evidence of delivery and payment records. Indian exporters should also check the applicable GST export treatment, documentation and any relevant LUT or refund process with a qualified adviser for their case.\n\n4. Design invoicing and accounting early\nSet up a consistent process for invoice numbering, currencies, exchange rates, tax treatment, credit notes, refunds and payment-provider fees. Reconcile gross sales to net settlements rather than treating the amount deposited by a marketplace as the full sales value. Keep separate records for taxes collected, refunds, chargebacks, platform fees and currency conversion. Confirm whether local invoice fields or retention periods apply.\n\n5. Check contracts, entity and permanent establishment questions\nDecide which entity contracts with the customer, owns intellectual property, hires staff and bears commercial risk. A local office, employee, dependent agent or other activity can raise tax or registration questions. Do not assume that having no incorporated subsidiary automatically means there are no local tax obligations. Get jurisdiction-specific advice before setting up a local presence or signing material contracts.\n\n6. Plan for employees and contractors\nHiring abroad can involve payroll withholding, social contributions, employment law, worker classification, benefits and registration. Contractor status is not determined by the label in a contract alone. Before hiring, ask local professionals to review the proposed arrangement and the responsibilities of the Indian and overseas entities.\n\n7. Prepare a document pack\nMaintain incorporation records, ownership and director details, PAN and GST information, bank details, contracts, sample invoices, marketplace agreements, projected sales by country, product or service descriptions, shipping flows and existing tax registrations. A structured pack helps advisers answer specific questions faster and reduces repeated document requests.\n\n8. Create a compliance calendar\nList registrations, periodic returns, payment dates, annual reports, renewal dates and record-retention requirements by jurisdiction. Assign an owner for each task and keep proof of filing and payment. Review the calendar when you enter a new market, change platforms, cross a threshold or begin holding stock overseas.\n\nA practical first-month action plan\nWeek one: map customers, products, goods movement, payment flows and people. Week two: gather contracts, invoices and company records. Week three: ask India-side and destination-country advisers to assess registration, invoicing and reporting. Week four: configure accounting codes, document storage and a compliance calendar before scaling marketing or inventory.\n\nHow FileFast Global supports cross-border readiness\nFileFast Global can help organise India-side tax and compliance records and coordinate questions that need country-specific specialists. The service scope should clearly state which jurisdiction and tasks are covered. International tax outcomes depend on facts and local law, so no universal checklist can determine every obligation.\n\nDisclaimer: General educational information, not country-specific tax or legal advice. Confirm requirements with qualified professionals in each relevant jurisdiction."
  },
  {
    "_id": "starter-blog-5",
    "slug": "documents-required-for-gst-return-filing",
    "category": "GST",
    "title": "Documents Required for GST Return Filing: GSTR-1 and GSTR-3B Checklist",
    "excerpt": "A detailed return-preparation checklist for sales, purchases, GSTR-2B, credit notes, exports, e-commerce settlements and reconciliation.",
    "metaTitle": "Documents Required for GST Return Filing: Full Checklist",
    "metaDescription": "Prepare sales registers, invoices, purchase records, GSTR-2B, credit notes, export documents and marketplace reports for GST return filing.",
    "content": "Documents required for GST return filing: a practical checklist\n\nThe documents needed for GST return filing depend on the taxpayer's business model, return period, transaction volume and applicable scheme. Collecting records before preparing the return helps identify differences early. Do not file a Nil return or claim input tax credit solely because a summary appears blank or an amount appears in a portal statement; review the underlying transactions and applicable rules.\n\nA. Core records to collect\n- GSTIN, return period and details of the filing scheme.\n- Sales register and tax invoices.\n- Purchase register and relevant expense invoices.\n- Credit notes, debit notes and amendment details.\n- Previous GSTR-1 and GSTR-3B, plus unresolved reconciliation items.\n- GST portal liability and ledger details relevant to the period.\n- HSN summary and e-invoice information where applicable.\n- E-way bill data, export records, LUT details or other supporting documents where relevant.\n\nB. For GSTR-1\nOrganise outward supplies by the applicable reporting category, including B2B invoices, B2C supplies, exports, credit/debit notes and amendments. Check customer GSTINs, invoice dates and numbers, taxable values, place-of-supply details, tax rates and tax amounts. Review HSN reporting and e-invoice details where applicable. E-commerce sellers should reconcile platform reports to their own sales records, including cancellations, returns and adjustments. Avoid uploading raw marketplace totals without understanding whether the report shows order value, shipped sales, returns or net settlement.\n\nC. For GSTR-3B\nPrepare a summary of outward tax liability, eligible input tax credit, reversals or other adjustments, and tax already paid or payable. Compare the sales summary with GSTR-1 and accounting records. Reconcile purchase data with GSTR-2B and inspect the underlying invoices. GSTR-2B is a useful source for reconciliation but does not by itself establish that every listed credit is eligible. Review business use, restrictions, documentation and other conditions that apply to the claim.\n\nD. E-commerce marketplace sellers\nFor platforms such as online marketplaces, gather order or sales reports, returns and cancellations, fee invoices, settlement statements, tax collected at source (where applicable), and payment gateway or bank reports. Keep sales and platform deductions separate. The net amount deposited into the bank is not necessarily the taxable sales value. Reconcile the gross transaction value, customer refunds, platform fees, taxes collected and settlement adjustments so each amount is classified correctly.\n\nE. Exports and zero-rated supplies\nKeep export invoices, shipping or service evidence, payment records and the documents relevant to the chosen export procedure. If a Letter of Undertaking or refund process applies, retain the related acknowledgement and working papers. The correct reporting depends on the transaction and current rules, so review each export category rather than treating all overseas receipts identically.\n\nF. Reconciliation before filing\n1. Match the sales register to invoices and the relevant marketplace or bank data.\n2. Check invoice classifications, GSTINs, tax rates and credit notes.\n3. Compare purchase records with GSTR-2B and identify missing or ineligible items.\n4. Reconcile GSTR-1 totals with the output liability working for GSTR-3B.\n5. Review cash and credit ledger balances and any earlier-period adjustments.\n6. Resolve material differences or document the reason and treatment.\n7. Confirm the final summary with the responsible person before submission.\n8. Save filed returns, acknowledgements and supporting calculations.\n\nWhen is a Nil return appropriate?\nA Nil return should be used only when the facts and applicable portal rules support it. Check for reportable outward supplies, credit notes, amendments, liability, eligible or reversed ITC and other relevant entries for the period. If the business had no sales but had other reportable transactions or tax obligations, the correct return may not be Nil. When uncertain, examine the records and current instructions before filing.\n\nCommon errors to avoid\n- Treating bank settlement as the sales value.\n- Ignoring credit notes, returns or amendments.\n- Claiming all credit in GSTR-2B without eligibility checks.\n- Using a previous period's tax rate or customer classification without review.\n- Reporting exports or marketplace transactions in the wrong category.\n- Filing Nil without checking all transactions and adjustments.\n- Failing to retain a copy of the filed return and working papers.\n\nRelated reading and services\nIf you are registering for the first time, read our GST registration documents checklist and GST registration address proof guide. For filing assistance, see our GSTR-1 filing and GSTR-3B filing services.\n\nFileFast Global can help organise records, reconcile marketplace data and prepare the return for review. The scope and fee depend on transaction volume and complexity and are confirmed before work begins.\n\nDisclaimer: General information only. GST law, portal functionality and filing instructions can change. Check current official guidance for the relevant period."
  },
  {
    "_id": "starter-blog-6",
    "slug": "gst-registration-address-proof",
    "category": "GST",
    "title": "GST Registration Address Proof: Owned, Rented, Shared and Coworking Premises",
    "excerpt": "Understand how to prepare address evidence for different premises arrangements and reduce avoidable inconsistencies in a GST application.",
    "metaTitle": "GST Registration Address Proof: Owned, Rented and Shared Premises",
    "metaDescription": "Learn how to prepare GST registration address proof for owned, rented, leased, consent-based and shared business premises.",
    "content": "GST registration address proof: a practical guide by premises type\n\nThe principal place of business declared in a GST registration application should be supported by documents appropriate to the actual premises arrangement. The right documents depend on whether the property is owned, rented, leased, shared or used with the owner's consent. Portal requirements and the documents accepted for a specific application can vary, so treat this as a preparation guide and confirm the current requirements before submission.\n\n1. Owned premises\nIf the business operates from property owned by the applicant or relevant business, keep suitable ownership-related records available. Depending on the case, these may include property-tax or municipal records, utility records or other supporting evidence accepted for the application. A utility bill may help support the address but should not be assumed to establish every ownership or occupancy fact on its own.\n\n2. Rented or leased premises\nPrepare the rent or lease agreement and supporting premises or owner records relevant to the case. Check that the agreement identifies the parties and property clearly and is current for the period of use. If the address appears differently across documents, determine the correct form and gather appropriate supporting evidence rather than editing documents. Do not submit an agreement for premises the business is not authorised to use.\n\n3. Premises used with consent\nWhere the applicant uses premises with the owner's permission rather than under a conventional rent agreement, a consent letter and supporting proof relating to the owner or premises may be relevant. The letter should accurately describe the arrangement and the location. Confirm what the current portal instructions require for the particular case.\n\n4. Shared offices and coworking spaces\nCoworking arrangements can involve dedicated offices, shared desks, virtual-office services or other contractual structures. These are not identical. Review the actual agreement, the rights it grants, the documents available from the provider and whether the arrangement supports the business address declaration under current rules. Do not assume that buying a virtual-office package automatically guarantees GST registration approval.\n\n5. Additional places of business\nIf the business operates from more than one location, assess whether other places need to be declared and what records support them. Warehouses, branches or other locations may have separate implications depending on the facts. Keep a list of addresses and the business activity carried on at each.\n\nAddress consistency checklist\n- Use the complete and accurate address, including unit or door number, street, locality, city, state and PIN code.\n- Check spelling and formatting across the application and supporting documents.\n- Make sure the applicant's name and the relevant owner, tenant or entity details are understandable.\n- Use clear, complete scans and include all relevant pages.\n- Confirm the document supports the actual occupancy or consent arrangement.\n- Keep contact details available in case clarification or verification is requested.\n- Never alter, fabricate or misrepresent a document.\n\nIf a clarification notice is received\nRead the notice carefully and identify the exact point that needs clarification. Check the application, submitted documents and actual premises arrangement. Prepare a concise response supported by genuine evidence and submit it through the correct portal workflow within the applicable deadline. If the notice is unclear or the facts are complicated, obtain professional help promptly. A response should address the question asked, not simply upload unrelated papers.\n\nOther documents may still be needed\nAddress proof is only one part of the application. Depending on the entity, the applicant may also need PAN, identity and contact details, constitution documents, authorised-signatory details and other supporting records. Review the full GST registration documents checklist before applying.\n\nHow FileFast Global can help\nFileFast Global can review the premises arrangement, help organise the available documents and identify obvious consistency issues before the application is prepared. Approval and processing time depend on the facts and the tax authority's review; no outcome or timeline can be guaranteed.\n\nDisclaimer: General information only. Confirm the current GST portal instructions and applicable law for your circumstances."
  },
  {
    "_id": "starter-blog-7",
    "slug": "gst-registration-for-ecommerce-sellers",
    "category": "GST",
    "title": "GST for E-commerce Sellers in India: Registration, Marketplace Reports and Returns",
    "excerpt": "A practical GST preparation guide for online sellers, covering business model checks, marketplace statements, returns, TCS reconciliation and filing records.",
    "metaTitle": "GST for E-commerce Sellers: Registration and Return Checklist",
    "metaDescription": "Understand GST preparation for e-commerce sellers, including registration questions, marketplace sales, returns, TCS statements and GSTR-1/GSTR-3B records.",
    "content": "GST for e-commerce sellers in India: what to organise before selling online\n\nSelling through an online marketplace adds reporting and reconciliation work to ordinary bookkeeping. The exact GST treatment depends on what you sell, whether you sell goods or services, the platform arrangement, where your customers are located and the current law. Registration exceptions and marketplace rules can be specific, so do not rely on a generic statement that every seller must register or that every seller is exempt.\n\n1. Review the registration position first\nBefore listing products, map your business constitution, product or service category, turnover, states involved and the marketplace model. Certain activities and seller categories can have specific registration rules or conditions. Confirm the current position with official GST guidance or a qualified adviser for your facts. Do not select an approach based only on advice intended for a different product category or platform.\n\n2. Separate sales from settlements\nMarketplace payouts commonly reflect several items: customer transactions, cancellations, refunds, platform fees, shipping or fulfilment charges, taxes collected or withheld, reserves and settlement adjustments. The amount deposited into the bank is therefore not necessarily the sales value to report. Keep the gross sales report, returns report, fee invoices and settlement statement separately.\n\n3. Build a monthly or quarterly source pack\nCollect the marketplace sales report for the relevant period, order and return details, credit notes, fee invoices, settlement statements, TCS information where applicable, bank or payment gateway records and your own sales register. Preserve the report date range and export version. If several platforms are used, reconcile each separately before combining the figures for the return.\n\n4. Reconcile GSTR-1\nClassify transactions according to the applicable reporting tables and facts. Review B2B customer details, B2C sales, credit notes, amendments, exports and other relevant categories. Check invoice values, dates, tax rates and place-of-supply details. Do not assume a marketplace report's internal labels map directly to GST return tables without checking the meaning of each field.\n\n5. Reconcile GSTR-3B and input tax credit\nPrepare output liability from the underlying sales records and compare it with the return working. For purchases and platform expenses, keep tax invoices and compare relevant data with GSTR-2B. Check whether each credit is eligible and properly documented before claiming it. A fee invoice or portal entry should not be treated as automatically eligible without considering the applicable conditions.\n\n6. Understand TCS and settlement adjustments\nWhere tax collected at source under GST applies, reconcile the relevant marketplace statement with the portal records and your books. TCS is not the same as sales revenue and should not simply be deducted from taxable sales. Track gross sales, refunds, fees, tax collections and settlement amounts in separate columns so that each item can be mapped correctly.\n\n7. Handle cancellations and returns carefully\nIdentify whether an order was cancelled before supply, a completed sale was returned, a credit note was issued or a marketplace adjusted a later settlement. These events may have different accounting and reporting effects. Match adjustments to the original transaction and retain supporting records. Avoid subtracting the same return twice because it appears in both an order report and a settlement report.\n\nA simple reconciliation table\nFor each platform and tax period, maintain: gross transaction amount, cancellations, customer returns, credit notes, taxable value, tax amount, platform fees, GST on fees, TCS where applicable, other adjustments and net settlement. Add source-file names and notes for differences. This creates an audit trail and makes it easier to explain why the bank deposit differs from reported sales.\n\nCommon online seller mistakes\n- Reporting net payout as gross sales.\n- Mixing platform fees with sales returns.\n- Treating TCS as a reduction of taxable turnover.\n- Missing credit notes or duplicated returns.\n- Claiming input tax credit without checking invoice details and eligibility.\n- Combining multiple marketplaces without a platform-wise reconciliation.\n- Filing Nil because there were no payouts, even though transactions or adjustments exist.\n- Failing to save source reports used to prepare the return.\n\nRecommended workflow\nDownload reports for the exact period, save original copies, reconcile each platform, investigate differences, classify sales and adjustments, review GST liability and eligible ITC, confirm the summary and file the applicable returns. Keep acknowledgements and working papers with the books.\n\nHow FileFast Global can help\nFileFast Global supports GST return preparation and marketplace-data reconciliation based on the reports provided. Fees depend on platform count, invoice volume and reconciliation complexity. We confirm the scope before starting.\n\nDisclaimer: General information only. Marketplace arrangements and GST requirements differ; verify the current rules that apply to your business."
  },
  {
    "_id": "starter-blog-8",
    "slug": "gstr-1-vs-gstr-3b",
    "category": "GST",
    "title": "GSTR-1 vs GSTR-3B: Differences, Reconciliation and Common Errors",
    "excerpt": "Learn what each GST return reports, how the figures should be reconciled and what to check before filing.",
    "metaTitle": "GSTR-1 vs GSTR-3B: Key Differences and Reconciliation",
    "metaDescription": "Understand GSTR-1 and GSTR-3B, compare outward-supply reporting with summary tax liability, and follow a practical reconciliation checklist.",
    "content": "GSTR-1 vs GSTR-3B: how the returns differ and why reconciliation matters\n\nGSTR-1 and GSTR-3B serve different purposes. GSTR-1 reports details of outward supplies in the applicable tables, while GSTR-3B is a summary return used to report tax liability, eligible input tax credit and related amounts. The figures should be consistent where they relate to the same period and transactions, but the returns are not interchangeable.\n\nWhat does GSTR-1 generally cover?\nGSTR-1 contains outward-supply details such as applicable B2B invoices, B2C supplies, exports, credit notes, debit notes and amendments. The exact tables and reporting requirements depend on the taxpayer and transaction. Correct customer GSTINs, invoice values, tax rates, dates and classification are important because errors can affect the recipient's records and later reconciliations.\n\nWhat does GSTR-3B generally cover?\nGSTR-3B summarises output tax liability, eligible input tax credit, reversals or adjustments and the resulting payment position. It is not a substitute for maintaining invoice-level records. Before preparing it, review the sales summary, purchase records, GSTR-2B and portal ledgers as relevant. Input tax credit should be claimed only after checking eligibility and applicable restrictions.\n\nWhy can figures differ?\nDifferences can arise from credit notes, amendments, timing, classification errors, missing invoices, prior-period adjustments, export or marketplace reporting, rounding, or incorrect source data. A difference is a signal to investigate, not an instruction to force one return to match by changing a genuine transaction. Record the reason and treatment for every material variance.\n\nA practical reconciliation workflow\n1. Freeze the source data for the tax period and keep original exports.\n2. Reconcile sales register totals to invoice records and the applicable GSTR-1 working.\n3. Check B2B GSTINs, B2C classification, export treatment, credit notes and amendments.\n4. Compare the outward tax liability working with the GSTR-3B summary.\n5. Reconcile purchase records to GSTR-2B and inspect supporting invoices.\n6. Review ITC eligibility, reversals and other adjustments under current rules.\n7. Check portal liability, cash ledger and credit ledger details.\n8. Resolve differences or document a supportable explanation before filing.\n9. Review the final summary and preserve acknowledgements and working papers.\n\nExample: marketplace seller\nSuppose a marketplace report shows gross customer transactions, then lists refunds, platform fees, tax on fees, TCS and a net payout. The net payout is not automatically the sales figure for GSTR-1. Reconcile gross transactions and returns to the sales register, treat fees and taxes on fees according to their own records, and reconcile TCS separately where applicable. Use the correct reporting and credit treatment for each item rather than subtracting everything from sales.\n\nWhat if there were no sales?\nNo sales do not automatically answer every question about the return. Review inward supplies, input tax credit, reversals, credit notes, adjustments and other reportable amounts. File Nil only if the facts and current portal rules support it. If there is tax liability or another relevant entry, the return may require reporting even when sales were zero.\n\nCommon mistakes\n- Treating GSTR-1 as a tax-payment return or GSTR-3B as invoice-level sales reporting.\n- Changing invoice dates or values to force the returns to match.\n- Ignoring credit notes, amendments or prior-period adjustments.\n- Claiming all credit in GSTR-2B without eligibility review.\n- Using net marketplace settlements as taxable turnover.\n- Filing Nil without checking all entries.\n- Failing to save reconciliation workings.\n\nRelated services: GSTR-1 filing and GSTR-3B filing. For new registrations, see the GST registration documents checklist.\n\nFileFast Global can help prepare return data, reconcile sales and purchase records, and explain differences before filing. The actual treatment depends on the records and applicable GST rules.\n\nDisclaimer: General information only, not advice for a specific transaction. Confirm the current portal instructions and applicable law for the relevant period."
  },
  {
    "_id": "starter-blog-9",
    "slug": "gst-input-tax-credit-checklist",
    "category": "GST",
    "title": "GST Input Tax Credit Checklist: How to Review ITC Before GSTR-3B",
    "excerpt": "A practical review process for purchase invoices, GSTR-2B, business use, restricted credits and documentation before claiming ITC.",
    "metaTitle": "GST Input Tax Credit Checklist Before GSTR-3B Filing",
    "metaDescription": "Use this GST ITC checklist to reconcile purchase invoices with GSTR-2B, review eligibility and restrictions, and document credit decisions.",
    "content": "GST input tax credit checklist: review before claiming ITC\n\nInput tax credit (ITC) can reduce the net GST payable when a registered taxpayer meets the applicable conditions. But a purchase invoice or an entry in GSTR-2B does not automatically mean that the full tax amount can be claimed. Eligibility, business use, supporting documents, restrictions and current rules must be reviewed.\n\n1. Collect the purchase records\nPrepare the purchase register, tax invoices, debit notes, credit notes, import documents where relevant, expense invoices and previous-period ITC workings. Keep the supplier GSTIN, invoice number, date, taxable value and tax amount visible. Separate business purchases from personal or non-business expenditure.\n\n2. Reconcile against GSTR-2B\nCompare invoice-level records with GSTR-2B for the relevant period. Identify missing invoices, differences in values, duplicate entries, credit notes and invoices appearing in a different period. Follow up with suppliers when appropriate and document unresolved differences. GSTR-2B is an important reconciliation tool, not a blanket approval of every credit shown.\n\n3. Check basic eligibility and restrictions\nReview the conditions and restrictions that apply to the particular purchase and taxpayer. Consider whether the goods or services are used for business, whether the document is valid, whether the credit is restricted or blocked, and whether reversals or other adjustments apply. Some categories of expenditure have special limitations; do not apply a universal percentage or rule without checking the current law and facts.\n\n4. Check invoice and supplier details\nVerify that the invoice belongs to the business, the supplier details are credible, tax has been charged appropriately and the invoice has not been duplicated. Check credit notes and amendments that reduce or change the original claim. Keep evidence of the transaction and business purpose.\n\n5. Review timing and reversals\nITC treatment can depend on the tax period, payment and other conditions under current law. If a credit is deferred, reversed or reclaimed, keep a clear working showing the original amount, reason, period and later treatment. Do not carry forward an unexplained difference from one month to another.\n\n6. Reconcile before GSTR-3B\nPrepare a schedule with invoice value, tax amount, GSTR-2B status, eligibility conclusion, credit claimed, credit deferred or reversed and supporting notes. Reconcile the final eligible amount to the GSTR-3B working. Review output liability and other adjustments separately so that ITC decisions are not mixed with sales reporting.\n\nCommon ITC errors\n- Claiming every amount appearing in GSTR-2B without review.\n- Claiming an invoice twice.\n- Ignoring supplier credit notes.\n- Treating personal expenses as business inputs without analysing eligibility.\n- Missing restrictions or required reversals.\n- Failing to keep supporting invoices and payment records.\n- Carrying forward differences without a documented explanation.\n\nWhat to retain\nKeep invoices, purchase-register exports, GSTR-2B copies, supplier communications, eligibility workings and the filed return acknowledgement. A consistent paper trail helps answer later questions and makes future-period reconciliation easier.\n\nHow FileFast Global can help\nFileFast Global can help compare purchase records with GSTR-2B, organise the ITC working and identify differences that need review. Final credit treatment depends on the documents, facts and applicable law.\n\nDisclaimer: General information only. ITC rules can be detailed and change over time; confirm the rules applicable to the relevant transaction and period."
  },
  {
    "_id": "starter-blog-10",
    "slug": "gst-return-filing-calendar-and-preparation",
    "category": "GST",
    "title": "GST Return Filing Calendar: How to Prepare Each Tax Period",
    "excerpt": "Build a repeatable GST compliance routine for data collection, reconciliation, return review, payment checks and record retention.",
    "metaTitle": "GST Return Filing Calendar and Monthly Preparation Checklist",
    "metaDescription": "Create a reliable GST filing routine with a document checklist, reconciliation steps, return review and official due-date checks.",
    "content": "GST return filing calendar: build a reliable period-by-period routine\n\nA repeatable filing routine is often more useful than collecting documents at the last minute. The returns and due dates that apply depend on the taxpayer's registration, scheme, turnover, activity, notifications and tax period. Use the official GST portal to confirm the current due date and filing requirement rather than relying on a fixed date remembered from a previous period.\n\nStep 1: Confirm the tax period and return scheme\nAt the start of each period, confirm the GSTIN, filing frequency, applicable returns and any scheme or special condition. Check whether the taxpayer is monthly or quarterly under the applicable arrangement and whether a special notification or extension affects the period.\n\nStep 2: Set a document cut-off\nAsk for sales registers, purchase registers, invoices, credit and debit notes, marketplace reports, export records, e-invoice or e-way bill summaries where relevant, and prior-period reconciliation notes. Keep the original source files and record when each report was downloaded. If information is missing, flag it before preparing the return.\n\nStep 3: Reconcile sales and purchases\nMatch sales records to invoices and settlement reports. Compare purchase records with GSTR-2B and inspect supporting invoices. Review customer GSTINs, tax rates, credit notes, returns, amendments and other adjustments. For e-commerce sellers, separate gross sales, refunds, platform fees, taxes collected and net settlement.\n\nStep 4: Prepare the returns\nPrepare GSTR-1 using the applicable outward-supply classifications. Prepare the GSTR-3B working from the reviewed tax liability, eligible ITC and other adjustments. Check that related figures are consistent and investigate differences. Never change a genuine invoice date or transaction value simply to bypass a portal validation or monthly restriction.\n\nStep 5: Review payment and portal ledgers\nCheck the tax payable, available credit and cash ledger, challans and any earlier-period balance or liability. Ensure the responsible person understands the payment amount and filing status. Keep proof of payment and the filed return acknowledgement.\n\nStep 6: File and archive\nComplete the applicable portal steps and verify the filing status. Save the filed returns, acknowledgements, source reports and reconciliation workings in a folder labelled with the GSTIN and tax period. Restrict access to sensitive data and avoid sending passwords or OTPs through unsecured channels.\n\nA simple internal timeline\n- Early in the period: request records and confirm filing requirements.\n- After receiving data: reconcile sales, purchases and platform statements.\n- Before submission: review variances, tax liability, ITC and payment.\n- After filing: save acknowledgements, update the compliance tracker and record open issues for the next period.\n\nCommon process failures\n- Starting after the due date is close.\n- Receiving incomplete reports from different platforms.\n- Mixing periods or GSTINs in the same workbook.\n- Using net bank deposits as sales.\n- Ignoring unresolved GSTR-2B differences.\n- Filing without a documented review.\n- Failing to preserve proof of filing.\n\nFor multi-GSTIN businesses, maintain separate workpapers for each GSTIN and period, then use a consolidated tracker only for management visibility. Assign an owner to each task and keep a status field for documents received, reconciliation complete, return prepared, approved, filed and acknowledgement saved.\n\nFileFast Global can help businesses organise GST records and prepare GSTR-1 and GSTR-3B based on the information provided. Scope and fees depend on transaction volume and complexity.\n\nDisclaimer: General information only. Always verify the current due date and filing instructions for your GSTIN and period through official GST resources."
  }
];
