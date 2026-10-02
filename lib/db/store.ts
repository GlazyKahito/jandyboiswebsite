import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { AppData, initialTranslations } from './defaultData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Generate fresh default dataset
function generateDefaultData(): AppData {
  const defaultPassword = process.env.ADMIN_PASSWORD || 'JandyBio2026!';
  const defaultEmail = process.env.ADMIN_EMAIL || 'admin@jandy.edu';
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(defaultPassword, salt);

  return {
    admin: {
      id: 'admin-1',
      email: defaultEmail,
      passwordHash: passwordHash,
      name: 'Janardhan Aghav',
      createdAt: new Date().toISOString()
    },
    profile: {
      id: 'prof-1',
      name: 'Janardhan Aghav',
      displayName: 'Jandy',
      title: 'Biology Faculty',
      institution: 'Shubham Raje Junior College (SRJC), Thane',
      location: 'Patlipada, Thane (West), Maharashtra, India',
      bio: 'Janardhan Aghav (affectionately known to students as Jandy) is Biology Faculty at Shubham Raje Junior College (SRJC), Thane West, and holds an M.Sc. and a B.Ed. With a passion rooted in classical naturalism and modern cellular biology, he specializes in Maharashtra State Board HSC curriculum and high-yield NEET-UG mentoring. His teaching emphasizes conceptual visual diagrams, botanical classification, and the physiological logic that animates living organisms.',
      philosophy: 'Biology is not a tedious catalogue of nomenclature; it is the poetic architecture of existence. When a student grasps why a stomatal guard cell moves or how nucleic acid codes for enzyme synthesis, memorization yields naturally to genuine scientific insight.',
      quote: 'Teaching Biology at SRJC has been a journey of purpose. The college offers an academically rich environment, strong infrastructure, and a culture that values inquiry and discipline. I feel proud to help shape the scientific thinking of the next generation.',
      photoUrl: '/images/portrait_jandy_engraving.svg',
      email: 'info@shubhamrajecollege.com',
      phone: '+91 85912 88300',
      status: 'published',
      updatedAt: new Date().toISOString()
    },
    education: [
      {
        id: 'edu-1',
        degree: 'M.Sc.',
        field: 'Biological Sciences',
        institution: 'University to be confirmed',
        year: 'Provisional Record',
        details: 'Qualification as listed on the Shubham Raje Junior College faculty page. Awarding university, specialization and year have not been published and can be added via the Faculty Admin Portal.',
        isProvisional: true,
        orderIndex: 1,
        status: 'published'
      },
      {
        id: 'edu-2',
        degree: 'B.Ed. (Bachelor of Education)',
        field: 'Teacher Education',
        institution: 'University to be confirmed',
        year: 'Provisional Record',
        details: 'Qualification as listed on the Shubham Raje Junior College faculty page. Awarding university and year have not been published and can be added via the Faculty Admin Portal.',
        isProvisional: true,
        orderIndex: 2,
        status: 'published'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Biology Faculty',
        institution: 'Shubham Raje Junior College (SRJC)',
        period: 'Present',
        location: 'Patlipada, Thane (West)',
        description: 'Lead instructor for Higher Secondary (Class XI & XII) Biology and NEET-UG coaching wing. Responsible for lecture series, laboratory practicals, and board examination preparedness.',
        responsibilities: [
          'Deliver systematic lectures across Botany, Human Anatomy, Genetics, and Ecology for Class XI & XII.',
          'Design bespoke visual handbooks and labelled anatomical diagram sets to simplify complex pathways.',
          'Supervise practical laboratory demonstrations including plant histology, specimen identification, and slide preparation.',
          'Mentor aspiring medical candidates for NEET-UG with focused conceptual problem-solving workshops.'
        ],
        orderIndex: 1,
        status: 'published'
      },
      {
        id: 'exp-2',
        role: 'Junior Lecturer in Life Sciences',
        institution: 'Higher Secondary Science Institute (Demo Entry)',
        period: '2015 — 2018',
        location: 'Thane District, Maharashtra',
        description: 'Conducted interactive biology classes and guided foundational laboratory practicals for intermediate students.',
        responsibilities: [
          'Formulated periodic chapter assessments and remedial review sessions.',
          'Guided students through specimen preservation and herbarium collection protocols.',
          'Pioneered interactive chalkboard-sketching methods to illustrate cardiac and nephron structures.'
        ],
        orderIndex: 2,
        status: 'published'
      }
    ],
    skills: [
      {
        id: 'skill-1',
        name: 'Plant Physiology & Botanical Morphology',
        category: 'Botany',
        description: 'Comprehensive mastery of photosynthesis, transpiration, plant hormones, and taxonomic classification.',
        orderIndex: 1,
        status: 'published'
      },
      {
        id: 'skill-2',
        name: 'Human Anatomy & Organ Systems',
        category: 'Zoology',
        description: 'Detailed mechanical and histological knowledge of circulatory, nervous, endocrine, and excretory systems.',
        orderIndex: 2,
        status: 'published'
      },
      {
        id: 'skill-3',
        name: 'Genetics & Molecular Cytology',
        category: 'Cytology & Genetics',
        description: 'Mendelian principles, DNA transcription, translation, mutations, and recombinant biotechnology.',
        orderIndex: 3,
        status: 'published'
      },
      {
        id: 'skill-4',
        name: 'NEET-UG High-Yield Pedagogy',
        category: 'Pedagogy & Lab',
        description: 'Strategic question deconstruction, eliminating common distractor options, and speed-accuracy optimization.',
        orderIndex: 4,
        status: 'published'
      },
      {
        id: 'skill-5',
        name: 'Microscopy & Slide Staining',
        category: 'Pedagogy & Lab',
        description: 'Expertise in compound light microscopy, section cutting, safranin/fast green differential staining.',
        orderIndex: 5,
        status: 'published'
      },
      {
        id: 'skill-6',
        name: 'Board Examination Moderation',
        category: 'Pedagogy & Lab',
        description: 'Knowledge of Maharashtra State Board marking schemes, step-marking rubrics, and answer presentation.',
        orderIndex: 6,
        status: 'published'
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Academic Mentorship Citation (Demo)',
        issuer: 'Regional Science Teachers Council',
        year: '2023',
        description: 'Honored for exceptional contribution to simplifying life science pedagogy and inspiring students toward botanical research.',
        isDemo: true,
        status: 'published'
      },
      {
        id: 'ach-2',
        title: 'NEET Biology 340+ Scorers Mentorship Cohort (Demo)',
        issuer: 'SRJC Academic Wing',
        year: '2022',
        description: 'Mentored over 45 students achieving scores exceeding 340 out of 360 in the Biology NEET paper through targeted diagnostic sessions.',
        isDemo: true,
        status: 'published'
      },
      {
        id: 'ach-3',
        title: 'District Botanical Specimen Preservation Lead (Demo)',
        issuer: 'Naturalists Educational Collective',
        year: '2020',
        description: 'Curated a digital herbarium archive cataloging 120 indigenous medicinal flora species across Thane and Western Ghats fringes.',
        isDemo: true,
        status: 'published'
      }
    ],
    resources: [
      {
        id: 'res-1',
        title: 'Photosynthesis & Photophosphorylation Master Folio',
        description: 'Complete breakdown of Light Reactions, Z-Scheme, Calvin Cycle (C3), Hatch-Slack Pathway (C4), and Crassulacean Acid Metabolism.',
        category: 'Biology Notes',
        topic: 'Plant Physiology',
        classLevel: 'Class XI',
        language: 'English',
        fileUrl: '/api/resources/download/photosynthesis-master-folio.pdf',
        fileType: 'PDF',
        fileSize: '1.4 MB',
        uploadDate: '2026-09-15',
        isDemo: true,
        status: 'published'
      },
      {
        id: 'res-2',
        title: 'Cardiac Cycle & Electrocardiography (ECG) Diagnostic Guide',
        description: 'Detailed analysis of ventricular systole, atrial diastole, heart sounds (LUBB-DUPP), conduction pathways, and clinical ECG wave interpretation.',
        category: 'Diagrams & Lab Sheets',
        topic: 'Human Physiology',
        classLevel: 'Class XII',
        language: 'English',
        fileUrl: '/api/resources/download/cardiac-cycle-guide.pdf',
        fileType: 'PDF',
        fileSize: '2.1 MB',
        uploadDate: '2026-09-20',
        isDemo: true,
        status: 'published'
      },
      {
        id: 'res-3',
        title: 'Mendelian Genetics & Dihybrid Cross Problem Set',
        description: 'Forty curated numerical problems on gene interaction, incomplete dominance, epistasis, and chromosomal mapping with step-by-step solutions.',
        category: 'Worksheets',
        topic: 'Genetics',
        classLevel: 'Class XII',
        language: 'English',
        fileUrl: '/api/resources/download/genetics-problem-set.pdf',
        fileType: 'PDF',
        fileSize: '950 KB',
        uploadDate: '2026-09-28',
        isDemo: true,
        status: 'published'
      },
      {
        id: 'res-4',
        title: 'मानवी रक्ताभिसरण संस्था - सविस्तर आकृती व टिपणे (Marathi Guide)',
        description: 'हृदयाची आंतररचना, रक्तवाहिन्या आणि दुहेरी रक्ताभिसरण संकल्पनेचा मराठीतील सविस्तर अभ्यास संच.',
        category: 'Study Materials',
        topic: 'मानवी शरीरशास्त्र',
        classLevel: 'Class XII',
        language: 'Marathi',
        fileUrl: '/api/resources/download/human-circulation-marathi.pdf',
        fileType: 'PDF',
        fileSize: '1.8 MB',
        uploadDate: '2026-10-01',
        isDemo: true,
        status: 'published'
      },
      {
        id: 'res-5',
        title: 'कोशिका चक्र एवं विभाजन: समसूत्री व अर्धसूत्री विभाजन सारांश (Hindi Flash Notes)',
        description: 'माइटोसिस एवं मियोसिस के विभिन्न चरणों, क्रॉसिंग ओवर, एवं चेकपॉइंट्स पर आधारित त्वरित पुनरावलोकन पत्रक.',
        category: 'Presentations & Question Banks',
        topic: 'कोशिका विज्ञान',
        classLevel: 'NEET-UG',
        language: 'Hindi',
        fileUrl: '/api/resources/download/cell-cycle-hindi.pdf',
        fileType: 'PDF',
        fileSize: '1.2 MB',
        uploadDate: '2026-10-02',
        isDemo: true,
        status: 'published'
      }
    ],
    enquiries: [],
    translations: initialTranslations
  };
}

export function getDatabase(): AppData {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initial = generateDefaultData();
    saveDatabase(initial);
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading database file, reinitializing with default dataset:', err);
    const initial = generateDefaultData();
    saveDatabase(initial);
    return initial;
  }
}

export function saveDatabase(data: AppData): void {
  ensureDataDir();
  const tempPath = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE);
}
