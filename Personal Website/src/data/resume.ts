/**
 * Résumé content, transcribed from public/Junan_Wang_Resume.pdf so the page can
 * be real typography instead of an embedded PDF viewer. The PDF stays available
 * as a download and remains the source of truth — keep the two in sync.
 *
 * Text wrapped in **double asterisks** renders emphasised, mirroring the bold
 * runs in the PDF. See components/RichText.tsx.
 */

export const SUMMARY =
  "Product Manager for a B2B AI-graded oral assessment platform used by universities to check the comprehension behind written coursework. Computer Science, Statistics and Economics background. I define model release criteria with engineers, contribute to model and application development directly, and run technical discovery with non-technical buyers.";

export interface Role {
  title: string;
  org: string;
  period: string;
  points: string[];
}

export const EXPERIENCE: Role[] = [
  {
    title: "Product Manager",
    org: "The Bright Doctor",
    period: "Sept 2025 — Present",
    points: [
      "Owned an **AI-native oral assessment product end to end** — discovery, scoping, prototype, launch, onboarding — across **5 institutions and 9 instructors**, covering over **1,000 graded assessments per term**.",
      "Cut dynamic follow-up questions from the launch spec after discovery showed instructors valued predictable, consistent question sets over adaptive depth; **the simpler flow shipped 2 weeks earlier**.",
      "Scoped a **rehearsed-vs-spontaneous speech classifier** — the product's defense against exam takers reading AI-generated answers aloud. Trained on labelled B2C admissions-prep audio, **reaching 0.91 AUC**, and set a precision-first flagging threshold to keep instructor review load manageable.",
      "Led **technical discovery** across B2B sales cycles, translating platform architecture into instructional and operational outcomes for non-technical educators; supported 6 deals, **5 closed**.",
      "Consolidated recurring customer objections and support themes into a **prioritized backlog** for a cross-functional team of 4, arbitrating scope against engineering capacity; **7 consecutive milestones** on time.",
      "Specified and shipped internal sales automation that streamlined the project data pipeline, surfacing lead status and customer insight to the team and **cutting manual data entry by 8+ hours weekly**.",
    ],
  },
  {
    title: "Independent Solutions Consultant",
    org: "Logistics & Tourism SMB Clients",
    period: "June 2024 — Aug 2025",
    points: [
      "Sole technical partner to 3 owner-operator clients: ran requirements discovery, defined scope and success metrics, then built and shipped the platform. Delivered **400+ new monthly users** and a **32% increase in service inquiries** across engagements.",
      "Pushed clients toward integrated booking and CMS ahead of the cosmetic redesign they had asked for, after discovery indicated inbound inquiries were being lost to manual scheduling; the reprioritization resulted in **43 new paying customers and 8 return customers**.",
      "Set technical direction and reviewed work for junior developers on multi-person engagements.",
    ],
  },
  {
    title: "Sales Associate",
    org: "Berry's Bait & Tackle Ltd",
    period: "Apr 2019 — Sept 2020",
    points: [
      "Translated complex equipment specifications into clear, benefit-driven value propositions, **consistently exceeding monthly sales targets**.",
    ],
  },
];

export interface Credential {
  title: string;
  org: string;
  detail: string;
}

export const EDUCATION: Credential[] = [
  {
    title: "B.Sc. Computer Science, Statistics and Economics",
    org: "University of Toronto, St. George · 2020 — 2025",
    detail:
      "Coursework: Machine Learning, Data Analysis, Computational Statistics, Statistical Theory, Databases, Algorithms, Web Development, Econometrics, Financial Economics.",
  },
  {
    title: "Google Project Management Professional",
    org: "Coursera",
    detail:
      "Applied traditional and Agile frameworks across the project lifecycle — charters, risk registers, stakeholder communication and cross-functional coordination.",
  },
  {
    title: "Machine Learning Specialization",
    org: "Coursera · 2026",
    detail:
      "Prediction, classification and unsupervised learning, including neural networks. Built and evaluated models with NumPy, Pandas and scikit-learn — the grounding behind release criteria I now set with engineers.",
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    label: "Product",
    items: [
      "Customer discovery & user interviews",
      "Requirements definition",
      "User stories & acceptance criteria",
      "Roadmap & sprint prioritization",
      "Backlog triage",
      "Scoping & tradeoff analysis",
      "Launch & onboarding",
      "Agile / Scrum",
      "Jira",
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      "SQL (PostgreSQL)",
      "NoSQL (MongoDB)",
      "A/B testing",
      "Pandas",
      "NumPy",
      "Google Analytics",
    ],
  },
  {
    label: "Technical Proficiency",
    items: [
      "Full-stack (JS, React, Node.js)",
      "Machine Learning (scikit-learn)",
      "ETL",
      "REST APIs",
      "AWS",
      "Git",
      "Docker",
    ],
  },
];

export const LANGUAGES = "English & Mandarin · Intermediate French";
