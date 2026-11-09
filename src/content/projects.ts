/**
 * Projects. Facts come from the CV (Waseem-Abbas-CV-Premium-Upload.pdf).
 * GreenScan has full details and real screenshots; the other projects only have
 * what the CV says. To add screenshots/links later, fill `images` / `links` below.
 */

// Only set a status when it is known; the CV gives one for GreenScan and Pawhug.
export type ProjectStatus = "Live on Google Play" | "Completed" | "In development";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status?: ProjectStatus;
  featured?: boolean;
  accent: string; // CSS color used for the card glow
  icon?: string; // app icon
  description: string;
  role: string;
  tech: string[];
  features?: { title: string; text: string }[];
  howItWorks?: { label: string; detail: string }[];
  facts?: { label: string; value: string }[];
  /** Promo/gallery images (case study gallery). */
  images: { src: string; alt: string }[];
  /** Raw in-app screens, shown inside phone mockups. */
  screens?: { src: string; alt: string }[];
  links?: { label: string; href: string }[];
  caseStudy?: {
    overview: string;
    need: string;
    solution: string;
  };
};

export const projects: Project[] = [
  {
    slug: "greenscan-plant-ai",
    name: "GreenScan Plant AI",
    tagline: "Know every plant. Help it thrive.",
    category: "AI mobile app",
    status: "Live on Google Play",
    featured: true,
    accent: "#34d399",
    icon: "/images/greenscan/icon.webp",
    description:
      "AI-powered plant identification and plant-care app. Point the camera at a plant to learn its name, spot problems early and get a clear care plan, with an AI botanist and reminders in the user's own language.",
    role: "Development & release: Flutter app, backend integration and Google Play publishing.",
    tech: ["Flutter", "Dart", "GetX", "Firebase Auth", "Node.js", "Express", "Vercel", "MongoDB Atlas", "Google Gemini", "PlantNet", "Perenual"],
    features: [
      { title: "Identify any plant", text: "Name, scientific name, family and care basics from one photo." },
      { title: "AI plant doctor", text: "Finds likely disease, pests or stress, rates severity and gives a step-by-step plan." },
      { title: "Day-by-day recovery", text: "Each diagnosis becomes a case with a daily plan, recheck reminders and a timeline." },
      { title: "Ask Botanist (AI chat)", text: "Type or talk hands-free about watering, light, pests or yellow leaves." },
      { title: "Your whole garden", text: "Every plant with photos, notes and groups, plus scan history and wishlist." },
      { title: "Care reminders", text: "Water, mist, feed, rotate and prune on a schedule made for each plant." },
      { title: "Expert guides", text: "Plant types, care tips, DIY fixes and a leaf-trouble library." },
      { title: "Built for everyone", text: "Five languages with right-to-left support, light and dark modes and colour themes." },
    ],
    howItWorks: [
      { label: "Flutter App", detail: "GetX state & routing, local store for garden and reminders" },
      { label: "Express API", detail: "Node.js on Vercel, /api/v1, verifies Firebase ID token" },
      { label: "MongoDB Atlas", detail: "Garden, chats, photos" },
      { label: "Google Gemini", detail: "Health, chat, translate" },
      { label: "PlantNet", detail: "Plant identification" },
      { label: "Perenual", detail: "Care data" },
    ],
    facts: [
      { label: "Platform", value: "Android 7.0+" },
      { label: "Languages", value: "5, incl. RTL" },
      { label: "Themes", value: "Light / Dark + 3 colours" },
      { label: "Sign-in", value: "Google or email" },
      { label: "My role", value: "Development & release" },
    ],
    images: [
      { src: "/images/greenscan/01_identify.webp", alt: "GreenScan identifying a plant from a photo" },
      { src: "/images/greenscan/02_plant_doctor.webp", alt: "GreenScan AI plant doctor diagnosis screen" },
      { src: "/images/greenscan/03_ask_botanist.webp", alt: "GreenScan Ask Botanist AI chat screen" },
      { src: "/images/greenscan/04_languages.webp", alt: "GreenScan available in five languages" },
      { src: "/images/greenscan/05_my_garden.webp", alt: "GreenScan My Garden screen" },
      { src: "/images/greenscan/06_reminders.webp", alt: "GreenScan plant care reminders" },
      { src: "/images/greenscan/07_plant_library.webp", alt: "GreenScan plant library and expert guides" },
      { src: "/images/greenscan/08_daily_helper.webp", alt: "GreenScan daily plant care helper" },
    ],
    screens: [
      { src: "/images/greenscan/screens/result.webp", alt: "Plant identification result screen" },
      { src: "/images/greenscan/screens/health.webp", alt: "Plant health diagnosis screen" },
      { src: "/images/greenscan/screens/home_top.webp", alt: "GreenScan home screen with weather and tasks" },
      { src: "/images/greenscan/screens/chat_answer.webp", alt: "AI botanist chat answer" },
      { src: "/images/greenscan/screens/water_full.webp", alt: "Water meter and watering schedule" },
      { src: "/images/greenscan/screens/lang_ur.webp", alt: "App in Urdu with right-to-left layout" },
    ],
    links: [
      { label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.aiplantapp.ai_plant_app" },
      { label: "Visit website", href: "https://greenscanplant.vercel.app" },
    ],
    caseStudy: {
      overview:
        "GreenScan Plant AI is a mobile app that identifies plants from a photo, diagnoses plant health problems and helps people care for their plants, in their own language.",
      need:
        "Plant owners often don't know what plant they have, why its leaves are turning yellow or spotted, or when to water and feed it, and most help online is in English only.",
      solution:
        "One app that combines plant identification, an AI plant doctor with a step-by-step recovery plan, an AI botanist chat, care reminders and expert guides, in five languages with right-to-left support.",
    },
  },
  {
    slug: "ai-plantapp",
    name: "AI PlantApp",
    tagline: "Plant identification and plant care.",
    category: "AI mobile app",
    accent: "#38bdf8",
    description: "Plant identification and plant-care mobile app.",
    role: "Flutter mobile development.",
    tech: ["Flutter", "Dart", "AI API Integration"],
    images: [],
  },
  {
    slug: "garden-recall",
    name: "Garden Recall",
    tagline: "Talk to your garden. It remembers.",
    category: "AI mobile app",
    accent: "#4caf50",
    description:
      "Plant-care and garden management app. Speak or type a quick note about your garden; the app turns it into an AI summary, detects plants and tasks, and builds a daily garden brief with local weather, priorities and seasonal ideas.",
    role: "Flutter mobile development.",
    tech: ["Flutter", "Dart", "AI API Integration"],
    features: [
      { title: "Voice garden notes", text: "Speak or type about your garden; no forms to fill." },
      { title: "AI garden insight", text: "Each note becomes a summary with detected plants and tasks." },
      { title: "Daily garden brief", text: "Local weather and conditions with advice for the day." },
      { title: "Tasks with priority", text: "Open and completed tasks with due dates and priority." },
      { title: "Seasonal ideas", text: "Seasonal care ideas you can add straight to your tasks." },
      { title: "Ask my garden", text: "Ask questions about your own garden from the app." },
    ],
    images: [
      { src: "/images/garden-recall/promo/01_home_brief.webp", alt: "Garden Recall: your garden brief" },
      { src: "/images/garden-recall/promo/02_voice_setup.webp", alt: "Garden Recall: tell us about your garden" },
      { src: "/images/garden-recall/promo/03_seasonal_idea.webp", alt: "Garden Recall: seasonal ideas" },
      { src: "/images/garden-recall/promo/04_tasks.webp", alt: "Garden Recall: tasks" },
      { src: "/images/garden-recall/promo/05_insight.webp", alt: "Garden Recall: garden insight" },
    ],
    screens: [
      { src: "/images/garden-recall/01_home_brief.webp", alt: "Garden Recall daily garden brief screen" },
      { src: "/images/garden-recall/02_voice_setup.webp", alt: "Garden Recall voice note setup screen" },
      { src: "/images/garden-recall/03_seasonal_idea.webp", alt: "Garden Recall seasonal idea screen" },
    ],
  },
  {
    slug: "telehealth-app",
    name: "Telehealth App",
    tagline: "Book visits, see your records, talk to your doctor.",
    category: "Healthcare mobile app",
    accent: "#22b8c8",
    description:
      "Healthcare application for patients: virtual doctor appointments with a calendar and schedule, plus medications, tests, vital signs, a health summary and messages in one home screen.",
    role: "Flutter mobile development.",
    tech: ["Flutter", "Dart"],
    features: [
      { title: "Virtual appointments", text: "See upcoming virtual doctor visits with time and doctor." },
      { title: "Appointment calendar", text: "Monthly calendar with today's events and scheduling." },
      { title: "Medications & tests", text: "Medications, tests and insurance from the home screen." },
      { title: "Vital signs & summary", text: "Vital signs and a health summary in one place." },
      { title: "Contacts & messages", text: "Reach contacts and read messages from the app." },
      { title: "Online health record", text: "A platform for the patient's online health record." },
    ],
    images: [
      { src: "/images/telehealth/promo/01_home.webp", alt: "Telehealth home screen" },
      { src: "/images/telehealth/promo/02_appointments.webp", alt: "Telehealth appointments calendar" },
      { src: "/images/telehealth/promo/03_welcome.webp", alt: "Telehealth welcome screen" },
    ],
    screens: [
      { src: "/images/telehealth/01_home.webp", alt: "Telehealth home screen with appointments and health tools" },
      { src: "/images/telehealth/03_welcome.webp", alt: "Telehealth welcome screen" },
      { src: "/images/telehealth/02_appointments.webp", alt: "Telehealth appointments calendar" },
    ],
  },
  {
    slug: "pawhug",
    name: "Pawhug",
    tagline: "AI care for your dog or cat.",
    category: "AI mobile app",
    status: "Completed",
    accent: "#f08a24",
    icon: "/images/pawhug/icon.webp",
    description:
      "Pet-care mobile application. One profile per pet, a daily check-in and care score, reminders for vaccines and medicines, and an AI symptom check with friendly guides, Luna and Bella.",
    role: "Flutter mobile development.",
    tech: ["Flutter", "Dart", "AI API Integration"],
    features: [
      { title: "Pet profiles", text: "One profile per pet with breed, age, weight and records." },
      { title: "Daily check-in", text: "A quick check-in and a care score for each pet." },
      { title: "Care reminders", text: "Vaccine dates, medicines and daily care in one list." },
      { title: "AI symptom check", text: "Pick symptoms and get AI guidance, with urgent-sign warnings." },
      { title: "Breed guide", text: "Find which dog or cat breed fits your home." },
      { title: "Emergency & ID card", text: "Emergency help and a pet ID card from the profile." },
    ],
    images: [
      { src: "/images/pawhug/promo/04_home.webp", alt: "Pawhug home: your pet's day at a glance" },
      { src: "/images/pawhug/promo/03_pet_profile.webp", alt: "Pawhug pet profile" },
      { src: "/images/pawhug/promo/02_symptom_check.webp", alt: "Pawhug AI symptom check" },
      { src: "/images/pawhug/promo/01_breed_guide.webp", alt: "Pawhug breed guide" },
      { src: "/images/pawhug/promo/05_welcome.webp", alt: "Pawhug welcome screen" },
    ],
    screens: [
      { src: "/images/pawhug/new_home.webp", alt: "Pawhug home: your pet's day" },
      { src: "/images/pawhug/new_pet_profile.webp", alt: "Pawhug pet profile screen" },
      { src: "/images/pawhug/new_symptom_check.webp", alt: "Pawhug symptom check with Luna" },
    ],
  },
  {
    slug: "commendo-app",
    name: "Commendo App",
    tagline: "Mobile application.",
    category: "Mobile",
    accent: "#22d3ee",
    description: "Mobile application development.",
    role: "Flutter mobile development.",
    tech: ["Flutter", "Dart"],
    images: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Only apps with real screens get a full case-study page. */
export const hasCaseStudy = (p: Project) => (p.screens?.length ?? 0) >= 3;
export const caseStudies = projects.filter(hasCaseStudy);
