/**
 * SHASHWAT HOSPITAL — MULTI-LANGUAGE TRANSLATION DICTIONARIES
 * 
 * Supports English (en), Hindi (hi), and Marathi (mr) for public-facing patient pages.
 * Carefully vetted medical and UI terminology.
 */

export type Locale = "en" | "hi" | "mr";

export interface TranslationDictionary {
  nav: {
    home: string;
    orthopaedics: string;
    treatments: string;
    doctors: string;
    emergency: string;
    secondOpinion: string;
    about: string;
    contact: string;
    portal: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bookAppointment: string;
    findDoctor: string;
    emergencyHotline: string;
  };
  cta: {
    bookAppointment: string;
    secondOpinion: string;
    callEmergency: string;
    viewAllTreatments: string;
    learnMore: string;
  };
  common: {
    emergencyCare: string;
    twentyFourSeven: string;
    nerulNaviMumbai: string;
    verifiedCare: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    nav: {
      home: "Home",
      orthopaedics: "Orthopaedics",
      treatments: "Treatments",
      doctors: "Specialists",
      emergency: "24/7 Emergency",
      secondOpinion: "Second Opinion",
      about: "About Hospital",
      contact: "Contact & Location",
      portal: "Patient Portal",
    },
    hero: {
      eyebrow: "SHASHWAT HOSPITAL · NERUL, NAVI MUMBAI",
      title: "Move Better. Live Better.",
      subtitle:
        "Specialised orthopaedic surgical care, joint preservation, and sports injury recovery designed around your rehabilitation journey.",
      bookAppointment: "Book an Appointment",
      findDoctor: "Find a Specialist",
      emergencyHotline: "24/7 Emergency",
    },
    cta: {
      bookAppointment: "Book an Appointment",
      secondOpinion: "Get a Second Opinion",
      callEmergency: "24/7 Emergency Hotline",
      viewAllTreatments: "Explore All Treatments",
      learnMore: "Learn More",
    },
    common: {
      emergencyCare: "Emergency Orthopaedic Trauma Care",
      twentyFourSeven: "24/7 Casualty & Surgical Theatre",
      nerulNaviMumbai: "Nerul, Navi Mumbai",
      verifiedCare: "NABH Aligned Clinical Protocols",
    },
  },
  hi: {
    nav: {
      home: "मुख्य पृष्ठ",
      orthopaedics: "हड्डी एवं जोड़ रोग",
      treatments: "उपचार एवं सर्जरी",
      doctors: "विशेषज्ञ डॉक्टर",
      emergency: "24/7 आपातकालीन",
      secondOpinion: "दूसरी राय (Second Opinion)",
      about: "अस्पताल के बारे में",
      contact: "संपर्क एवं पता",
      portal: "मरीज़ पोर्टल",
    },
    hero: {
      eyebrow: "शाश्वत हॉस्पिटल · नेरुल, नवी मुंबई",
      title: "बेहतर गतिशीलता, बेहतर जीवन।",
      subtitle:
        "उन्नत हड्डी रोग, जोड़ प्रत्यारोपण, आर्थोस्कोपी और खेल चोटों के लिए समर्पित विशेषज्ञ सर्जिकल देखभाल।",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      findDoctor: "डॉक्टर खोजें",
      emergencyHotline: "आपातकालीन सेवा",
    },
    cta: {
      bookAppointment: "अपॉइंटमेंट बुक करें",
      secondOpinion: "विशेषज्ञ दूसरी राय लें",
      callEmergency: "24/7 इमरजेंसी हेल्पलाइन",
      viewAllTreatments: "सभी उपचार देखें",
      learnMore: "और जानें",
    },
    common: {
      emergencyCare: "आपातकालीन हड्डी ट्रॉमा देखभाल",
      twentyFourSeven: "24/7 आपातकालीन एवं ऑपरेशन थिएटर",
      nerulNaviMumbai: "नेरुल, नवी मुंबई",
      verifiedCare: "मानक नैदानिक प्रोटोकॉल",
    },
  },
  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      orthopaedics: "अस्थिरोग व सांधेविकार",
      treatments: "उपचार व शस्त्रक्रिया",
      doctors: "तज्ज्ञ डॉक्टर",
      emergency: "२४/७ आपत्कालीन सेवा",
      secondOpinion: "दुसरा सल्ला (Second Opinion)",
      about: "रुग्णालयाविषयी",
      contact: "संपर्क व पत्ता",
      portal: "रुग्ण पोर्टल",
    },
    hero: {
      eyebrow: "शाश्वत हॉस्पिटल · नेरूळ, नवी मुंबई",
      title: "सुलभ हालचाल, निरोगी जीवन.",
      subtitle:
        "प्रगत सांधे प्रत्यारोपण, आर्थ्रोस्कोपी आणि क्रीडा दुखापतींसाठी समर्पित ऑर्थोपेडिक व सर्जिकल उपचार.",
      bookAppointment: "भेट निश्चित करा (Appointment)",
      findDoctor: "तज्ज्ञ डॉक्टर शोधा",
      emergencyHotline: "आपत्कालीन सेवा",
    },
    cta: {
      bookAppointment: "भेट निश्चित करा",
      secondOpinion: "तज्ज्ञांचा दुसरा सल्ला घ्या",
      callEmergency: "२४/७ आपत्कालीन मदत",
      viewAllTreatments: "सर्व उपचार पहा",
      learnMore: "अधिक माहिती",
    },
    common: {
      emergencyCare: "तातडीची अस्थिरोग व ट्रॉमा केअर",
      twentyFourSeven: "२४/७ आपत्कालीन व शस्त्रक्रिया कक्ष",
      nerulNaviMumbai: "नेरूळ, नवी मुंबई",
      verifiedCare: "प्रमाणित वैद्यकीय उपचार",
    },
  },
};

export function getTranslation(locale: Locale = "en"): TranslationDictionary {
  return translations[locale] || translations.en;
}
