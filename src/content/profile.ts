/**
 * All personal content lives here. Source of truth: Waseem-Abbas-CV-Premium-Upload.pdf.
 * Edit this file to update the website; no component changes needed.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waseem-abbas-flutter.vercel.app";

export const profile = {
  name: "Waseem Abbas",
  title: "Flutter Developer",
  roles: "Flutter Developer · Mobile App Developer · AI Integration Specialist",
  heroCopy:
    "I build thoughtful mobile experiences, connect applications to reliable backend services, and integrate AI-powered features into practical products.",
  location: "Faisalabad, Pakistan",
  availability: "Available for remote opportunities",
  email: "waseemdevcompany@gmail.com",
  phone: "+92 303 5317884",
  whatsapp: "https://wa.me/923035317884",
  github: "https://github.com/waseem-Abbas58",
  linkedin: "https://www.linkedin.com/in/waseem-abbas-flutter",
  photo: "/images/waseem.webp", // transparent cut-out of the owner's real photo
  photoSquare: "/images/waseem-square.webp",
  cv: {
    premium: "/cv/Waseem-Abbas-CV.pdf",
    ats: "/cv/Waseem-Abbas-CV-ATS.pdf",
  },
  summary:
    "Flutter developer with 3+ years of freelance experience building cross-platform Android and iOS applications. I turn Figma designs into responsive Flutter UIs, connect apps to Firebase, Supabase and Node.js backends through REST APIs, and ship AI-powered features. Comfortable owning the full cycle, from development and testing to Google Play Store release.",
};

export const about = {
  paragraphs: [
    "I'm a Flutter developer from Faisalabad, Pakistan, and for the last 3+ years I've been building Android and iOS apps for clients as a freelancer.",
    "Most of my work starts with a Figma design and ends with an app in someone's hands. In between, I build the Flutter UI, structure the app with GetX, connect it to Firebase, Supabase or a Node.js and Express backend through REST APIs, and add AI features through AI API integration.",
    "I also handle the parts that make an app ready for real users: testing, debugging, performance improvements and preparing the release for the Google Play Store.",
  ],
  highlights: [
    { label: "Freelance experience", value: "3+ years" },
    { label: "Platforms", value: "Android & iOS" },
    { label: "Education", value: "BS Computer Science" },
    { label: "Work mode", value: "Remote" },
  ],
};

export type SkillGroup = { title: string; icon: string; items: { name: string; logo?: string }[] };

const si = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/${slug}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile Development",
    icon: "smartphone",
    items: [
      { name: "Flutter", logo: si("flutter") },
      { name: "Dart", logo: si("dart") },
      { name: "Android", logo: si("android") },
      { name: "iOS", logo: si("apple") },
      { name: "FlutterFlow", logo: si("flutter") },
      { name: "GetX" },
    ],
  },
  {
    title: "Backend & Cloud",
    icon: "server",
    items: [
      { name: "Firebase Auth", logo: si("firebase") },
      { name: "FCM", logo: si("firebase") },
      { name: "Crashlytics", logo: si("firebase") },
      { name: "Supabase", logo: si("supabase") },
      { name: "Node.js", logo: si("nodedotjs") },
      { name: "Express", logo: si("express") },
      { name: "MongoDB", logo: si("mongodb") },
      { name: "REST APIs" },
    ],
  },
  { title: "AI Integration", icon: "sparkles", items: [{ name: "AI API Integration", logo: si("googlegemini") }] },
  {
    title: "Development Workflow",
    icon: "git",
    items: [
      { name: "Git", logo: si("git") },
      { name: "GitHub", logo: si("github") },
      { name: "Testing" },
      { name: "Debugging" },
      { name: "Performance Optimization" },
    ],
  },
  { title: "Design Implementation", icon: "figma", items: [{ name: "Figma to Flutter UI", logo: si("figma") }, { name: "Responsive UI" }] },
  { title: "App Deployment", icon: "rocket", items: [{ name: "Google Play Store Publishing", logo: si("googleplay") }] },
];

export const services = [
  { title: "Flutter App Development", icon: "smartphone", text: "One codebase, two platforms. I build your app in Flutter so it runs on Android and iOS without paying for two separate builds." },
  { title: "Figma to Flutter UI", icon: "figma", text: "You have the designs; I turn them into clean, responsive Flutter screens that match the Figma file on real devices." },
  { title: "Firebase Integration", icon: "flame", text: "Sign-in with Firebase Authentication, push notifications with FCM and crash reports with Crashlytics, wired in properly." },
  { title: "REST API & Backend Integration", icon: "server", text: "I connect the app to your backend, or build one with Node.js, Express and MongoDB, through clean REST APIs. Supabase too." },
  { title: "AI API Integration", icon: "sparkles", text: "Add useful AI to your app, such as image recognition, chat assistants or translation, through AI API integration." },
  { title: "Bug Fixing & Debugging", icon: "bug", text: "App crashing, slow or behaving strangely? I find the cause, fix it and improve performance where it matters." },
  { title: "Testing & Play Store Release", icon: "rocket", text: "I test the app, prepare the release build and listing, and publish it on the Google Play Store." },
];

export const experience = [
  {
    role: "Freelance Flutter / Mobile App Developer",
    org: "Self-employed, remote",
    period: "3+ years",
    points: [
      "Developed mobile applications in Flutter for Android and iOS.",
      "Built app UIs and integrated REST APIs and backend services.",
      "Integrated Firebase Authentication, Cloud Messaging and Crashlytics, plus other backends.",
      "Developed AI-powered application features through AI API integration.",
      "Handled testing, debugging and performance improvements.",
      "Prepared and published Android applications on the Google Play Store.",
    ],
  },
];

export const education = [{ degree: "BS Computer Science", org: "GC University Faisalabad", period: "2022 – 2026" }];

export const languages = [
  { name: "Urdu", level: "Native" },
  { name: "Punjabi", level: "Native" },
  { name: "English", level: "Fluent" },
];

/** Figures and review text as shown on the Fiverr account. Keep the text word for word. */
export const fiverr = {
  profile: "https://www.fiverr.com/waseemdev84",
  rating: "5.0",
  reviews: 14,
  orders: 20,
};

export const reviews: { text: string; client: string; country: string; flag: string; photo?: string }[] = [
  {
    text: "Incredible experience! My app was loaded with bugs, and I expected it to take days to fix. To my surprise, it was completely bug-free in just 5 hours. Exceptional skills, outstanding communication, and professionalism throughout. Highly recommend and can’t wait to collaborate again for future features! 🔥💪",
    client: "joy_tevlin",
    country: "United States",
    flag: "us",
  },
  {
    text: "Waseem Abbas is a great developer! I highly recommend them for quick and high-quality work. They went above and beyond with smooth and efficient service. The developer was fast, easy to communicate with, and made sure I was completely satisfied with the results. I really appreciate the excellent work and am very happy with the outcome!",
    client: "arooklynclarkle",
    country: "United Kingdom",
    flag: "gb",
  },
  {
    text: "Waseem Abbas delivered a top-notch mobile app free of bugs and with remarkable attention to detail. His profound understanding and FLUENCY in communication made working with him an absolute pleasure. With professionalism and proactive interaction, he truly deserves a round of applause! 👏",
    client: "sathyasai642",
    country: "India",
    flag: "in",
    photo: "/images/clients/sathyasai642.webp",
  },
  {
    text: "exceptional seller, competent, understood requirements better than me and received a delivery better than what i ordered. will definitely order again. and he is very strict in meeting your deadline",
    client: "jizy10",
    country: "Ethiopia",
    flag: "et",
    photo: "/images/clients/jizy10.webp",
  },
  {
    text: "I love Waseem's communication skills; he paid attention to detail and carried out the project with perfection. Highly recommended 10 stars and more.",
    client: "lornac177",
    country: "United Kingdom",
    flag: "gb",
    photo: "/images/clients/lornac177.webp",
  },
  {
    text: "Always a pleasure to work with Waseem and the team. Very good communication and attentive to details.",
    client: "bibte00",
    country: "Canada",
    flag: "ca",
  },
];
