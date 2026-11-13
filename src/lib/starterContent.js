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

const starterServicesData = [
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
}),
  baseService({
    name: "Accounting & Bookkeeping Services",
    slug: "accounting-bookkeeping",
    category: "Accounting Services",
    sortOrder: 30,
    shortDescription: "Practical bookkeeping and accounting support to help small businesses keep organised financial records.",
    fullDescription: "FileFast Global provides accounting and bookkeeping support based on an agreed scope and transaction volume. Support may include recording sales, purchases and expenses; maintaining ledgers; bank and payment reconciliation; organising supporting documents; and preparing management summaries such as profit and loss or cash-flow reports where agreed. The exact deliverables, accounting method, reporting frequency and software workflow are confirmed before work starts. This service is not a statutory audit, independent assurance engagement or substitute for a regulated professional opinion.",
    benefits: [
      "Keep sales, purchase and expense records organised",
      "Reconcile bank statements and payment-platform settlements within the agreed scope",
      "Maintain clearer ledgers and supporting schedules",
      "Prepare periodic management summaries where included in the engagement",
      "Make information easier to use for GST, TDS and income-tax compliance"
    ],
    eligibility: [
      "Small businesses and proprietors needing regular bookkeeping support",
      "Startups and service providers that want organised monthly records",
      "Online sellers needing marketplace settlement and payout reconciliation",
      "Businesses that need a backlog review before regular bookkeeping begins"
    ],
    requiredDocuments: [
      "Business constitution details and applicable PAN/GSTIN",
      "Sales invoices, sales register and credit notes",
      "Purchase invoices and expense records",
      "Business bank statements for the agreed period",
      "Payment gateway or marketplace settlement reports, where applicable",
      "Existing ledgers, trial balance and opening balances, if available",
      "Accounting software export or access arranged securely, if applicable"
    ],
    processFlow: [
      { title: "Understand your business and scope", description: "Confirm the accounting period, transaction volume, software, accounts and required reports." },
      { title: "Collect and organise records", description: "Use a document checklist to gather bank statements, invoices, expenses and platform reports." },
      { title: "Record and reconcile", description: "Complete the agreed bookkeeping and reconciliation work, then flag missing information or differences." },
      { title: "Review and deliver", description: "Share the agreed ledgers, reconciliation summary and management reports for your review." }
    ],
    pricingInfo: "Custom quotation based on monthly transaction volume, number of bank accounts, platforms, backlog, software and reporting requirements. FileFast will confirm the written scope and professional fee before work begins. Audit, certification, payroll and specialist services are not included unless separately agreed and appropriately provided.",
    faqs: [
      { question: "What is included in bookkeeping?", answer: "Depending on the agreed scope, it can include recording sales, purchases and expenses, maintaining ledgers, bank reconciliation and organising supporting records. The exact deliverables are confirmed in writing before work begins." },
      { question: "Can you reconcile Amazon, Flipkart or other marketplace settlements?", answer: "Marketplace settlement reconciliation can be discussed as part of the engagement. The required reports, platforms, periods and transaction volume will be reviewed before confirming scope and fees." },
      { question: "Will I receive profit and loss and balance sheet reports?", answer: "Periodic management reports may be included where specifically agreed. The reporting basis and information required will be confirmed before the engagement starts." },
      { question: "Do you provide statutory audit or certification?", answer: "This service page describes bookkeeping and accounting support only. Statutory audit, independent assurance and regulated certification are not included. Where required, those services must be undertaken by an appropriately authorised professional." },
      { question: "How much does bookkeeping cost?", answer: "Fees depend on transaction volume, bank accounts, platforms, backlog and reporting needs. Share a brief description of your business to receive a scope-based quotation." }
    ],
    relatedServiceSlugs: ["gst-registration", "gstr-1-filing", "gstr-3b-filing", "tds-return-filing", "itr-filing"],
    metaTitle: "Accounting & Bookkeeping Services for Small Businesses | FileFast Global",
    metaDescription: "Get bookkeeping, ledger maintenance, bank reconciliation and management reporting support for small businesses in India. Scope and fees confirmed before work starts.",
    seoKeywords: "accounting services for small business India, bookkeeping services Chennai, bank reconciliation services, monthly bookkeeping, marketplace reconciliation"
  }),
  baseService({
    name: "Trademark Registration Support",
    slug: "trademark-registration",
    category: "Licenses",
    sortOrder: 31,
    shortDescription: "Trademark application preparation and filing coordination to help businesses protect their brand name, logo or identity in India.",
    fullDescription: "A trademark can help distinguish a business's goods or services from those of others. FileFast Global can help organise applicant details, identify the goods or services description to discuss, prepare an application document checklist and coordinate the filing process. A preliminary search can help identify potentially similar marks but cannot guarantee acceptance or registration. Examination, opposition, objections and final decisions are handled under the applicable Trade Marks law and by the Trade Marks Registry. Legal opinions and representation, where required, should be obtained from an appropriately qualified trademark professional or agent.",
    benefits: [
      "Understand the basic trademark application stages",
      "Organise applicant, brand and usage details",
      "Prepare a preliminary document checklist",
      "Coordinate application filing support and status follow-up",
      "Understand that objections or opposition may require separate professional work"
    ],
    eligibility: [
      "Individuals, proprietors, partnerships and companies seeking to protect a brand",
      "Businesses applying for a word mark, logo or other eligible mark",
      "Applicants who can identify the owner and the goods or services associated with the mark"
    ],
    requiredDocuments: [
      "Applicant name, address and legal constitution details",
      "Brand name and/or clear logo image",
      "Description of the goods or services associated with the brand",
      "Proposed trademark class, subject to confirmation",
      "Date of first use and supporting evidence, if claiming prior use",
      "Authorisation or power of attorney, where required",
      "Applicant identity and entity documents, as applicable"
    ],
    processFlow: [
      { title: "Share the brand details", description: "Provide the proposed word mark or logo, applicant details and goods or services." },
      { title: "Preliminary review", description: "Review the available details and identify search, classification and documentation questions. A search is not a guarantee of registration." },
      { title: "Prepare the application", description: "Compile the application information and supporting documents for applicant review." },
      { title: "Filing and status follow-up", description: "Coordinate the agreed filing steps and share available acknowledgements or status updates." },
      { title: "Handle further examination separately", description: "If an objection, opposition or hearing arises, explain the next steps and confirm any additional professional scope." }
    ],
    pricingInfo: "Professional fees depend on the number of marks, classes, applicant type and work required. Government fees are separate and depend on the applicable applicant category and filing details. A written quotation will be shared before proceeding. Objection replies, hearings and opposition matters are separately scoped.",
    faqs: [
      { question: "Can I register a business name as a trademark?", answer: "A business or brand name may be eligible for trademark protection, subject to distinctiveness, conflicts with earlier marks and other legal requirements. A preliminary search does not guarantee acceptance." },
      { question: "Can I register both a name and a logo?", answer: "A word mark and a logo/device mark are different forms of protection and may require separate applications. The suitable approach depends on the brand and intended protection." },
      { question: "How long does trademark registration take?", answer: "There is no guaranteed completion time. The process depends on examination, registry workload, objections, publication and any opposition or other proceedings." },
      { question: "Does filing mean my trademark is registered?", answer: "No. Filing creates an application record; it does not mean the mark has been accepted or registered. The application must proceed through the statutory process." },
      { question: "Are government fees included in the professional fee?", answer: "Government fees are separate and depend on applicant category and application details. The quotation will identify professional fees and applicable government charges separately." }
    ],
    relatedServiceSlugs: ["company-registration", "msme-registration", "fssai-registration"],
    metaTitle: "Trademark Registration Support in India | FileFast Global",
    metaDescription: "Get support preparing and coordinating trademark applications for brand names and logos in India. Understand documents, classes, fees and filing stages.",
    seoKeywords: "trademark registration India, trademark application support, brand name registration, logo trademark filing, trademark documents and fees"
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
  },
  {
    "_id":"starter-blog-2026-tax-transition",
    "slug":"income-tax-act-2025-ay-2026-27-tax-year-transition-guide",
    "category":"Income Tax",
    "title":"Income Tax Act 2025: AY 2026-27 vs Tax Year 2026-27 Explained",
    "excerpt":"A practical guide to the Indian income-tax transition, including which Act applies to FY 2025-26 and FY 2026-27.",
    "metaTitle":"Income Tax Act 2025: AY 2026-27 vs Tax Year 2026-27",
    "metaDescription":"Understand the transition from assessment year to tax year and how to organise records for FY 2025-26 and FY 2026-27.",
    "content":"## The key distinction\nIncome earned from 1 April 2025 to 31 March 2026 is reported for AY 2026-27 under the Income-tax Act, 1961. Income earned from 1 April 2026 to 31 March 2027 falls under the Income-tax Act, 2025 and is described as Tax Year 2026-27. The date you file a return does not, by itself, determine which Act applies.\n\n## Quick comparison\n- FY 2025-26 income: AY 2026-27, old Act and applicable old-Act forms.\n- FY 2026-27 income: Tax Year 2026-27, new Act and forms notified for that tax year.\n- Earlier-year proceedings generally continue under the applicable earlier law, subject to transitional provisions.\n\n## Records to keep separate\n1. Maintain separate folders and ledgers for each financial/tax year.\n2. Reconcile salary, business receipts, interest, capital gains and other income to source documents.\n3. Keep TDS/TCS certificates, challans and bank records with the correct period.\n4. Review AIS, TIS and Form 26AS where applicable.\n5. Confirm the correct AY or Tax Year and current return form on the official portal before filing.\n\n## Common mistakes\nDo not select Tax Year 2026-27 for FY 2025-26 income. Do not assume that filing after 1 April 2026 moves earlier income into the new Act. Do not mix tax payments or records from different periods.\n\n## How FileFast can help\nFileFast Global can help organise income records, reconcile tax statements and prepare a filing checklist. Scope and fees depend on income sources and complexity.\n\n## Official sources\nIncome Tax Department FAQs: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/%20income%20tax%20returns-faq\nNew Act FAQs: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/objective-and-scope-new-act-faq\n\nGeneral information only. Check current official forms, notifications and instructions for the relevant year."
  },
  {
    "_id":"starter-blog-2026-gstr2b-checklist",
    "slug":"gstr-2b-itc-reconciliation-monthly-checklist",
    "category":"GST",
    "title":"GSTR-2B and ITC Reconciliation: A Monthly Checklist for Businesses",
    "excerpt":"A practical monthly workflow to compare purchase registers with GSTR-2B, investigate differences and review ITC eligibility.",
    "metaTitle":"GSTR-2B ITC Reconciliation: Monthly GST Checklist",
    "metaDescription":"Learn how to reconcile purchase invoices with GSTR-2B, investigate mismatches and review eligible ITC before GSTR-3B.",
    "content":"## Why reconciliation matters\nGSTR-2B is an important input-tax-credit reconciliation source, but an invoice appearing in the statement does not automatically make the credit eligible. Review the statutory conditions, documents, receipt of goods or services, business use and restrictions.\n\n## Monthly process\n1. Export the purchase register with supplier GSTIN, invoice number/date, taxable value, tax and ledger.\n2. Download the relevant GSTR-2B and preserve the original file.\n3. Match supplier GSTIN, invoice number, date and tax amounts.\n4. Identify invoices in books but missing in GSTR-2B, entries not in books, duplicates, amendments, credit notes and tax/value mismatches.\n5. Follow up with suppliers where corrections may be needed. Do not alter genuine source records simply to force a match.\n6. Test eligibility separately, including section 16 conditions, section 17(5) restrictions, business use and applicable reversals.\n7. Reconcile the eligible amount to the relevant GSTR-3B tables and retain a working paper.\n\n## Example\nIf a purchase invoice is recorded in the books but does not appear in the period's GSTR-2B, verify the invoice, receipt and supplier details, contact the supplier and assess the legal conditions and timing. Do not assume the credit is either automatically available or permanently lost without reviewing the facts.\n\n## Monthly checklist\n- Purchase register complete.\n- GSTR-2B downloaded and archived.\n- Missing and duplicate documents investigated.\n- Goods/services receipt checked.\n- Blocked and ineligible ITC reviewed.\n- Reversals and permitted reclaims documented.\n- GSTR-3B figures tied to the approved reconciliation.\n\n## Official sources\nCGST Act: https://cbic-gst.gov.in/hindi/CGST-bill-e.html\nCBIC Circular 170/02/2022-GST: https://cbic-gst.gov.in/pdf/Circular-170-02-2022-GST.pdf\nCBIC ITC Rules: https://cbic-gst.gov.in/input-tax-credit-rules.html\n\nFileFast Global can assist with purchase-register and GSTR-2B reconciliation based on the records supplied. General information only; check current law and portal instructions before filing."
  },
  {
    "_id":"starter-blog-2026-travel-food-itc",
    "slug":"gst-itc-on-travel-hotel-food-and-client-meetings",
    "category":"GST",
    "title":"Can a Business Claim GST ITC on Travel, Hotel and Food Expenses?",
    "excerpt":"Understand the ITC review for business travel, hotel accommodation, restaurant meals and client meetings under sections 16 and 17(5).",
    "metaTitle":"GST ITC on Travel, Hotel and Food Expenses",
    "metaDescription":"A practical guide to GST input tax credit on travel, hotel and food expenses, including blocked-credit rules and statutory exceptions.",
    "content":"## Business purpose alone is not enough\nAn expense incurred during a business trip does not automatically qualify for input tax credit. The recipient must satisfy section 16 conditions and review restrictions under section 17(5) of the CGST Act.\n\n## Travel and transport\nIdentify the exact transport service, invoice, recipient, business purpose and applicable restriction. Passenger travel and other transport categories may have specific treatment. Do not assume every ticket or travel charge carries eligible ITC.\n\n## Hotel accommodation\nAccommodation for a genuine business trip may be considered under the general ITC conditions. Check the invoice, recipient GSTIN, place of supply, business use and receipt of service. Keep the itinerary, approval and meeting or consultation purpose with the invoice. A bill carrying another person's GSTIN should not automatically be claimed by the business.\n\n## Restaurant meals and food\nSection 17(5)(b) generally blocks ITC on food and beverages, outdoor catering and specified related supplies, subject to statutory exceptions. These include certain cases where the inward supply is used to make an outward taxable supply of the same category or as an element of a taxable composite or mixed supply. A further exception concerns specified supplies that an employer is legally required to provide under applicable law. Review the exact statutory wording and facts.\n\nA client meeting or business discussion does not, by itself, remove the blocked-credit restriction on a restaurant meal. Calling it business promotion or client entertainment does not change the nature of the supply.\n\n## Documents to retain\n- Tax invoice and supplier GSTIN.\n- Correct recipient details and GSTIN.\n- Travel approval, itinerary and business-purpose note.\n- Proof the service was received.\n- ITC eligibility decision and reversal working, where relevant.\n\n## Before claiming, ask\nIs the supply used for business? Is the prescribed document available? Has the service been received? Are applicable invoice and statement conditions met? Is the credit blocked by section 17(5)? Does a specific statutory exception apply? Are place-of-supply and recipient details correct? Record the reasoning.\n\n## Official source\nCGST Act, sections 16 and 17: https://cbic-gst.gov.in/hindi/CGST-bill-e.html\nCBIC ITC Rules: https://cbic-gst.gov.in/input-tax-credit-rules.html\n\nFileFast Global can review expense invoices and prepare an ITC classification note. This article is general information, not a blanket approval to claim credit; obtain a transaction-specific review."
  },
  {
    "_id":"starter-blog-2026-tds-quarterly",
    "slug":"tds-return-filing-quarterly-checklist-form-24q-26q-27q",
    "category":"TDS",
    "title":"TDS Return Filing in India: Quarterly Checklist for Form 24Q, 26Q and 27Q",
    "excerpt":"A practical guide to preparing quarterly TDS statements, checking challans, PAN details, deductee records and common correction requirements.",
    "metaTitle":"TDS Return Filing: Quarterly Checklist for 24Q, 26Q & 27Q",
    "metaDescription":"Learn how to prepare quarterly TDS returns in India, reconcile challans, verify PAN and deductee details, and avoid common filing errors.",
    "content":"## What is a quarterly TDS statement?\nTax deducted at source must be deposited and reported in the manner prescribed under the Income-tax law and current rules. The applicable statement depends on the nature of payment and deductee. Common forms include Form 24Q for salary payments, Form 26Q for specified payments other than salary to residents, and Form 27Q for specified payments to non-residents. Confirm the correct form and current reporting rules for each transaction.\n\n## Step 1: Collect the quarter's records\nPrepare the ledger extracts, payment vouchers, invoices, payroll register where relevant, vendor and employee master data, PAN details, TDS rate decisions, lower/nil deduction certificates where applicable, and details of tax deposits. Separate resident and non-resident payments and identify salary versus non-salary transactions.\n\n## Step 2: Reconcile deductions with books\nFor each payment or credit event, review the applicable deduction trigger, nature of payment, threshold, rate and timing under the law applicable to that period. Compare the TDS ledger with the expense or payroll ledgers. Investigate cases where tax was deducted but not posted correctly, or where a payment was booked without the corresponding deduction review.\n\n## Step 3: Match challans and tax credits\nReconcile the tax deposited with challan details, BSR code, date, serial number and amount. Check that the challan is allocated correctly in the statement and that the total deposited supports the tax reported. Do not reuse a challan beyond its available balance.\n\n## Step 4: Validate PAN and deductee data\nCheck PAN format and status, names, payment amounts, deduction dates, rates and section codes. Incorrect PAN or deductee details can lead to defaults, higher deduction consequences or credit mismatches. Review corrections before filing rather than assuming the portal will resolve them automatically.\n\n## Step 5: File and review the statement\nUse the current prescribed utility and approved filing channel. Validate the file, resolve errors, submit the statement and preserve the acknowledgement/token number and working papers. After processing, review the status and any defaults or justification reports.\n\n## Common mistakes\n- Selecting the wrong statement form for the payment type.\n- Mismatch between books, challans and statement totals.\n- Incorrect PAN, section code or deduction date.\n- Missing lower/nil deduction certificate details where relevant.\n- Failing to review correction statements and processing defaults.\n- Applying a previous year's due date or rate without checking current notifications.\n\n## Records checklist\nMaintain the TDS ledger, party-wise deduction workings, invoices/payroll, PAN validation, challan details, certificates, filed statement, acknowledgement and correction history.\n\n## How FileFast Global can help\nFileFast Global can assist with TDS data review, challan reconciliation, quarterly statement preparation and correction support based on the records and authorisations provided. The correct treatment depends on payment nature, recipient status and the law applicable to the period.\n\n## Official resources\nIncome Tax Department e-Filing portal: https://www.incometax.gov.in/\nTRACES: https://www.tdscpc.gov.in/\n\nThis article is general information, not tax advice. Verify current forms, rates, due dates and notifications before filing."
  },
  {
    "_id":"starter-blog-2026-udyam-msme",
    "slug":"udyam-msme-registration-documents-benefits-and-process",
    "category":"Business Registration",
    "title":"Udyam MSME Registration: Eligibility, Documents, Benefits and Process",
    "excerpt":"Understand who can register as an MSME, what information is needed for Udyam registration and what to check after receiving the certificate.",
    "metaTitle":"Udyam MSME Registration: Eligibility, Documents & Process",
    "metaDescription":"A practical guide to Udyam registration in India, including eligibility, Aadhaar and PAN details, investment and turnover classification and post-registration checks.",
    "content":"## What is Udyam registration?\nUdyam is the Government of India's online registration framework for eligible micro, small and medium enterprises. Registration is based on the information and identifiers prescribed by the portal. It is not a substitute for GST registration, a trade licence, FSSAI approval or other activity-specific permissions.\n\n## Who may register?\nEligible enterprises carrying on manufacturing, services or both may apply, subject to the current MSME classification rules. The classification uses investment in plant and machinery or equipment and annual turnover criteria. Check the current thresholds and aggregation rules on the official portal before deciding the category.\n\n## Information to keep ready\n- Aadhaar details of the proprietor or the relevant authorised person, as required by the portal.\n- PAN of the enterprise or applicant, as applicable.\n- GSTIN where applicable under the current rules.\n- Business name, address, commencement details and activity information.\n- Bank account details and IFSC.\n- NIC activity classification and employee information, where requested.\n\nThe portal may retrieve or validate some information from government databases. Enter details consistently and do not share OTPs or credentials with an unauthorised person.\n\n## Registration process\n1. Open the official Udyam portal.\n2. Select the appropriate new-registration workflow.\n3. Complete Aadhaar verification as required.\n4. Enter PAN and enterprise information.\n5. Review the activity, address, bank and contact details.\n6. Submit the application and retain the generated registration number and certificate.\n7. Check that the certificate reflects the correct enterprise details and activity.\n\n## What Udyam does not replace\nUdyam registration does not itself authorise every business activity. Depending on the business, separate GST, FSSAI, local trade, Shops and Establishments, factory, professional or sector-specific approvals may still be required. It also does not guarantee a loan, subsidy, tender award or payment recovery. Benefits depend on the relevant scheme and its conditions.\n\n## After registration\nKeep enterprise details current, monitor classification changes, ensure PAN/GST information remains consistent and review the eligibility conditions of any scheme before applying. Preserve the certificate and the supporting records.\n\n## How FileFast Global can help\nFileFast Global can help assess the information required, prepare the application details and review the certificate after registration. Any scheme or benefit should be assessed separately against its current eligibility rules.\n\n## Official source\nGovernment of India Udyam portal: https://udyamregistration.gov.in/\n\nThis guide is general information. Use only the official portal and check current notifications and eligibility conditions."
  },
  {
    "_id":"starter-blog-2026-lut-exports",
    "slug":"gst-lut-export-without-payment-of-igst-guide",
    "category":"GST & Exports",
    "title":"GST LUT for Exporters: How to Export Without Payment of IGST",
    "excerpt":"A practical overview of Letter of Undertaking under GST, who may use it, records to maintain and how to monitor export proceeds and compliance.",
    "metaTitle":"GST LUT for Exporters: Export Without Payment of IGST",
    "metaDescription":"Understand GST LUT filing for exports without payment of IGST, eligibility, supporting records, export evidence and compliance checks.",
    "content":"## What is an LUT under GST?\nA registered person making eligible zero-rated supplies may furnish a Letter of Undertaking (LUT) to export goods or services without payment of integrated tax, subject to the conditions in the IGST Act, CGST Rules and current notifications. An LUT is not a general exemption from GST compliance; the supplier must still report the supplies correctly and satisfy the applicable conditions.\n\n## Who can furnish an LUT?\nThe facility is available to eligible registered exporters who meet the prescribed conditions. Certain persons or circumstances may be excluded under the rules or notifications. Check the current eligibility requirements and portal validations before filing.\n\n## Before filing\nKeep the GSTIN, authorised signatory details, previous LUT reference where relevant, witness details if requested by the portal and the declarations required by the current online form. Ensure the authorised signatory is validly mapped and can complete portal verification.\n\n## After filing: maintain export evidence\nFor goods, preserve the export invoice, shipping bill, bill of export where applicable, customs/export documentation, transport evidence and relevant realisation records. For services, retain the agreement or purchase order, invoice, proof of service delivery, recipient and place-of-supply analysis, foreign inward remittance or other permitted realisation evidence, and correspondence supporting the export transaction. The exact evidence depends on the nature of supply and applicable rules.\n\n## Return reporting and reconciliation\nReconcile export invoices with the GST return tables, shipping bill data where relevant, books, foreign currency receipts and bank realisation evidence. Check invoice numbers, dates, taxable values, currency conversion, recipient details and tax treatment. Investigate amendments and credit notes. An LUT does not remove the requirement to report zero-rated supplies accurately.\n\n## Common mistakes\n- Assuming an LUT automatically proves that a transaction qualifies as export.\n- Using an incorrect place-of-supply or recipient analysis for services.\n- Failing to reconcile export invoices with returns and customs/bank records.\n- Not monitoring the prescribed realisation period and extension or tax-payment consequences where applicable.\n- Treating every overseas customer payment as proof of an export of services.\n\n## How FileFast Global can help\nFileFast Global can assist with LUT filing support, export invoice review, GST return reporting and reconciliation of export records. The zero-rated status and documentation must be assessed against the actual contract, recipient, place of supply and applicable statutory conditions.\n\n## Official resources\nCBIC, IGST Act and GST rules: https://cbic-gst.gov.in/\nGST Portal: https://www.gst.gov.in/\n\nThis article is general information. Confirm current law, notifications, realisation timelines and portal instructions before relying on an LUT."
  },
  {
    "_id":"starter-blog-2026-marketplace-gst",
    "slug":"gst-compliance-amazon-flipkart-meesho-sellers-india",
    "category":"E-commerce GST",
    "title":"GST Compliance for Amazon, Flipkart and Meesho Sellers in India",
    "excerpt":"A practical guide to marketplace seller GST registration, order reports, returns, TCS reconciliation, credit notes and monthly records.",
    "metaTitle":"GST for Amazon, Flipkart & Meesho Sellers: Compliance Guide",
    "metaDescription":"Understand GST registration, marketplace TCS, GSTR-1, GSTR-3B and settlement reconciliation for Amazon, Flipkart and Meesho sellers.",
    "content":"## Why marketplace GST needs a separate monthly review\nSelling through an e-commerce operator creates multiple data streams: customer orders, cancellations, returns, marketplace fees, settlements, tax collected at source and the seller's own books. The marketplace settlement amount is not the same as taxable turnover. Sellers should reconcile source reports before preparing GST returns.\n\n## 1. Confirm the registration position\nReview the nature of goods or services, turnover, states from which supplies are made, marketplace model and current statutory provisions. Special rules and notifications may apply to certain small suppliers making specified supplies through e-commerce operators. Do not assume that every seller has identical registration requirements; verify the current conditions and the operator's onboarding requirements.\n\n## 2. Build a monthly source-data pack\nDownload order-level sales, returns, cancellations, invoices, credit notes, fee invoices, settlement statements and TCS reports from each marketplace. Preserve the original exports and note the report period and download date. Keep each platform separate before combining the final reconciliation.\n\n## 3. Reconcile sales and returns\nMatch order IDs and invoice references to the seller's books. Separate taxable value, GST rate, tax amount, shipping or other charges where relevant, cancelled orders and customer returns. Ensure credit notes and amendments are reflected in the correct period and reported consistently.\n\n## 4. Reconcile marketplace TCS\nCompare the operator's TCS statement with the electronic cash ledger and books. Identify differences in GSTIN, tax period, taxable net supplies and adjustments for returns. TCS is a tax credit mechanism; it is not a substitute for reporting the underlying outward supplies correctly.\n\n## 5. Review marketplace fees and ITC\nCollect fee and service invoices issued by each platform. Match the supplier GSTIN, invoice details and tax amounts to the purchase register and GSTR-2B. Check section 16 conditions and section 17(5) restrictions before claiming credit. Do not treat every deduction from a settlement as an eligible ITC item.\n\n## 6. Prepare GSTR-1 and GSTR-3B working papers\nMap invoice-level sales to the correct GSTR-1 tables and reconcile taxable value and tax by rate and place of supply. Tie the outward tax liability and eligible ITC to the GSTR-3B working paper. Investigate differences before filing rather than forcing totals to match.\n\n## Example reconciliation structure\nMaintain columns for platform, order ID, invoice number, invoice date, taxable value, tax rate, tax amount, return/credit-note value, TCS, platform fee, settlement amount and reconciliation status. This allows the business to trace a return figure back to source documents.\n\n## Monthly checklist\n- Download sales, returns, credit notes and settlement reports from every platform.\n- Reconcile gross sales and adjustments to invoices and books.\n- Verify tax rates and place-of-supply treatment.\n- Match marketplace TCS to portal ledgers and statements.\n- Review fee invoices and ITC eligibility.\n- Tie GSTR-1 and GSTR-3B to approved working papers.\n- Archive reports, invoices and filing acknowledgements.\n\n## How FileFast Global can help\nFileFast Global supports marketplace sellers with GST return preparation, sales and TCS reconciliation, purchase/ITC review and monthly compliance records. The correct treatment depends on the product, supply model, state registrations and current GST rules.\n\n## Official references\nGST Portal: https://www.gst.gov.in/\nCBIC GST law and rules: https://cbic-gst.gov.in/\n\nThis guide is general information, not transaction-specific tax advice. Confirm current law, notifications and marketplace reports before filing."
  },
  {
    "_id":"starter-blog-2026-export-services",
    "slug":"export-of-services-from-india-gst-lut-firc-remittance",
    "category":"International Tax & GST",
    "title":"Export of Services from India: GST, LUT and Foreign Remittance Guide",
    "excerpt":"Learn the core GST conditions for export of services, LUT documentation, place-of-supply review and foreign payment evidence.",
    "metaTitle":"Export of Services from India: GST, LUT & Remittance Guide",
    "metaDescription":"A practical Indian GST guide to export of services, zero-rated supply conditions, LUT, place of supply and foreign remittance documentation.",
    "content":"## When is a service treated as an export?\nA service is not an export merely because the customer is located outside India or payment arrives in foreign currency. The statutory definition requires the supplier to be located in India, the recipient to be located outside India, the place of supply to be outside India, permitted receipt of payment and supplier-recipient not to be merely establishments of a distinct person under the law. Review every condition against the contract and actual delivery.\n\n## Step 1: Review the contract and customer\nKeep the signed agreement, purchase order, scope of work, recipient's legal name and address, tax identification details where available, and evidence of where the recipient is established. Identify whether the customer is the actual recipient or an intermediary/related establishment.\n\n## Step 2: Determine place of supply\nApply the general place-of-supply rule and test whether a specific exception applies to the service category. Services such as intermediary services, performance-based services and certain property-related services can require careful analysis. Do not use the customer's billing address as the only test.\n\n## Step 3: Understand zero-rated supply and LUT\nEligible exports are zero-rated supplies under the IGST Act. An eligible registered supplier may furnish an LUT to make qualifying exports without payment of IGST, subject to the statutory conditions and current rules. LUT does not by itself prove that the supply meets the export definition.\n\n## Step 4: Keep payment and delivery evidence\nRetain invoices, agreements, work descriptions, deliverables, project correspondence, bank advice, inward remittance certificates or other permitted evidence of receipt. Match the payment to the invoice and record exchange-rate methodology and any bank charges consistently. Review the prescribed realisation period and applicable extensions or consequences under current law.\n\n## Step 5: Report and reconcile\nReconcile export invoices to GSTR-1, GSTR-3B, books, LUT records and bank receipts. Track invoices unpaid or partly paid, credit notes, amendments and any change in the recipient or scope. Ensure the tax treatment is consistent across records.\n\n## Common risks\n- Treating every overseas customer as an export recipient without place-of-supply analysis.\n- Assuming foreign currency receipt alone proves export status.\n- Misclassifying an intermediary arrangement.\n- Missing evidence linking service deliverables and receipts to invoices.\n- Forgetting to monitor realisation timelines and return reporting.\n\n## Export-services document checklist\nAgreement or purchase order; invoice; recipient details; service description and deliverables; place-of-supply analysis; LUT acknowledgement where used; bank/remittance evidence; GST return working papers; and correspondence supporting the transaction.\n\n## How FileFast Global can help\nFileFast Global can help organise export-service records, review GST documentation, support LUT-related compliance and reconcile invoices with returns and remittance records. Cross-border contracts and classification questions may require specialist legal or tax advice.\n\n## Official references\nIGST Act and CBIC resources: https://cbic-gst.gov.in/\nGST Portal: https://www.gst.gov.in/\n\nGeneral information only. Review the current IGST Act, rules, notifications and facts of the contract before treating a supply as an export."
  },
  {
    "_id":"starter-blog-2026-uk-vat",
    "slug":"uk-vat-registration-indian-businesses-threshold-nonresident",
    "category":"Global Tax Compliance",
    "title":"UK VAT for Indian Businesses: When Registration and Compliance May Apply",
    "excerpt":"An introductory guide for Indian businesses selling into the UK, covering non-established taxable persons, registration triggers, records and VAT returns.",
    "metaTitle":"UK VAT for Indian Businesses: Registration & Returns Guide",
    "metaDescription":"Learn when an Indian business selling into the UK may need VAT registration, what records to keep and how UK VAT returns work.",
    "content":"## Why UK VAT needs early attention\nAn Indian business selling goods or services to UK customers should assess UK VAT before launching a sales channel. The treatment depends on what is supplied, where goods are located, who imports them, the customer type, the sales channel and whether a marketplace is involved. A single turnover rule should not be applied to every overseas seller.\n\n## Registration is fact-specific\nA business not established in the UK may be required to register when it makes taxable supplies in the UK, and the normal domestic registration threshold may not protect a non-established taxable person in the same way it protects a UK-established business. However, the place and nature of the supply must first be established. Goods located outside the UK, goods stored in the UK, imports, marketplace deemed-supplier rules and B2B/B2C services can produce different outcomes.\n\n## Goods and services are not the same\nFor goods, review the location of goods at the time of sale, import arrangements, Incoterms, importer of record, fulfilment warehouse and marketplace role. For services, determine the service category, customer status and place-of-supply rule. Digital services, consulting and electronically supplied services may have different VAT analysis.\n\n## Records to prepare\nKeep customer invoices, contracts, product/service descriptions, customer VAT numbers where relevant, order and dispatch records, import declarations, marketplace statements, shipping evidence, credit notes and accounting ledgers. Maintain a clear audit trail between sales channels and VAT return figures.\n\n## VAT returns and ongoing controls\nIf registered, follow the HMRC filing and payment schedule assigned to the business. Reconcile output VAT, input VAT, credit notes, imports and marketplace transactions. Retain records in the format and for the period required by HMRC, including digital records where Making Tax Digital applies. Do not assume Indian GST returns satisfy UK VAT obligations.\n\n## Questions to answer before selling\n1. Are goods stored in the UK before sale?\n2. Who is importer of record?\n3. Is the sale through an online marketplace, and does a deemed-supplier rule apply?\n4. Is the customer a consumer or a VAT-registered business?\n5. Is the supply goods, consulting, digital or another service?\n6. Is the Indian business established or has it created a fixed establishment in the UK?\n\n## How FileFast Global can help\nFileFast Global can help Indian founders identify UK VAT questions, organise sales and import records and coordinate compliance support. UK VAT registration and filing should be confirmed with an appropriately qualified UK VAT professional based on the exact business model.\n\n## Official references\nHMRC VAT registration guidance: https://www.gov.uk/vat-registration\nHMRC VAT for overseas businesses: https://www.gov.uk/guidance/vat-registration-for-non-established-taxable-persons-non-ets\nMaking Tax Digital for VAT: https://www.gov.uk/guidance/sign-up-for-making-tax-digital-for-vat\n\nThis article is general information, not UK tax advice. Check current HMRC guidance and obtain professional advice before making a registration decision."
  },
  {
    "_id":"starter-blog-2026-gst-cancellation",
    "slug":"gst-registration-cancellation-gstr-10-final-return-guide",
    "category":"GST Services",
    "title":"GST Registration Cancellation: Process, Documents and GSTR-10 Final Return",
    "excerpt":"A practical checklist for businesses closing or discontinuing GST registration, including cancellation grounds, pending returns, stock liability and final return checks.",
    "metaTitle":"GST Cancellation & GSTR-10 Final Return: Complete Checklist",
    "metaDescription":"Understand GST registration cancellation, REG-16 application, pending return checks, stock liability and GSTR-10 final return requirements in India.",
    "content":"## When might GST registration be cancelled?\nA registered person may need to apply for cancellation when the business is discontinued, transferred, no longer liable to register or otherwise meets a ground permitted under GST law. The proper officer may also initiate cancellation in specified circumstances. The correct route depends on the facts and the applicable CGST Rules.\n\n## Check these items before applying\n- Identify the reason and effective date for cancellation.\n- Review all pending GSTR-1, GSTR-3B and other applicable returns.\n- Reconcile output tax, input tax credit and electronic ledgers.\n- Review stock, inputs, capital goods and any tax liability arising on cancellation.\n- Collect registration details, authorised signatory information and supporting evidence.\n- Check whether the business has multiple GST registrations or state-specific obligations.\n\n## Application and department communication\nThe cancellation application is generally made electronically in the prescribed form and workflow. Keep the acknowledgement and monitor portal notices. If the department issues a notice or asks for clarification, respond within the stated period with evidence and a consistent explanation. A cancellation application does not automatically remove liabilities already due.\n\n## What is GSTR-10?\nWhere applicable, the final return is furnished by a taxpayer whose registration has been cancelled or surrendered, subject to statutory exceptions. The due date and applicability should be checked against the cancellation order and current rules. Do not assume that filing the cancellation application itself completes the final return obligation.\n\n## Common mistakes\n- Applying without checking pending returns and tax dues.\n- Ignoring stock or capital-goods tax implications.\n- Missing notices or clarification deadlines.\n- Assuming cancellation is effective from the date the business stopped trading without confirming the legally relevant date.\n- Forgetting the final return and post-cancellation records.\n\n## How FileFast Global can help\nFileFast Global can review the GST registration profile, organise supporting documents, assist with the cancellation application and help identify pending return and final-return requirements. The final tax treatment depends on the taxpayer's records and applicable law.\n\n## Official references\nGST Portal: https://www.gst.gov.in/\nCBIC GST law and rules: https://cbic-gst.gov.in/\n\nThis guide is general information, not legal or tax advice. Verify the current statutory forms, exceptions, deadlines and portal instructions before applying."
  },
  {
    "_id":"starter-blog-2026-fssai",
    "slug":"fssai-registration-basic-state-central-food-business-guide",
    "category":"Business Registration",
    "title":"FSSAI Registration in India: Basic, State or Central Licence?",
    "excerpt":"Understand which FSSAI authorisation may apply to a food business, the information to prepare and the key checks before applying or renewing.",
    "metaTitle":"FSSAI Registration: Basic, State & Central Licence Guide",
    "metaDescription":"A practical FSSAI guide for food businesses in India. Learn about Basic Registration, State and Central licences, documents and application checks.",
    "content":"## Why food businesses need the correct FSSAI authorisation\nFood businesses must assess the registration or licence required for their activity under the Food Safety and Standards framework. The correct category is not chosen only by business size: activity type, capacity, turnover, premises and other eligibility criteria can matter. Confirm the current FoSCoS eligibility criteria before applying.\n\n## Basic Registration, State Licence or Central Licence?\nBasic Registration is intended for eligible petty food businesses under the prescribed criteria. State and Central licences apply to different categories of food business operators and activities. Manufacturing, import, multi-state operations, transport, storage, catering and other activities may have specific rules. Do not select a category based only on a competitor's package or a turnover assumption.\n\n## Information to prepare\n- Legal name and constitution of the business.\n- Address and details of each food premises.\n- Nature of food business activity and product categories.\n- Capacity, turnover or other eligibility details required by the portal.\n- Identity and contact details of the proprietor or authorised signatory.\n- Premises and supporting business documents requested for the licence category.\n- Any additional technical or product information applicable to the activity.\n\n## Application checklist\n1. Identify every activity carried out by the food business.\n2. Check the correct licence category and eligibility on FoSCoS.\n3. Match the premises address and entity details across supporting records.\n4. Prepare product and activity details accurately.\n5. Submit through the official FoSCoS portal and monitor application status.\n6. Display and use the licence details as required after approval.\n7. Track renewal and modification requirements.\n\n## Common mistakes\n- Selecting Basic Registration when a State or Central licence is required.\n- Omitting a food activity or additional premises.\n- Providing inconsistent address or entity details.\n- Treating the professional service fee as the government licence fee.\n- Forgetting licence conditions, renewal and ongoing food-safety obligations.\n\n## How FileFast Global can help\nFileFast Global can help identify the information needed, organise application documents and support the online application process. Government fees depend on the licence category and validity period and are separate from professional assistance fees. Approval is subject to the competent authority.\n\n## Official source\nFood Safety Compliance System (FoSCoS): https://foscos.fssai.gov.in/\nFSSAI: https://www.fssai.gov.in/\n\nThis article is general information. Check the current FoSCoS eligibility criteria, fee schedule and licence conditions before applying."
  },
  {
    "_id":"starter-blog-2026-itr-capital-gains",
    "slug":"itr-filing-capital-gains-mutual-funds-stocks-documents-checklist",
    "category":"Income Tax",
    "title":"ITR Filing for Stock and Mutual Fund Capital Gains: Documents Checklist",
    "excerpt":"A practical guide to organising broker statements, capital-gains reports, dividends, bank interest and tax records before filing an individual income-tax return.",
    "metaTitle":"ITR for Stocks & Mutual Funds: Capital Gains Documents Checklist",
    "metaDescription":"Prepare your Indian ITR for stocks and mutual funds with a checklist for broker P&L, capital gains, dividends, bank interest and tax records.",
    "content":"## Why investment records matter when filing an ITR\nAn investor's tax return may include salary or business income, interest, dividends and gains or losses from listed shares, mutual funds and other assets. A broker's profit-and-loss report is useful, but it may not by itself contain every item needed for the tax computation or return schedules.\n\n## Documents to collect\n- Annual tax P&L or capital-gains statement from each broker/platform.\n- Contract notes or transaction-level reports where needed for verification.\n- Mutual fund capital-gains statement, including switches and redemptions.\n- Dividend statements and bank interest certificates.\n- Form 16, Form 16A and Form 26AS/AIS/TIS information, as applicable.\n- Details of brought-forward losses and previously filed returns.\n- Purchase cost and supporting records for off-market or corporate-action transactions.\n- Details of foreign assets, foreign income or overseas investments, where applicable.\n\n## Reconcile before computing tax\nCompare broker reports with AIS and other available tax information. Review corporate actions, bonus/split adjustments, delisted securities, intraday trades, derivatives, mutual-fund switches and transactions across multiple platforms. Classify transactions under the applicable tax provisions rather than assuming every broker-reported profit has the same tax treatment.\n\n## Select the correct return and schedules\nThe appropriate ITR form depends on the taxpayer's residential status, income sources, business or professional activity and other eligibility conditions for that assessment year. Capital gains, trading activity and foreign income can affect the form and schedules. Confirm the current notified form and instructions before filing.\n\n## Common mistakes\n- Reporting only net broker profit without reviewing transaction classification.\n- Missing dividends or bank interest.\n- Ignoring AIS differences or incorrectly assuming AIS is always complete.\n- Failing to adjust cost for corporate actions.\n- Omitting brought-forward losses or foreign asset disclosures where required.\n- Selecting an ITR form without checking all income sources and residential status.\n\n## How FileFast Global can help\nFileFast Global can help organise investment statements, reconcile available tax information and prepare an ITR filing checklist. Tax treatment depends on transaction dates, asset type, taxpayer status and the law applicable to the relevant year.\n\n## Official resources\nIncome Tax e-Filing portal: https://www.incometax.gov.in/\nAnnual Information Statement (AIS): available through the Income Tax e-Filing portal.\n\nThis guide is general information, not individual tax advice. Verify the current Finance Act, notified ITR forms and instructions for the relevant assessment year."
  },
  baseService({
    name: "GST Registration Cancellation",
    slug: "gst-registration-cancellation",
    category: "GST Services",
    sortOrder: 20,
    shortDescription: "Support for eligible GST registration cancellation, pending compliance review and final-return planning.",
    fullDescription: "Assistance with reviewing the cancellation reason, effective date, pending returns, tax liabilities and supporting records before preparing the prescribed online application. Cancellation is subject to GST law and department processing.",
    benefits: ["Review cancellation eligibility and grounds", "Identify pending returns and ledger issues", "Organise supporting documents", "Plan applicable final-return compliance"],
    requiredDocuments: ["GSTIN and registration certificate", "Reason and proposed effective date", "Latest returns and electronic ledger details", "Stock and capital-goods information where relevant", "Business closure or transfer evidence where applicable"],
    pricingInfo: "Professional assistance fee from ₹799. Final scope depends on pending returns, liabilities and department notices.",
    metaTitle: "GST Registration Cancellation Online | FileFast Global",
    metaDescription: "Get GST cancellation assistance with pending return checks, supporting documents and GSTR-10 final-return guidance in India."
  }),
  baseService({
    name: "GST Notice Reply & REG-17 Response",
    slug: "gst-notice-reply",
    category: "GST Services",
    sortOrder: 21,
    shortDescription: "Document-led assistance for GST notices, REG-17 cancellation notices and portal clarification replies.",
    fullDescription: "We review the notice, relevant return periods, registration details and supporting evidence before preparing a response for client review. Complex disputes, hearings and legal representation require a separately agreed specialist scope.",
    benefits: ["Understand the notice and response deadline", "Prepare a document checklist", "Organise supporting reconciliations", "Draft a factual response for approval"],
    requiredDocuments: ["Complete notice and annexures", "GST registration and return copies", "Relevant invoices and ledgers", "Previous replies and acknowledgements", "Supporting evidence for the facts stated"],
    pricingInfo: "Custom quotation after reviewing the notice, deadline, tax period and complexity.",
    metaTitle: "GST Notice Reply & REG-17 Response Assistance | FileFast",
    metaDescription: "Get help reviewing GST notices and preparing evidence-based REG-17 or portal clarification responses."
  }),
  baseService({
    name: "QRMP Scheme & GST Return Support",
    slug: "qrmp-scheme-support",
    category: "GST Services",
    sortOrder: 22,
    shortDescription: "Eligibility review and assistance for QRMP scheme selection, quarterly returns and monthly tax payment workflows.",
    fullDescription: "Support to assess whether the QRMP scheme may be available, review business needs and organise the prescribed portal election and return/payment process. Eligibility and due dates must be verified for the relevant period.",
    benefits: ["Review scheme eligibility", "Understand monthly payment options", "Plan quarterly GSTR-1 and GSTR-3B", "Organise invoice furnishing and records"],
    requiredDocuments: ["GSTIN", "Recent turnover and return details", "Sales and purchase records", "Existing scheme status"],
    pricingInfo: "Professional assistance from ₹299; return filing is charged separately where applicable.",
    metaTitle: "GST QRMP Scheme Support & Quarterly Return Filing | FileFast",
    metaDescription: "Understand QRMP eligibility, quarterly GST returns and monthly tax payment compliance with FileFast Global."
  }),
  baseService({
    name: "CMP-08 & Composition Scheme Returns",
    slug: "cmp-08-composition-return",
    category: "GST Services",
    sortOrder: 23,
    shortDescription: "CMP-08 statement preparation and composition-scheme compliance support.",
    fullDescription: "Assistance for eligible composition taxpayers to organise turnover, tax payable and applicable records for CMP-08 and related annual compliance. Confirm scheme eligibility and current rules before filing.",
    benefits: ["Organise quarterly turnover", "Review applicable tax calculation", "Check composition scheme records", "Prepare filing working papers"],
    requiredDocuments: ["GSTIN and composition status", "Sales register", "Purchase records", "Previous CMP-08 and annual return"],
    pricingInfo: "Professional fee from ₹299 per statement for basic records; additional work quoted separately.",
    metaTitle: "CMP-08 Filing & Composition Scheme GST Returns | FileFast",
    metaDescription: "Get CMP-08 filing support and composition scheme GST compliance assistance for eligible businesses."
  }),
  baseService({
    name: "GSTR-4 Annual Return",
    slug: "gstr-4-annual-return",
    category: "GST Services",
    sortOrder: 24,
    shortDescription: "Annual GSTR-4 preparation and filing assistance for eligible composition taxpayers.",
    fullDescription: "Support to organise annual composition turnover, inward supplies, tax paid and related details for the applicable GSTR-4 annual return. Final reporting depends on the taxpayer's records and current form instructions.",
    benefits: ["Compile annual composition records", "Reconcile CMP-08 statements", "Review tax and inward supply details", "Prepare filing checklist"],
    requiredDocuments: ["GSTIN and financial year", "Sales and purchase summaries", "CMP-08 acknowledgements", "Books and tax payment details"],
    pricingInfo: "Professional fee from ₹499 for basic records; complex reconciliation is quoted separately.",
    metaTitle: "GSTR-4 Annual Return Filing for Composition Dealers | FileFast",
    metaDescription: "Prepare GSTR-4 annual return with CMP-08 reconciliation and document review for eligible composition taxpayers."
  }),
  baseService({
    name: "GSTR-10 Final Return",
    slug: "gstr-10-final-return",
    category: "GST Services",
    sortOrder: 25,
    shortDescription: "GSTR-10 final return preparation support after eligible GST registration cancellation.",
    fullDescription: "Assistance with reviewing cancellation details, stock and capital-goods information, tax liability and records needed for the final return. Applicability and due date depend on the cancellation order and current GST rules.",
    benefits: ["Review cancellation order and date", "Check pending returns and liability", "Organise stock and capital-goods records", "Prepare final-return working papers"],
    requiredDocuments: ["GST cancellation order", "GSTIN and last filed returns", "Stock and capital-goods statement", "Tax payment and ledger details"],
    pricingInfo: "Professional fee from ₹999 for basic records; additional reconciliation and notice work is separate.",
    metaTitle: "GSTR-10 Final Return Filing Assistance | FileFast Global",
    metaDescription: "Get GSTR-10 final return assistance after GST cancellation, including stock and liability document checks."
  }),
  baseService({
    name: "GST Annual Return GSTR-9",
    slug: "gstr-9-annual-return",
    category: "GST Services",
    sortOrder: 26,
    shortDescription: "Annual GST return preparation and reconciliation support for eligible registered taxpayers.",
    fullDescription: "Assistance with annual turnover, tax paid, ITC and return-to-books reconciliation for GSTR-9 where applicable. Applicability, exemptions and reporting requirements should be checked for the financial year.",
    benefits: ["Compare annual books and GST returns", "Review outward supply and ITC summaries", "Identify differences for client review", "Prepare annual return working papers"],
    requiredDocuments: ["GSTR-1 and GSTR-3B for the year", "Audited or final books where available", "GSTR-2B and purchase register", "Credit/debit notes and adjustments"],
    pricingInfo: "Professional fee from ₹1,499 for basic scope; reconciliation complexity and turnover affect the final quote.",
    metaTitle: "GSTR-9 Annual GST Return Filing & Reconciliation | FileFast",
    metaDescription: "GSTR-9 annual return assistance with turnover, ITC and GST return reconciliation for eligible businesses."
  }),
  baseService({
    name: "TCS Return Filing & Reconciliation",
    slug: "tcs-return-filing",
    category: "Income Tax Services",
    sortOrder: 27,
    shortDescription: "Quarterly TCS statement preparation and reconciliation support for eligible collectors.",
    fullDescription: "Assistance to organise collection records, challans, buyer details and applicable TCS sections before preparing the relevant quarterly statement. Applicability and rates depend on transaction type and current income-tax law.",
    benefits: ["Review TCS applicability", "Reconcile collections and challans", "Validate buyer and PAN details", "Prepare quarterly statement records"],
    requiredDocuments: ["TAN and collector details", "Collection ledger and invoices", "Challan details", "Buyer PAN and transaction information", "Prior statements and correction history"],
    pricingInfo: "Professional fee from ₹999 per basic quarterly statement; deductee volume and correction work affect the quote.",
    metaTitle: "TCS Return Filing & Reconciliation Services | FileFast",
    metaDescription: "Get TCS return preparation and challan reconciliation support for eligible businesses in India."
  }),
  baseService({
    name: "Trade Licence Assistance",
    slug: "trade-licence-assistance",
    category: "Licenses",
    sortOrder: 28,
    shortDescription: "Application support for applicable municipal trade licences and local business permissions.",
    fullDescription: "We help identify the relevant local authority workflow, organise premises and business information and prepare application documents. Requirements and fees vary by municipality, activity and premises.",
    benefits: ["Identify local licence requirements", "Prepare business and premises details", "Organise supporting documents", "Track application status where available"],
    requiredDocuments: ["Business constitution and PAN", "Premises address proof", "Owner consent or lease where relevant", "Business activity and premises details", "Local authority forms and declarations"],
    pricingInfo: "Professional assistance from ₹1,499; municipal/statutory charges are additional and depend on location and activity.",
    metaTitle: "Trade Licence Application Assistance in Chennai | FileFast",
    metaDescription: "Get trade licence application support in Chennai with premises document checks and local authority requirements."
  }),
  baseService({
    name: "Payroll & Salary Compliance",
    slug: "payroll-compliance",
    category: "Accounting Services",
    sortOrder: 29,
    shortDescription: "Monthly payroll processing coordination, payslip records and agreed statutory compliance support.",
    fullDescription: "Support for payroll data collation, salary calculations based on approved inputs, payslip preparation and coordination of applicable TDS, PF, ESI and professional-tax workflows. Final scope depends on employee count, state and registrations.",
    benefits: ["Monthly payroll data organisation", "Payslip and salary register preparation", "Coordinate applicable statutory deductions", "Monthly payroll summary"],
    requiredDocuments: ["Employee master and joining details", "Salary structure and attendance", "Leave and reimbursement data", "Prior payroll and statutory registration details"],
    pricingInfo: "Starter monthly support from ₹1,499; employee count and statutory filing scope affect the final fee.",
    metaTitle: "Payroll Processing & Salary Compliance Support | FileFast",
    metaDescription: "Payroll processing support for businesses, including salary records, payslips and statutory compliance coordination."
  }),
  baseService({
    name: "ROC Annual Compliance Support",
    slug: "roc-annual-compliance",
    category: "Compliance Services",
    sortOrder: 30,
    shortDescription: "Annual ROC filing coordination and document preparation support for eligible companies and LLPs.",
    fullDescription: "Assistance with collecting annual financial and corporate records, preparing filing checklists and coordinating applicable MCA annual forms with the appropriate authorised professional. Fees depend on entity type, filing status and overdue events.",
    benefits: ["Annual compliance checklist", "Collect financial and board records", "Identify applicable MCA forms", "Coordinate filing and acknowledgement records"],
    requiredDocuments: ["Company/LLP master data", "Financial statements and audit reports", "Board and shareholder/partner records", "Director/partner KYC", "Prior MCA filing acknowledgements"],
    pricingInfo: "Professional assistance from ₹4,999 for basic annual scope; government fees, additional forms and overdue work are extra.",
    metaTitle: "ROC Annual Filing & MCA Compliance Support | FileFast",
    metaDescription: "Get ROC annual filing coordination and MCA compliance document support for companies and LLPs."
  }),
  baseService({
    name: "Quick Commerce & Marketplace Seller Onboarding",
    slug: "quick-commerce-seller-onboarding",
    category: "Digital Business Services",
    sortOrder: 31,
    shortDescription: "Document and catalogue preparation support for eligible sellers onboarding to online marketplaces and quick-commerce platforms.",
    fullDescription: "Support to organise business, tax, bank, product and catalogue information for seller onboarding. Platform eligibility, category approvals and account activation are controlled by each marketplace and cannot be guaranteed.",
    benefits: ["Seller document checklist", "GST and bank detail review", "Product and catalogue data organisation", "Application follow-up support within agreed scope"],
    requiredDocuments: ["PAN and business constitution", "GSTIN where applicable", "Bank proof and cancelled cheque", "Brand authorisation where applicable", "Product catalogue, images and category details"],
    pricingInfo: "Custom quote based on platform, product count, catalogue readiness and onboarding scope.",
    metaTitle: "Amazon, Marketplace & Quick Commerce Seller Onboarding | FileFast",
    metaDescription: "Get seller onboarding support for marketplace and quick-commerce platforms, including document and catalogue preparation."
  }),
  {
    _id: "starter-blog-gst-input-tax-credit-reconciliation-guide",
    slug: "gst-input-tax-credit-reconciliation-guide",
    category: "GST & Input Tax Credit",
    title: "GST Input Tax Credit Reconciliation: A Practical Guide for Businesses",
    excerpt: "A practical workflow to compare purchase registers with GSTR-2B, identify mismatches, review eligibility and maintain evidence before claiming ITC.",
    metaTitle: "GST ITC Reconciliation Guide: Purchase Register vs GSTR-2B",
    metaDescription: "Learn how to reconcile purchase invoices with GSTR-2B, investigate missing credits, check blocked credits and document GST input tax credit decisions.",
    content: "GST Input Tax Credit (ITC) can reduce the net GST payable by an eligible registered business, but a credit should never be claimed merely because an invoice is available. The business must check the applicable GST conditions, the nature of the inward supply, supplier reporting and the records supporting the claim. This guide gives a practical monthly reconciliation workflow.\n\n1. Prepare a complete purchase register\nExport purchase data from the accounting system for the relevant tax period. Include supplier GSTIN, invoice number and date, taxable value, tax amounts, place of supply, expense or asset category, credit/debit notes and whether the purchase relates to taxable, exempt or non-business activity. Remove duplicate imports before matching.\n\n2. Download and review GSTR-2B\nUse the relevant period's GSTR-2B from the GST portal. Keep the original downloaded file as evidence. Do not assume that every line appearing in GSTR-2B is automatically eligible. It is a key reconciliation source, not a substitute for checking the underlying transaction and statutory conditions.\n\n3. Match invoices systematically\nMatch supplier GSTIN, document number, document date and tax amounts. Normalise avoidable differences such as spaces, punctuation and leading zeros without changing the original record. Classify each difference as matched, missing in books, missing in GSTR-2B, value/tax mismatch, duplicate, credit note issue or potentially ineligible.\n\n4. Investigate missing invoices\nFor an invoice in the books but not reflected in the relevant statement, contact the supplier and ask them to verify the return period and document details. Track follow-up and the period in which the document appears. Do not silently move or alter an invoice to force a match. Apply the current statutory time limits and conditions for the relevant financial year.\n\n5. Review eligibility and blocked credits\nCheck whether the inward supply is used or intended for business and whether the applicable conditions are met. Review restrictions under Section 17, including blocked-credit categories under Section 17(5), personal consumption, exempt supplies and other apportionment requirements. Food and beverages, motor vehicles and related services, works-contract or construction-related expenses and gifts/free samples can require specific analysis. Do not treat all travel, hotel or employee expenses as automatically eligible or automatically blocked; examine the exact facts and statutory exceptions.\n\n6. Check reversals and reclaims\nIdentify credits requiring reversal, common-credit apportionment, supplier-payment related review, credit notes and any other adjustment required under the current rules. Maintain a reason, calculation, period and supporting document for each adjustment. A later reclaim should be traceable to the original reversal and the condition that has subsequently been satisfied.\n\n7. Create an audit-ready reconciliation file\nKeep the purchase register, GSTR-2B download, matching output, supplier follow-up, invoice copies, eligibility notes and return-period summary together. Record who reviewed the exceptions and when they were resolved. This is more useful than keeping only a single net ITC figure.\n\nCommon mistakes include claiming every GSTR-2B line without eligibility review, ignoring credit notes, duplicating invoices, overlooking personal-use restrictions, and failing to reconcile books to the return actually filed.\n\nHow FileFast Global can help: We can organise purchase data, compare it with GST statements, prepare an exception list and support the review of ITC eligibility based on the documents and facts supplied. The final tax position should be confirmed against current law and the specific transaction.\n\nRelated service: GST return filing and GST reconciliation. This article is general information, not a case-specific tax opinion. Verify current GST law, notifications and portal instructions before filing.",
    isPublished: true
  },
  {
    _id: "starter-blog-lut-export-goods-services-gst-guide",
    slug: "lut-export-goods-services-gst-guide",
    category: "GST & Export Compliance",
    title: "Exporting Goods or Services Under LUT: GST Compliance Checklist",
    excerpt: "Understand the purpose of a Letter of Undertaking, invoice checks, export evidence, refund records and common reconciliation gaps for zero-rated supplies.",
    metaTitle: "Export Under LUT: GST Compliance Checklist for Indian Exporters",
    metaDescription: "A practical GST LUT checklist for exporters covering invoices, shipping bills or export-of-service evidence, GSTR-1, GSTR-3B and refund documentation.",
    content: "Indian businesses making eligible exports may use a Letter of Undertaking (LUT) to supply goods or services without payment of integrated tax, subject to the applicable GST provisions and conditions. LUT is not a substitute for export documentation or return reporting. The records should tell one consistent story from invoice to export evidence and GST return.\n\n1. Confirm that the transaction qualifies as an export\nFor goods, review the export of goods requirements and supporting customs/shipping documentation. For services, carefully test the statutory conditions, including supplier location, recipient location, place of supply, permitted payment receipt and whether supplier and recipient are merely establishments of the same person. A foreign customer or foreign-currency invoice alone does not establish export-of-service status.\n\n2. Keep the LUT and validity details\nRetain the filed LUT acknowledgement and verify the period for which it applies. Check renewal requirements for the relevant financial year and make sure the LUT is available before making supplies under that route. Keep the acknowledgement with the compliance file.\n\n3. Prepare accurate export invoices\nCheck the recipient's legal name and address, country, description of goods or services, currency, value, invoice date and the prescribed export endorsement. Invoice details should reconcile with accounting records, shipping documents or service-contract evidence and GST return data. Do not copy a generic invoice template without checking the transaction type.\n\n4. Maintain evidence for goods exports\nKeep the commercial invoice, packing list, shipping bill, bill of export where relevant, transport and customs evidence, export general manifest or equivalent status information and bank realisation records as applicable. Match invoice references, values, quantities and dates. Resolve short shipments, amendments, cancellations and shipping-bill mismatches.\n\n5. Maintain evidence for export of services\nKeep the contract or statement of work, customer details, invoice, deliverables or timesheets where relevant, correspondence, proof of receipt of payment in permitted form and foreign inward remittance or bank evidence. Document the place-of-supply analysis and the recipient relationship. If an intermediary or related-party question exists, obtain a transaction-specific review.\n\n6. Reconcile GSTR-1 and GSTR-3B\nCheck export invoice reporting, relevant return tables, zero-rated supply values and the corresponding tax-period totals. Reconcile amendments and credit notes in the correct periods. A mismatch between invoices, shipping bill data, return values and books can delay a refund or trigger a clarification.\n\n7. Review input tax credit and refund route separately\nZero-rated supplies can have refund implications, but the availability and calculation depend on the chosen route, eligibility, accumulated credit, documentation and current restrictions. Do not assume that every expense invoice automatically qualifies for ITC. Check blocked credits, business use and other conditions before including them in the refund computation.\n\nCommon gaps: expired or missing LUT, incorrect export endorsement, incomplete recipient details, inconsistent invoice references, missing bank realisation evidence, and values that do not reconcile between books, returns and customs records.\n\nHow FileFast Global can help: We support exporters with LUT-related documentation checks, export invoice review, GST return preparation and reconciliation of records for the applicable refund process. Customs, foreign exchange and specialised legal questions may require the relevant licensed professional.\n\nRelated services: LUT support, GSTR-1 filing, GSTR-3B filing and GST reconciliation. General information only; verify current GST and customs requirements for your transaction.",
    isPublished: true
  },
  {
    _id: "starter-blog-ecommerce-marketplace-gst-tcs-reconciliation",
    slug: "ecommerce-marketplace-gst-tcs-reconciliation",
    category: "E-commerce Tax Compliance",
    title: "Amazon, Flipkart and Meesho Sellers: GST and TCS Reconciliation Checklist",
    excerpt: "A month-end workflow to reconcile marketplace orders, returns, commission fees, GST TCS credits, settlements and GST return reporting.",
    metaTitle: "E-commerce GST Reconciliation for Amazon, Flipkart & Meesho Sellers",
    metaDescription: "Reconcile marketplace sales, returns, fees, GST TCS, settlement reports and GST returns with a practical checklist for Indian online sellers.",
    content: "Selling through Amazon, Flipkart, Meesho or another marketplace creates several data streams. The order report, sales report, returns report, fee invoices, settlement statement, TCS details and GST portal records may show different dates and values because they serve different purposes. A seller should reconcile them rather than copy one marketplace total directly into a GST return.\n\n1. Download all reports for the same period\nCollect order or sales reports, cancellations, customer returns, credit notes, fee invoices, settlement statements, GST TCS reports and relevant payment or bank entries. Record the report generation date and the period covered. Marketplace settlement date is not necessarily the same as the invoice or supply date.\n\n2. Build invoice-level sales data\nIdentify taxable value, GST rate, tax amount, place of supply, B2B/B2C classification, invoice number and document date. Separate cancelled orders from completed supplies. Map returns and credit notes to the original invoice wherever possible and check the period in which the adjustment must be reported.\n\n3. Reconcile marketplace gross sales to books\nStart with the sales value in the marketplace report and explain each difference: cancellations, refunds, returns, discounts, shipping, platform adjustments, rounding and timing. Do not treat the net bank settlement as the taxable turnover. Marketplace deductions are not a substitute for invoice-level sales reporting.\n\n4. Reconcile fees and input tax credit separately\nDownload platform commission, fulfilment, advertising, logistics and other service invoices. Check the supplier GSTIN, invoice details, place of supply and business use. Review eligibility and blocked-credit restrictions before claiming ITC. Keep marketplace fee ITC separate from output GST on sales.\n\n5. Check GST TCS credits\nCompare the marketplace's TCS statement with the relevant GST portal credit records and your own reconciliation. Verify the legal entity, GSTIN, period and amounts. TCS is not the same as income-tax TDS and should not be treated as an expense or as output GST. Investigate missing or incorrect credits with the operator and follow the applicable correction process.\n\n6. Prepare the GST return reconciliation\nMap outward supplies and amendments to GSTR-1 and reconcile tax liability with GSTR-3B. Compare eligible ITC with GSTR-2B and purchase records. Retain a bridge from marketplace gross sales to reported taxable turnover and from marketplace deductions to the bank settlement.\n\n7. Close the month with a control sheet\nUse columns for report source, document number, taxable value, tax, return period, settlement amount, TCS, fee ITC, difference, reason and resolution status. Carry unresolved items into a follow-up list rather than forcing them into a return total.\n\nFrequent mistakes include reporting only net settlement, mixing TCS and TDS, overlooking returns, claiming platform fees without invoice review, and failing to reconcile GST TCS credits.\n\nHow FileFast Global can help: We help marketplace sellers organise reports, reconcile sales and returns, review fee invoices, prepare GST return data and track TCS differences. The exact process depends on the platform and the seller's accounting setup.\n\nRelated services: E-commerce GST compliance, GSTR-1, GSTR-3B and TCS reconciliation. General information only; confirm current GST reporting rules and marketplace statements for the relevant tax period.",
    isPublished: true
  },
  {
    _id: "starter-blog-tds-freelancers-contractors-business-checklist",
    slug: "tds-freelancers-contractors-business-checklist",
    category: "TDS & Business Compliance",
    title: "TDS on Freelancer and Contractor Payments: Business Checklist",
    excerpt: "A practical process for businesses to review service-provider payments, invoices, PAN, applicable TDS section, timing, deposit and return records.",
    metaTitle: "TDS on Freelancer & Contractor Payments: Business Checklist",
    metaDescription: "Learn how businesses can review TDS on freelancer and contractor payments, verify PAN, document deductions and reconcile challans and returns.",
    content: "Businesses often pay freelancers, consultants, designers, software developers, contractors and other service providers. Whether tax must be deducted at source depends on the nature of the payment, the payer, the payee, applicable thresholds and the law for the relevant financial year. Do not select a TDS section only from the vendor's job title.\n\n1. Identify the real nature of the contract\nRead the agreement, purchase order, invoice and work description. Determine whether the payment is for professional services, technical services, contractual work, commission, rent, salary or another category. A single vendor may provide different types of services, so classify the actual payment rather than relying only on the vendor name.\n\n2. Check the payer and payee status\nRecord whether the payer is an individual, HUF, firm, company or another entity and whether the relevant statutory conditions apply. Verify the payee's legal name, PAN and residential or entity status where relevant. Non-resident payments may involve separate withholding provisions and should receive specialist review.\n\n3. Apply the correct section, threshold and rate\nCheck the current Income-tax Act provisions and the rules applicable to the payment date and financial year. Thresholds and rates can change, and different sections may apply to professional fees, contractual payments, commission or other categories. Where the facts are unclear, document the analysis and obtain professional advice before deduction.\n\n4. Determine the deduction point\nThe timing of deduction is governed by the applicable provision and may depend on credit or payment, whichever occurs first, subject to the specific section. Accounts teams should capture both invoice booking and payment dates so that the deduction is not missed when a vendor is paid before the invoice is processed.\n\n5. Deposit TDS and file the correct statement\nUse the appropriate challan and return process for the category of deduction and period. Verify the TAN, assessment year or financial year fields as applicable, section code, deductee PAN, amount and challan details. Retain the challan counterfoil and acknowledgement. Due dates and forms should be checked against current official instructions for the relevant quarter.\n\n6. Issue certificates and reconcile\nReconcile the TDS ledger, challans, quarterly statements and certificates. Check for short deduction, wrong PAN, unmatched challan, duplicate deductee entries and correction statements. Respond to defaults or notices within the applicable time and keep evidence of correction.\n\n7. Maintain a vendor TDS register\nTrack vendor name, PAN, service category, contract value, invoice date, booking date, payment date, section considered, threshold monitoring, deduction, challan reference, return quarter and certificate status. A register helps identify threshold crossings and repeated payments during the year.\n\nCommon errors include choosing a section by habit, ignoring threshold aggregation, deducting late, entering an incorrect PAN, confusing TDS with GST TCS and failing to reconcile the quarterly statement.\n\nHow FileFast Global can help: We assist businesses with TDS data organisation, quarterly statement preparation, challan reconciliation and compliance tracking. The final section and tax treatment must be determined from the actual contract, payment and current law.\n\nRelated services: TDS return filing, accounting and bookkeeping. This article is general information, not a substitute for advice on a specific payment.",
    isPublished: true
  },
  {
    _id: "starter-blog-small-business-month-end-accounting-checklist-india",
    slug: "small-business-month-end-accounting-checklist-india",
    category: "Accounting & Bookkeeping",
    title: "Monthly Accounting Checklist for Small Businesses in India",
    excerpt: "A repeatable month-end close covering bank reconciliation, sales, purchases, receivables, payables, GST, TDS, payroll and management reports.",
    metaTitle: "Monthly Accounting Checklist for Small Businesses in India",
    metaDescription: "Use this small-business month-end accounting checklist to reconcile bank, sales, purchases, GST, TDS, payroll, receivables and payables.",
    content: "A monthly accounting close helps a business understand its cash position, outstanding customer balances, supplier dues, tax exposure and operating performance. It also makes GST and income-tax preparation easier because records are reviewed throughout the year rather than reconstructed at filing time.\n\n1. Close the sales records\nCollect sales invoices, credit notes, debit notes, receipts and marketplace reports. Check invoice numbering, customer details, taxable value and collections. Separate advances, refunds and cancelled transactions where the accounting treatment requires it.\n\n2. Verify purchases and expenses\nRecord supplier invoices and expense bills with dates, supplier details, business purpose, tax amounts and payment status. Separate capital assets from routine expenses. Keep supporting evidence for material expenses and flag personal or mixed-use items for review.\n\n3. Reconcile every bank and payment account\nMatch bank statement entries to the cash book or accounting ledger. Identify bank charges, interest, failed payments, customer receipts, refunds and transfers between own accounts. Do not classify every bank credit as sales or every debit as an expense. Maintain a list of unresolved entries with an owner and due date.\n\n4. Review receivables and payables\nPrepare an ageing report for customer invoices and supplier balances. Follow up overdue receivables, confirm disputed balances and review advances. Identify old balances that need investigation rather than writing them off without approval.\n\n5. Reconcile GST data\nCompare outward supplies in the books with GSTR-1 and the tax liability with GSTR-3B. Reconcile purchase records with GSTR-2B and review ITC eligibility, blocked credits and reversals. Track e-commerce TCS and other adjustments separately where applicable. Keep filed-return acknowledgements.\n\n6. Review TDS and payroll obligations\nCheck payments that may attract TDS, monitor thresholds and confirm deductions and deposits under the applicable rules. For employers, reconcile salary, deductions, statutory contributions and payroll liabilities. The exact obligations depend on entity type, employee count and current law.\n\n7. Review inventory and fixed assets\nFor businesses holding stock, compare physical or platform inventory records with accounting balances. Investigate damaged, returned, lost or obsolete stock. Update the fixed-asset register for additions, disposals and depreciation inputs.\n\n8. Prepare a simple management pack\nAt minimum, review the profit and loss statement, balance sheet, cash and bank position, receivables ageing, payables ageing, tax payable summary and major variances against the previous month. Explain unusual movements in plain language.\n\n9. Lock and archive the period\nSave bank statements, invoices, reconciliations, filed returns, challans and management reports in a structured folder. Restrict changes to closed periods and record any later adjustment with an explanation and approval.\n\nA useful monthly close calendar assigns an owner and target date to each task. The business should not wait until a GST or income-tax deadline to discover missing invoices or unreconciled bank entries.\n\nHow FileFast Global can help: We support bookkeeping, monthly reconciliations, GST/TDS data preparation and compliance calendars for eligible small businesses. Scope depends on transaction volume, number of accounts, payroll and reporting requirements.\n\nRelated services: Accounting and bookkeeping, GST filing and TDS return filing. General information only; confirm the applicable statutory requirements for your entity and period.",
    isPublished: true
  }
];

// Transparent competitive professional-fee guide. Introductory prices have defined scope;
// the site does not use artificial expiry dates or false urgency.
const starterPricing = {
  "gst-registration": {
    "regularPrice": "499",
    "offerPrice": "299",
    "pricingUnit": "per application",
    "offerLabel": "New-client price",
    "pricingNote": "Professional assistance fee. GST registration application on the government portal has no government fee. Clarification replies, complex premises cases and statutory or third-party costs, if any, are quoted separately."
  },
  "gstr-1-filing": {
    "regularPrice": "499",
    "offerPrice": "99",
    "pricingUnit": "per return",
    "offerLabel": "Introductory price",
    "pricingNote": "Introductory fee applies to one basic eligible return; the ₹49 nil-return starter offer is limited to one eligible nil GSTR-1 or GSTR-3B form. Transaction volume, amendments and marketplace data may change the quote."
  },
  "gstr-3b-filing": {
    "regularPrice": "499",
    "offerPrice": "99",
    "pricingUnit": "per return",
    "offerLabel": "Introductory price",
    "pricingNote": "Basic return preparation. ITC reconciliation, multiple registrations and complex adjustments are quoted based on records."
  },
  "itr-filing": {
    "regularPrice": "999",
    "offerPrice": "399",
    "pricingUnit": "simple individual return",
    "offerLabel": "Individual ITR offer",
    "pricingNote": "For eligible straightforward individual cases. Capital gains, F&O, foreign income, business books, notices and audit cases are quoted separately."
  },
  "msme-registration": {
    "regularPrice": "499",
    "offerPrice": "199",
    "pricingUnit": "per application",
    "offerLabel": "New-client price",
    "pricingNote": "Udyam government registration is free on the official portal. This is a professional assistance fee; no government benefit or approval is guaranteed."
  },
  "fssai-registration": {
    "regularPrice": "1499",
    "offerPrice": "999",
    "pricingUnit": "basic application assistance",
    "offerLabel": "Introductory price",
    "pricingNote": "Government licence fee depends on licence type and tenure and is additional. State/Central licences and manufacturing cases require a separate quote."
  },
  "tds-return-filing": {
    "regularPrice": "1499",
    "offerPrice": "999",
    "pricingUnit": "per quarter / basic statement",
    "offerLabel": "Introductory price",
    "pricingNote": "For a basic statement within an agreed deductee volume. Multiple forms, corrections, salary certificates and high-volume data are quoted separately."
  },
  "iec-registration": {
    "regularPrice": "1999",
    "offerPrice": "999",
    "pricingUnit": "per application",
    "offerLabel": "New-client price",
    "pricingNote": "Professional assistance fee. DGFT requirements, DSC, bank validation and additional documentation may affect the final scope."
  },
  "gem-registration": {
    "regularPrice": "1499",
    "offerPrice": "999",
    "pricingUnit": "seller onboarding support",
    "offerLabel": "Introductory price",
    "pricingNote": "Basic seller profile assistance only. Product catalogue, category approvals, OEM authorisation and ongoing bid support are separate."
  },
  "uk-vat-compliance": {
    "regularPrice": "9999",
    "offerPrice": "7999",
    "pricingUnit": "per registration-readiness engagement",
    "offerLabel": "International launch price",
    "pricingNote": "Includes business-model and document review plus coordination with a UK VAT specialist. UK local-agent fees, HMRC representation, registration submissions, VAT return preparation/filing, software and disbursements are quoted separately and paid at cost. UK VAT registration for overseas businesses can require specialist local representation; scope is confirmed before engagement."
  },
  "eu-vat-oss-ioss": {
    "regularPrice": "9999",
    "offerPrice": "6999",
    "pricingUnit": "per scheme/country assessment",
    "offerLabel": "International launch price",
    "pricingNote": "Starting professional fee for one-country or one-scheme eligibility and records assessment. OSS/IOSS registration, quarterly/monthly return preparation, EU fiscal representation, IOSS intermediary, local agents and country registrations are separate and quoted after reviewing countries and sales flows. Published providers list OSS at about €400/year and IOSS at about €500/year, before any additional representation or local costs."
  },
  "uae-vat-compliance": {
    "regularPrice": "6999",
    "offerPrice": "4999",
    "pricingUnit": "per registration-readiness engagement",
    "offerLabel": "International launch price",
    "pricingNote": "Includes document and transaction review plus coordination with a UAE VAT specialist. UAE local-agent fees, FTA submissions, return preparation/filing, accounting clean-up and disbursements are separate where applicable. Standalone UAE providers publish VAT registration prices around AED 350–750 and quarterly returns from AED 350–750; final scope is confirmed in writing."
  },
  "us-tax-sales-tax": {
    "regularPrice": "12999",
    "offerPrice": "7999",
    "pricingUnit": "per initial nexus review",
    "offerLabel": "International launch price",
    "pricingNote": "Starting fee for an initial US state-by-state sales-tax nexus and records review. State registrations, federal/state income-tax returns, ongoing sales-tax returns, notices and US-licensed preparer/agent fees are separate. Ongoing state filing scope is quoted by state and frequency; no US tax return or representation is included in this assessment."
  },
  "company-registration": {
    "regularPrice": "4999",
    "offerPrice": "2999",
    "pricingUnit": "basic professional assistance",
    "offerLabel": "Startup offer",
    "pricingNote": "Government/MCA fees, stamp duty, DSC, name reservation and other statutory or third-party costs are additional. Final fee depends on entity type and authorised capital."
  },
  "compliance-services": {
    "regularPrice": "4999",
    "offerPrice": "2999",
    "pricingUnit": "per month, basic compliance coordination",
    "offerLabel": "Starter monthly package",
    "pricingNote": "For a small business with one agreed entity and limited routine compliance tasks. GST/TDS/ITR filings, transaction volume, bookkeeping, notices, payroll, statutory fees and specialist work depend on the final written scope; not an all-inclusive unlimited package."
  },
  "global-expansion-advisory": {
    "regularPrice": "14999",
    "offerPrice": "7999",
    "pricingUnit": "per market-entry planning engagement",
    "offerLabel": "International launch price",
    "pricingNote": "Includes an initial discovery session and a scoped market-entry tax/compliance action checklist for one target market. Legal opinions, transfer pricing, entity formation, local registrations, licensed advice and third-party specialist fees are separate. Multi-country or implementation projects receive a written proposal."
  },
  "ecommerce-tax-compliance": {
    "regularPrice": "1499",
    "offerPrice": "999",
    "pricingUnit": "per month, basic seller package",
    "offerLabel": "Introductory monthly package",
    "pricingNote": "Subject to marketplace count, order volume, states, return frequency and reconciliation scope. TCS, accounting and complex reconciliations may be additional."
  },
  "accounting-bookkeeping": {
    "regularPrice": "2499",
    "offerPrice": "1499",
    "pricingUnit": "per month, starter volume",
    "offerLabel": "Starter monthly offer",
    "pricingNote": "Final fee depends on monthly transaction count, bank accounts, GST registrations, payroll and reporting requirements."
  },
  "gst-registration-cancellation": { "regularPrice":"999", "offerPrice":"799", "pricingUnit":"per application", "offerLabel":"Introductory price", "pricingNote":"Professional fee only. Pending returns, stock liability, notices and statutory issues may change the scope." },
  "gst-notice-reply": { "regularPrice":"", "offerPrice":"", "pricingUnit":"", "offerLabel":"", "pricingNote":"Custom quotation after reviewing notice type, tax period, deadline and evidence. Hearing or litigation support is separate." },
  "qrmp-scheme-support": { "regularPrice":"499", "offerPrice":"299", "pricingUnit":"scheme election assistance", "offerLabel":"Introductory price", "pricingNote":"Professional fee for eligibility review and portal assistance; return filing is charged separately." },
  "cmp-08-composition-return": { "regularPrice":"499", "offerPrice":"299", "pricingUnit":"per statement", "offerLabel":"Introductory price", "pricingNote":"Basic records only. Reconciliation and corrections are separately quoted." },
  "gstr-4-annual-return": { "regularPrice":"999", "offerPrice":"499", "pricingUnit":"per annual return", "offerLabel":"Introductory price", "pricingNote":"Basic composition records. Reconciliation and corrections are separately quoted." },
  "gstr-10-final-return": { "regularPrice":"1499", "offerPrice":"999", "pricingUnit":"per final return", "offerLabel":"Introductory price", "pricingNote":"Basic case only. Stock liability, pending returns and notice work may require a separate quote." },
  "gstr-9-annual-return": { "regularPrice":"2499", "offerPrice":"1499", "pricingUnit":"basic annual return", "offerLabel":"Introductory price", "pricingNote":"Final fee depends on turnover, books, ITC reconciliation and statutory applicability." },
  "tcs-return-filing": { "regularPrice":"1499", "offerPrice":"999", "pricingUnit":"per basic quarterly statement", "offerLabel":"Introductory price", "pricingNote":"Deductee/collector volume, corrections and certificate generation may be additional." },
  "trade-licence-assistance": { "regularPrice":"1999", "offerPrice":"1499", "pricingUnit":"basic application assistance", "offerLabel":"Introductory price", "pricingNote":"Municipal fees and local requirements vary by location and activity and are additional." },
  "payroll-compliance": { "regularPrice":"2499", "offerPrice":"1499", "pricingUnit":"per month, starter scope", "offerLabel":"Starter monthly price", "pricingNote":"Employee count, PF/ESI/PT/TDS filings and payroll complexity affect the final fee." },
  "roc-annual-compliance": { "regularPrice":"5999", "offerPrice":"4999", "pricingUnit":"basic annual compliance scope", "offerLabel":"Introductory price", "pricingNote":"MCA fees, additional forms, audit and overdue filings are separate." },
  "quick-commerce-seller-onboarding": { "regularPrice":"", "offerPrice":"", "pricingUnit":"", "offerLabel":"", "pricingNote":"Custom quote based on platform, product count, category and catalogue readiness." },
  "trademark-registration": {
    "regularPrice": "2499",
    "offerPrice": "799",
    "pricingUnit": "professional filing assistance / one class",
    "offerLabel": "New-client price",
    "pricingNote": "Government trademark filing fee is additional and varies by applicant category and filing mode. Search, objections, hearings and additional classes are separate."
  }
};

export const starterServices = starterServicesData.map((service) => {
  const price = starterPricing[service.slug];
  if (!price) return service;
  const pricingInfo = price.offerPrice
    ? `Introductory professional fee: ₹${price.offerPrice} ${price.pricingUnit}. ${price.pricingNote}`
    : `Professional fee: custom quotation. ${price.pricingNote}`;
  return { ...service, ...price, pricingInfo };
});
