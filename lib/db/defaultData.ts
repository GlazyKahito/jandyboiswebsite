export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  name: string;
  displayName: string;
  title: string;
  institution: string;
  location: string;
  bio: string;
  philosophy: string;
  quote: string;
  photoUrl: string;
  email: string;
  phone: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
  details: string;
  isProvisional: boolean;
  orderIndex: number;
  status: 'published' | 'draft';
}

export interface ExperienceItem {
  id: string;
  role: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  orderIndex: number;
  status: 'published' | 'draft';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Botany' | 'Zoology' | 'Cytology & Genetics' | 'Pedagogy & Lab';
  description: string;
  orderIndex: number;
  status: 'published' | 'draft';
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  isDemo: boolean;
  status: 'published' | 'draft';
}

export interface TeachingResource {
  id: string;
  title: string;
  description: string;
  category: 'Biology Notes' | 'Study Materials' | 'Worksheets' | 'Diagrams & Lab Sheets' | 'Presentations & Question Banks';
  topic: string;
  classLevel: 'Class XI' | 'Class XII' | 'NEET-UG';
  language: 'English' | 'Marathi' | 'Hindi';
  fileUrl: string;
  fileType: 'PDF' | 'Image';
  fileSize: string;
  uploadDate: string;
  isDemo: boolean;
  status: 'published' | 'draft';
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  purpose: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  createdAt: string;
}

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
}

export interface AppData {
  admin: AdminUser;
  profile: Profile;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  achievements: AchievementItem[];
  resources: TeachingResource[];
  enquiries: ContactEnquiry[];
  translations: TranslationDictionary;
}

export const initialTranslations: TranslationDictionary = {
  // Navigation
  nav_home: { en: "The Archive", mr: "अभिलेखागार", hi: "अभिलेखागार" },
  nav_about: { en: "About", mr: "परिचय", hi: "परिचय" },
  nav_education: { en: "Education", mr: "शिक्षण", hi: "शिक्षा" },
  nav_experience: { en: "Experience", mr: "अनुभव", hi: "अनुभव" },
  nav_expertise: { en: "Expertise", mr: "कौशल्य", hi: "दक्षता" },
  nav_achievements: { en: "Milestones", mr: "उपलब्धी", hi: "उपलब्धियां" },
  nav_resources: { en: "Teaching Folio", mr: "अध्यापन साहित्य", hi: "शिक्षण सामग्री" },
  nav_contact: { en: "Correspondence", mr: "संपर्क पत्र", hi: "संपर्क" },
  nav_resume_download: { en: "Curriculum Vitae", mr: "बायोडाटा डाउनलोड", hi: "बायोडाटा डाउनलोड" },
  nav_admin: { en: "Faculty Desk", mr: "प्रशासकीय कक्ष", hi: "प्रशासन" },

  // Hero Section
  hero_greeting: { en: "Naturalist & Educator's Archive", mr: "निसर्गशास्त्रज्ञ व शिक्षक अभिलेख", hi: "प्रकृतिवादी एवं शिक्षक अभिलेख" },
  hero_title: { en: "Biology Faculty & Academic Mentor", mr: "जीवशास्त्र प्राध्यापक व शैक्षणिक मार्गदर्शक", hi: "जीव विज्ञान प्राध्यापक एवं शैक्षिक मार्गदर्शक" },
  hero_institution: { en: "SRJC, Thane, Maharashtra, India", mr: "एसआरजेसी, ठाणे, महाराष्ट्र, भारत", hi: "एसआरजेसी, ठाणे, महाराष्ट्र, भारत" },
  hero_tagline: { 
    en: "Exploring the intricate architecture of living systems, inspiring scientific curiosity, and guiding students towards mastery in Maharashtra State Board & NEET-UG Biology.", 
    mr: "सजीव सृष्टीच्या रचनेचा वेध घेत, वैज्ञानिक जिज्ञासा जागृत करत, महाराष्ट्र राज्य मंडळ व NEET-UG जीवशास्त्रात विद्यार्थ्यांना मार्गदर्शक.", 
    hi: "सजीव प्रणालियों की वास्तुकला की खोज करते हुए, वैज्ञानिक जिज्ञासा को प्रेरित करते हुए, और महाराष्ट्र बोर्ड एवं NEET-UG में विद्यार्थियों का मार्गदर्शन." 
  },
  hero_cta_explore: { en: "Examine Field Notes", mr: "अभ्यास नोंदी पहा", hi: "अध्ययन नोट्स देखें" },
  hero_cta_resume: { en: "Download Résumé (PDF)", mr: "रेझ्युमे डाउनलोड करा (PDF)", hi: "बायोडाटा डाउनलोड करें (PDF)" },
  hero_cta_contact: { en: "Direct Inquiry", mr: "थेट संपर्क साधा", hi: "सीधा संपर्क करें" },

  // About Section
  about_title: { en: "Academic Philosophy & Biography", mr: "शैक्षणिक तत्त्वज्ञान व परिचय", hi: "शैक्षणिक दर्शन एवं परिचय" },
  about_subtitle: { en: "From Botanical Specimens to Cellular Mechanisms", mr: "वनस्पतीशास्त्रापासून पेशी रचनेपर्यंत", hi: "वनस्पति शास्त्र से लेकर कोशिकीय तंत्र तक" },
  about_quote: { 
    en: "Biology is not merely a curriculum of rote memorization; it is the poetic logic of living organisms striving to sustain order against chaos.",
    mr: "जीवशास्त्र हा केवळ पाठांतराचा विषय नसून, तो सजीवांच्या अस्तित्वाचा आणि निसर्गाच्या रचनेचा सुंदर तर्क आहे.",
    hi: "जीव विज्ञान केवल रटने का विषय नहीं है; यह जीवित प्राणियों के संतुलन और प्रकृति की सुंदरता का तार्किक अध्ययन है."
  },
  about_demo_note: {
    en: "Note: Biographical details shown reflect provisional demo data, fully editable via the Faculty Admin Portal.",
    mr: "टीप: दर्शवलेली माहिती नमुना माहिती आहे, प्रशासक कक्षातून संपादनक्षम आहे.",
    hi: "नोट: प्रदर्शित जानकारी प्रारंभिक डेमो डेटा है, जिसे एडमिन पोर्टल से बदला जा सकता है."
  },

  // Education & Experience
  edu_title: { en: "Scholastic Qualifications", mr: "शैक्षणिक पात्रता", hi: "शैक्षणिक योग्यता" },
  edu_subtitle: { en: "Degrees & Pedagogical Training", mr: "पदव्या व अध्यापन प्रशिक्षण", hi: "उपाधियां एवं शिक्षण प्रशिक्षण" },
  exp_title: { en: "Teaching Chronicles", mr: "अध्यापन कार्यप्रवास", hi: "अध्यापन कार्ययात्रा" },
  exp_subtitle: { en: "Classroom Mentorship & Institutional Roles", mr: "वर्ग अध्यापन व संस्थात्मक जबाबदाऱ्या", hi: "कक्षा अध्यापन व संस्थागत उत्तरदायित्व" },

  // Skills
  skills_title: { en: "Domains of Scientific Mastery", mr: "वैज्ञानिक प्रभुत्वाची क्षेत्रे", hi: "वैज्ञानिक दक्षता के क्षेत्र" },
  skills_subtitle: { en: "Botany, Zoology, Genetics & Practical Pedagogy", mr: "वनस्पतीशास्त्र, प्राणिशास्त्र, जनुकीय विज्ञान व प्रात्यक्षिके", hi: "वनस्पति विज्ञान, प्राणी विज्ञान, आनुवंशिकी व प्रायोगिक शिक्षण" },

  // Resources
  res_title: { en: "The Botanical & Zoological Folio", mr: "जीवशास्त्र शैक्षणिक संग्रह", hi: "जीव विज्ञान शिक्षण संग्रह" },
  res_subtitle: { en: "Downloadable Handouts, High-Yield Notes & Diagrammatic Guides", mr: "डाउनलोडयोग्य हस्तलिखित नोट्स, आकृत्या व सराव संच", hi: "डाउनलोड योग्य नोट्स, नामांकित आकृतियां व अभ्यास पत्र" },
  res_filter_all: { en: "All Materials", mr: "सर्व साहित्य", hi: "सभी सामग्री" },
  res_search_placeholder: { en: "Search notes, diagrams, topics...", mr: "विषय किंवा नोट्स शोधा...", hi: "विषय या नोट्स खोजें..." },
  res_download_btn: { en: "Download Archive", mr: "साहित्य डाउनलोड करा", hi: "सामग्री डाउनलोड करें" },

  // Contact
  contact_title: { en: "Epistolary Correspondence", mr: "संपर्क व चौकशी कक्ष", hi: "संपर्क एवं पूछताछ कक्ष" },
  contact_subtitle: { en: "Send an Inquiry to Professor Janardhan Aghav", mr: "प्रा. जनार्दन आघव यांच्याशी संपर्क साधा", hi: "प्राध्यापक जनार्दन आघव से संपर्क करें" },
  contact_name_label: { en: "Your Full Name", mr: "आपले पूर्ण नाव", hi: "आपका पूरा नाम" },
  contact_email_label: { en: "Official Email Address", mr: "आपला ईमेल पत्ता", hi: "आपका ईमेल पता" },
  contact_purpose_label: { en: "Nature of Inquiry", mr: "चौकशीचे स्वरूप", hi: "पूछताछ का प्रकार" },
  contact_subject_label: { en: "Subject Matter", mr: "विषय", hi: "विषय" },
  contact_message_label: { en: "Detailed Message", mr: "सविस्तर संदेश", hi: "विस्तृत संदेश" },
  contact_submit_btn: { en: "Dispatch Correspondence", mr: "संदेश पाठवा", hi: "संदेश प्रेषित करें" },
  contact_submitting: { en: "Sealing Envelope...", mr: "संदेश पाठवत आहे...", hi: "संदेश भेजा जा रहा है..." },
  contact_success: { en: "Your correspondence has been securely recorded. An acknowledgement copy has been dispatched.", mr: "आपला संदेश यशस्वीरित्या नोंदवला गेला आहे.", hi: "आपका संदेश सफलतापूर्वक दर्ज कर लिया गया है." }
};
