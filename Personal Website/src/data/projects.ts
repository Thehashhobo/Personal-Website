import c1 from "../assets/C11.webp";
import c2 from "../assets/C21.webp";
import c3 from "../assets/C31.webp";
import c4 from "../assets/C4.webp";
import c5 from "../assets/C5.webp";
import c6 from "../assets/C6.webp";
import c7 from "../assets/C7.webp";
import c8 from "../assets/C8.webp";
import c9 from "../assets/C9.webp";
import c10 from "../assets/C10.webp";
import c11 from "../assets/C12.webp";
import c12 from "../assets/c13.webp";
import c14 from "../assets/c14.webp";
import c15 from "../assets/c15.webp";
import c16 from "../assets/C16.webp";

export type Category = "current" | "contract" | "personal" | "academic";

export const CATEGORY_LABEL: Record<Category, string> = {
  current: "Current",
  contract: "Client work",
  personal: "Personal",
  academic: "Academic",
};

export interface Project {
  id: string;
  title: string;
  /** One short line for the compact index row. */
  tagline: string;
  description: string;
  /** Omitted for work with no shippable screenshot — see `plate`. */
  image?: string;
  /**
   * Typographic stand-in used wherever `image` is missing, so commercial work
   * still occupies the well instead of borrowing another project's artwork.
   */
  plate?: { mark: string; note: string };
  technologies: string[];
  points: string[];
  /** Headline outcome, taken from the bullets below it. */
  metric?: { value: string; label: string };
  role?: string;
  /** Omitted when the work has no public URL; the card then does not navigate. */
  link?: string;
  extraLink?: string;
  extraLinkLabel?: string;
  category: Category;
  /** Featured projects get the full case-study treatment on /projects. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "bright-doctor",
    title: "AI Oral Assessment Platform",
    tagline: "The product I run — AI-graded oral exams for universities",
    description:
      "A B2B platform universities use to check the comprehension behind written coursework. An instructor sets the questions, students answer out loud, and the platform grades the response and flags answers that were read rather than reasoned. I own it end to end — discovery, scoping, prototype, launch and onboarding.",
    plate: { mark: "The Bright Doctor", note: "Commercial product — no public demo" },
    technologies: [
      "Product discovery",
      "Requirements definition",
      "Speech ML",
      "Backlog triage",
      "B2B onboarding",
      "Jira",
    ],
    points: [
      "Cut dynamic follow-up questions from the launch spec after discovery showed instructors valued predictable, consistent question sets over adaptive depth — the simpler flow shipped two weeks earlier.",
      "Scoped the rehearsed-vs-spontaneous speech classifier that defends the product against exam takers reading AI-generated answers aloud. Trained on labelled admissions-prep audio to 0.91 AUC, with a precision-first flagging threshold so instructor review load stays manageable.",
      "Led technical discovery through B2B sales cycles, translating platform architecture into instructional and operational outcomes for non-technical educators. Supported 6 deals; 5 closed.",
      "Consolidated recurring objections and support themes into a prioritized backlog for a cross-functional team of 4, arbitrating scope against engineering capacity — 7 consecutive milestones on time.",
      "Specified and shipped internal sales automation that surfaces lead status and customer insight to the team, cutting manual data entry by 8+ hours weekly.",
    ],
    metric: { value: "1,000+", label: "assessments per term" },
    role: "Product Manager — end to end",
    category: "current",
    featured: true,
  },
  {
    id: "colossal-carriers",
    title: "Colossal Carriers",
    tagline: "Freight operator's platform, rebuilt around the hiring bottleneck",
    description:
      "A cross-border trucking company came asking for a marketing site. Discovery showed the binding constraint was driver recruitment — applications arrived by phone and email, and trucks sat idle while someone sorted them. The build put a hiring portal at the centre and the marketing site around it.",
    image: c10,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Google Analytics"],
    points: [
      "Ran requirements discovery with the owner and reframed the brief: a marketing site alone would not fix idle vehicles, so applicant intake became the primary scope.",
      "Shipped an integrated hiring portal covering company drivers, lease-purchase candidates and owner-operators, giving the office one screening queue instead of an inbox.",
      "Service inquiries rose 32% after launch, with a lightweight admin panel so staff could work applications and contact submissions without a developer.",
      "Built end to end — Next.js front end, Node backend, and analytics wired to the funnel that actually mattered.",
    ],
    metric: { value: "+32%", label: "service inquiries" },
    role: "Solutions consultant — discovery to launch",
    link: "https://www.colossalcarriers.com/",
    category: "contract",
    featured: true,
  },
  {
    id: "duodate",
    title: "DuoDate",
    tagline: "Validated the double-date premise before writing the app",
    description:
      "A cross-platform dating app built around double dates rather than one-on-one matching. I surveyed target users first to test whether the premise held up at all, then turned what came back into a feature set narrow enough to actually reach an MVP.",
    image: c6,
    technologies: ["React Native", "TypeScript", "Expo", "Supabase", "PostgreSQL"],
    points: [
      "Ran targeted user surveys to test the double-date premise and surface what people disliked about conventional matching, then cut the feature list down to what the findings supported.",
      "Bought instead of building where it would not differentiate — Stream Chat for messaging — freeing the schedule for double-profile matching, the part nothing else on the market does.",
      "Building in React Native, TypeScript and Supabase, with a modular architecture that leaves room for the features validation deprioritized rather than deleted.",
      "Worked in short cycles against user feedback rather than a fixed spec, re-ranking the backlog after each round of testing.",
    ],
    metric: { value: "MVP", label: "in development" },
    role: "Product and engineering",
    link: "https://github.com/Thehashhobo/DuoDate",
    category: "current",
    featured: true,
  },
  {
    id: "cell-growth",
    title: "Cell Growth Simulation",
    tagline: "Reactive rendering architecture holding 10M interactive cells",
    description:
      "A web-based interactive cell simulation engineered to push browser performance limits through a highly optimized reactive, state-based architecture. Designed to manage and render millions of interactive cells, it tackles the harder half of the problem: real-time state updates that stay smooth at scale.",
    image: c3,
    technologies: ["Algorithm Design", "TypeScript", "Graphics Rendering"],
    points: [
      "Built an interactive simulation that stays responsive at up to 10 million cells, well past the point where naive re-rendering collapses.",
      "Implemented granular rendering over a reactive state architecture, eliminating redundant computation so an update costs time proportional to what actually changed.",
      "Iterated into a second version after profiling the first, trading memory for a flatter update path.",
    ],
    metric: { value: "10M", label: "cells rendered" },
    role: "Solo build",
    link: "https://thehashhobo.github.io/Cell-Growth-Simulation/",
    extraLink: "https://thehashhobo.github.io/Cell-Growth-Simulation-V2/",
    extraLinkLabel: "Version 2",
    category: "personal",
    featured: true,
  },
  {
    id: "du-toronto",
    title: "DU Toronto",
    tagline: "Chapter platform funded by its own storefront",
    description:
      "The official site of the Delta Upsilon Toronto chapter. The chapter needed to fund itself and stay connected to alumni — a brochure site would have done neither, so the build led with donations and merchandise instead of history and photos.",
    image: c14,
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "Stripe", "Vercel"],
    points: [
      "Scoped the platform around the chapter's real constraint — recurring revenue — rather than the brochure site originally asked for.",
      "Led development and mentored two developers alongside a UI/UX designer, sequencing work so the storefront was live before recruitment season.",
      "Built the store on Supabase for inventory and Stripe for payments, with analytics showing which channels actually brought donors in.",
      "Deployed on Vercel with CI/CD so chapter officers could keep it current without a developer in the loop.",
    ],
    metric: { value: "2", label: "developers mentored" },
    role: "Technical lead",
    link: "https://du-toronto-webpage.vercel.app/",
    category: "current",
  },
  {
    id: "ocean-wave",
    title: "Ocean Wave VIP",
    tagline: "Yacht charter site built to shorten the path to a booking",
    description:
      "An emerging yacht management company was losing inquiries somewhere between interest and booking. The site was built to make that path as short as it could be, and to let the client keep seasonal offerings current themselves.",
    image: c1,
    technologies: ["Node.js", "React", "TypeScript", "HTML", "CSS"],
    points: [
      "Worked directly with the client to translate what actually closes a charter into page structure and calls to action; business traffic rose 17%.",
      "Designed and developed a responsive marketing site in React, TypeScript and Node.js using the Ant Design UI library.",
      "Deployed on Netlify with a CI/CD workflow so seasonal updates never waited on my availability.",
    ],
    metric: { value: "+17%", label: "business traffic" },
    role: "Solutions consultant",
    link: "https://oceanwavevip.com/",
    category: "contract",
  },
  {
    id: "real-talk",
    title: "Real Talk",
    tagline: "Conversation prompts, narrowed to what testers actually picked",
    description:
      "A tool for starting deeper conversations. Prototype testing showed which topic categories people would genuinely open with and which they scrolled past, and generation was narrowed to match rather than covering everything.",
    image: c7,
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Google Analytics", "OpenAI"],
    points: [
      "Ran user research and prototype testing to find which conversation topics people would actually use, then cut generation down to those categories.",
      "Architected a Next.js app with serverless App Router endpoints for on-demand topic generation and SSR performance.",
      "Deployed to Netlify with CI/CD, keeping the loop from feedback to shipped change short.",
      "Used responsive design and restrained animation to keep sessions going rather than decorate them.",
    ],
    link: "https://realtalkz.netlify.app/",
    category: "personal",
  },
  {
    id: "form-builder",
    title: "Drag and Drop Form Builder",
    tagline: "Grid-snapping visual form composer",
    description:
      "A visual form builder enabling intuitive drag-and-drop placement of UI elements on a grid-based canvas, where the interaction has to feel physical or the tool is useless.",
    image: c16,
    technologies: ["React", "TypeScript", "DND Core"],
    points: [
      "Implemented a dynamic drag-and-drop interface with real-time grid cell highlighting and component snapping, so placement reads as deliberate rather than approximate.",
      "Built a modular component architecture supporting text fields, labels and buttons, aligned to a customizable CSS grid.",
    ],
    link: "https://github.com/Thehashhobo/feathery-form-builder",
    category: "personal",
  },
  {
    id: "shipment-tracker",
    title: "Shipment Tracker",
    tagline: "Clean-architecture .NET API behind a Next.js dashboard",
    description:
      "A full-stack shipment tracking system pairing a Next.js dashboard with a cleanly architected ASP.NET Core Web API, SQLite persistence and Swagger for API testing.",
    image: c12,
    technologies: ["TypeScript", "C#", "Next.js", "Material UI", ".NET 9", "EF Core", "SQLite", "Swagger", "Serilog"],
    points: [
      "Built a responsive shipment management dashboard in Next.js, React and Material UI with filtering, pagination, sorting and form modals.",
      "Implemented a layered backend using ASP.NET Core and Clean Architecture with DDD, enforcing separation across API, Application, Domain and Infrastructure.",
      "Integrated Entity Framework Core with SQLite and code-first migrations for fast schema iteration.",
      "Used Serilog for structured logging to console and file sinks, supporting scalable monitoring and debugging.",
      "Documented setup and design choices with learning notes tracking a rapid ramp into the .NET ecosystem.",
    ],
    link: "https://github.com/Thehashhobo/Full-Stack-Developer-Assignment",
    category: "personal",
  },
  {
    id: "org-chart",
    title: "Corporation Data Display",
    tagline: "Org-chart visualisation that survives 100k rows",
    description:
      "An interactive org chart for large-scale hierarchical data, built to stay usable at 100k rows of CSV input — the size at which most tree visualisations stop responding.",
    image: c9,
    technologies: ["Vue.js", "Tailwind CSS", "D3.js"],
    points: [
      "Implemented a dynamic tree layout with d3.hierarchy() and expandable, collapsible nodes.",
      "Memoized descendant calculations to keep interaction cost flat as the dataset grows.",
      "Added an LRU-based level constraint so expanding many nodes degrades gracefully instead of overflowing.",
      "Designed a responsive interface that adapts to varying screen sizes and tree states.",
    ],
    metric: { value: "100k", label: "rows supported" },
    link: "https://github.com/Thehashhobo/Corporation-Data-Display",
    extraLink: "https://codesandbox.io/p/github/Thehashhobo/Corporation-Data-Display/main?import=true",
    extraLinkLabel: "Live demo",
    category: "personal",
  },
  {
    id: "portfolio",
    title: "Personal Site and RAG Assistant",
    tagline: "This site, plus a Dockerised RAG assistant on AWS ECS",
    description:
      "A custom-built full-stack personal site with an embedded assistant that answers questions about my work — built partly to have a reason to run a retrieval pipeline in production rather than a notebook.",
    image: c11,
    technologies: ["TypeScript", "React", "Node.js", "Express", "AWS", "Docker"],
    points: [
      "Built an interactive Vite and React front end with a floating chat widget talking to the assistant over secure API routes.",
      "Built a Node.js and Express backend, Dockerised and deployed to AWS ECS Fargate behind an HTTPS Application Load Balancer inside a custom VPC.",
      "Automated SSL certification and DNS routing with AWS ACM and CNAME records for clean HTTPS access.",
      "Designed lightweight Retrieval-Augmented Generation logic using cosine similarity over pre-embedded content, trading recall for latency deliberately.",
    ],
    link: "https://github.com/Thehashhobo/Personal-Website",
    category: "personal",
  },
  {
    id: "recipe-analysis",
    title: "Recipe Data Analyzer",
    tagline: "Scrape, model and interrogate recipe data end to end",
    description:
      "A data project taken from collection through to modelling: extracting and structuring online data, then using EDA to find what the data could and could not support — including the quality problems that quietly break a model downstream.",
    image: c2,
    technologies: ["Python", "Jupyter", "SQL", "Pandas"],
    points: [
      "Built a Python and BeautifulSoup scraper to collect, clean and serialize recipe data from multiple sites.",
      "Wrote SQL queries with deliberate indexing, joins and subqueries for high-performance lookups over the collected set.",
      "Ran EDA in Pandas, Seaborn and Matplotlib to analyse ingredient trends, and identified the data quality issues that limited modelling before committing to features.",
    ],
    link: "https://github.com/Thehashhobo/Recipe-Data-Analysis",
    category: "personal",
  },
  {
    id: "sheep-tracker",
    title: "Sheep Data Tracker",
    tagline: "REST API and geolocated intake for the Canadian Sheep Federation",
    description:
      "A full-stack vanilla JS application for the Canadian Sheep Federation, pairing a custom REST API with a geolocation-enabled front end so field data arrives structured rather than as free text.",
    image: c15,
    technologies: ["Node.js", "Express", "JavaScript", "SQLite"],
    points: [
      "Built a RESTful API in Node.js and Express supporting submission, retrieval by ID and listing, with persistent SQLite storage.",
      "Added real-time location autocomplete via a public geocoding API, cutting the entry errors that make field data unusable.",
    ],
    link: "https://github.com/Thehashhobo/CSFIntershipAssessment2025",
    category: "personal",
  },
  {
    id: "fresh-bites",
    title: "FreshBites",
    tagline: "Kotlin pantry tracker with recipe matching",
    description:
      "An Android app in Kotlin that recommends recipes against what is actually in your pantry. Built as a foundational exercise in Kotlin and the Android SDK, with ingredient management, filtering and recipe matching.",
    image: c8,
    technologies: ["Kotlin", "Android SDK", "SQLite", "MVVM"],
    points: [
      "Built recipe recommendation driven by user-entered inventory rather than a fixed catalogue.",
      "Implemented inventory tracking with local persistence in SQLite.",
      "Structured it as a clean MVVM foundation for later expansion.",
    ],
    link: "https://github.com/Thehashhobo/FreshBites",
    category: "personal",
  },
  {
    id: "barnyard-buddies",
    title: "Barnyard Buddies",
    tagline: "Pet adoption platform, built by a team of four on Agile",
    description:
      "Led four developers building a full-stack adoption platform from scratch on Agile. Ran the weekly cadence, held the scope line when the feature list outgrew the term, and made the calls where technical execution and user need pulled apart.",
    image: c4,
    technologies: ["JavaScript", "Django", "React", "SQL", "Agile"],
    points: [
      "Shipped a 15-page application letting users post, search, filter and apply for pet adoptions, sequenced so a usable slice existed at every checkpoint.",
      "Ran weekly planning to align goals, surface blockers early and keep four people from colliding in the same files.",
      "Used Django REST Framework for the back end with React on the front, deployed across Heroku and Netlify with CI/CD.",
    ],
    metric: { value: "4", label: "developers led" },
    role: "Team lead",
    link: "https://barnyard-buddies.netlify.app/",
    category: "academic",
  },
  {
    id: "uofteams",
    title: "UofTeams",
    tagline: "Java collaboration platform built on OOP principles",
    description:
      "A platform connecting University of Toronto students through time-sensitive posts for extracurricular opportunities, built in Java with a deliberate emphasis on modular object-oriented design.",
    image: c5,
    technologies: ["Java"],
    points: [
      "Designed and implemented a modular architecture following OOP principles, keeping feature expansion cheap as the team added scope.",
    ],
    link: "https://github.com/CSC207-2022F-UofT/course-project-uofteams",
    category: "academic",
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);
export const INDEXED = PROJECTS.filter((p) => !p.featured);

/** Stable display number for a project, based on its position in PROJECTS. */
export const numberOf = (p: Project) =>
  String(PROJECTS.indexOf(p) + 1).padStart(2, "0");
