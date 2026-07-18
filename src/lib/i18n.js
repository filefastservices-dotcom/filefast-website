// Simple i18n translation system for FileFast
// Supports: English, Tamil, Hindi

export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About Founder",
    "nav.testimonials": "Testimonials",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.appointments": "Book Appointment",

    // Hero
    "hero.title": "Tax, Compliance & Business Growth Solutions",
    "hero.description":
      "Helping businesses and individuals across India with GST, Income Tax, Registration, Accounting and Compliance Services.",
    "hero.whatsapp": "WhatsApp Now",
    "hero.call": "Call Now",

    // Why Choose Us
    "why.title": "Built On Trust, Run With Precision",
    "why.professional": "Professional Service",
    "why.reasonable": "Reasonable Pricing",
    "why.satisfaction": "Complete Satisfaction",

    // Appointments
    "appointment.book": "Book Your Free Consultation",
    "appointment.success": "Appointment Booked!",
    "appointment.successMsg": "Our team will contact you soon to confirm.",

    // Admin
    "admin.dashboard": "Dashboard",
    "admin.services": "Services",
    "admin.blog": "Blog Posts",
    "admin.testimonials": "Testimonials",
    "admin.leads": "Leads",
    "admin.appointments": "Appointments",
    "admin.payments": "Payments"
  },

  ta: {
    // Navigation
    "nav.home": "முகப்பு",
    "nav.services": "சேவைகள்",
    "nav.about": "ஆசிரியர் பற்றி",
    "nav.testimonials": "பின்னூட்டங்கள்",
    "nav.blog": "வலைப்பதிவு",
    "nav.contact": "தொடர்பு",
    "nav.appointments": "சந்திப்பை முன்பதிவு செய்யுங்கள்",

    // Hero
    "hero.title": "வரி, இணக்கம் மற்றும் வணிக வளர்ச்சி தீர்வுகள்",
    "hero.description":
      "இந்தியா முழுவதும் GST, வருமான வரி, பதிவு, கணக்கியல் மற்றும் சட்ட அளவிலான சேவைகளுடன் வணிகங்கள் மற்றும் தனிநபர்களுக்கு உதவுகிறது.",
    "hero.whatsapp": "WhatsApp இல் தொடர்புகொள்ளுங்கள்",
    "hero.call": "இப்போது அழைக்கவும்",

    // Appointments
    "appointment.book": "உங்களின் இலவச ஆலோசனையை முன்பதிவு செய்யுங்கள்",
    "appointment.success": "சந்திப்பு முன்பதிவு செய்யப்பட்டது!",
    "appointment.successMsg": "எங்கள் குழு விரைவில் உங்களை உறுதிப்படுத்த தொடர்பு கொள்ளும்."
  },

  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    "nav.about": "संस्थापक के बारे में",
    "nav.testimonials": "प्रशंसापत्र",
    "nav.blog": "ब्लॉग",
    "nav.contact": "संपर्क करें",
    "nav.appointments": "अपॉइंटमेंट बुक करें",

    // Hero
    "hero.title": "कर, अनुपालन और व्यावसायिक विकास समाधान",
    "hero.description":
      "भारत भर में GST, आयकर, पंजीकरण, लेखांकन और अनुपालन सेवाओं के साथ व्यवसायों और व्यक्तियों को सहायता प्रदान करता है।",
    "hero.whatsapp": "अभी WhatsApp करें",
    "hero.call": "अभी कॉल करें",

    // Appointments
    "appointment.book": "अपना निःशुल्क परामर्श बुक करें",
    "appointment.success": "अपॉइंटमेंट बुक हो गया!",
    "appointment.successMsg": "हमारी टीम जल्द ही आपसे संपर्क करेगी।"
  }
};

export function t(key, lang = "en") {
  return translations[lang]?.[key] || translations["en"][key] || key;
}

export const languages = [
  { code: "en", name: "English" },
  { code: "ta", name: "தமிழ்" },
  { code: "hi", name: "हिन्दी" }
];
