import bentoGraphic from '../assets/photos/1PfLTJoaw2wzQAGaOGvZnkn4fjQ.avif';
import bentoRoom from '../assets/photos/CHQPViNi7GH7Bta1TkaI7fuxYI.avif';
import bentoNook from '../assets/photos/t3zWrMla0x9XUTd93a1J7gqnAA.avif';
import bentoStudio from '../assets/photos/CzXwCDZwSuLbuZ6BDH1CWXvO1w.avif';
import bentoBeach from '../assets/photos/ThkMONZdDCZyHHxSF7fPrj1tJT4.avif';

export const testimonials = [
  { name: "Christina Matthews", text: "Bloom has completely transformed my daily routine. The guided meditations are exactly what I need to start my mornings with clarity and focus.", img: "Christina" },
  { name: "Sofia Marquez", text: "I've tried many meditation apps, but Bloom stands out with its personalized programs and calming design. It feels like it was made just for me.", img: "Sofia" },
  { name: "Stephanie Jackson", text: "The community feature makes me feel less isolated and motivated", img: "Stephanie", isImage: true },
  { name: "Samantha Vier", text: "The structure and the calmness of the app is something I haven't found anywhere else. It truly changed my perspective on daily mindfulness.", img: "Samantha" },
  { name: "James Wilson", text: "The sleep meditations are a game changer. I've never slept better in my entire life. Highly recommended for everyone!", img: "James" },
  { name: "Linda Chen", text: "Simple, elegant, and effective. Bloom focuses on what truly matters without any distractions. A masterpiece of design and function.", img: "Linda" }
];

export const faqs = [
  { q: "Is Bloom free to use?", a: "Bloom offers a free trial and some free content. Our premium features require a subscription to support our mindful community." },
  { q: "Do I need experience with meditation to use Bloom?", a: "Not at all! Bloom is designed for everyone, from beginners to experienced practitioners." },
  { q: "How long should I meditate?", a: "Even 5 minutes a day can make a difference. We offer sessions ranging from 3 to 30 minutes." },
  { q: "What kind of support do you offer?", a: "We provide 24/7 email support and a comprehensive help center for all our users." },
  { q: "How do I cancel my subscription?", a: "You can cancel anytime through your App Store or Play Store account settings." },
  { q: "Can I use Bloom offline?", a: "Yes, premium users can download their favorite sessions for offline listening." },
  { q: "How do I get this Framer Template?", a: "This is a custom built React application inspired by the Bloom template." }
];

export const features = [
  {
    title: "Remember your locations",
    desc: "Save your favorite meditation spots, whether it's your cozy reading nook, a quiet park, or a peaceful beach.",
    img: bentoStudio,
    imgMid: bentoNook,
    imgBack: bentoBeach,
    customLayout: 'location-stack'
  },
  {
    title: "Friendly community",
    desc: "Join a welcoming space where you can share progress, exchange experiences, and find encouragement.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    customLayout: 'contained'
  },
  {
    title: "Climb in leaderboards",
    desc: "Track your meditation streaks and climb the leaderboards. Earn milestones.",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    customLayout: 'contained'
  },
  {
    title: "Daily meditations tailored for you",
    desc: "Choose from structured programs designed for better sleep, stress relief, or focus. Each program evolves with your progress.",
    img: "https://images.unsplash.com/photo-1447452030403-dc122b123282?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Perzonalised programs",
    desc: "Save your favorite meditation spots, whether it's your cozy reading nook, a quiet park, or a peaceful beach.",
    img: bentoGraphic,
    imgBack: bentoRoom,
    customLayout: 'stack'
  },
  {
    title: "Guided Breathing",
    desc: "Master the art of breathwork with session-based breathing exercises for focus and stress relief.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    customLayout: 'contained'
  }
];

export const hiwSteps = [
  { title: "Choose How You Feel", desc: "Start by selecting your current mood—calm, stressed, or in need of focus. Bloom curates the perfect session for you." },
  { title: "Listen, Breathe, and Unwind", desc: "Whether it's a guided meditation, soothing soundscape, or deep breathing session. Bloom helps you find your balance." },
  { title: "Follow Your Progress", desc: "Build a mindfulness habit with personalized streaks, mood tracking, and insights to help you grow." }
];

export const pricingPlans = [
  { title: "Free", price: "$0", features: ["Limited library", "Basic tracking", "Community access"], cta: "Get Started" },
  { title: "Premium", price: "$9.99/mo", features: ["Full library", "Offline access", "Advanced programs", "Personalized coaching"], cta: "Try for free", highlighted: true },
  { title: "Lifetime", price: "$199", features: ["All premium features", "One-time payment", "Priority support", "Exclusive content"], cta: "One payment" }
];

export const journalArticles = [
  { 
    id: "1", 
    title: { tr: "Zihin ve Gökyüzü: Meditasyonun Gücü", en: "Mind and Sky: The Power of Meditation" }, 
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", 
    date: "2024-03-24",
    text: { tr: "Meditasyonun hayatınızdaki yeri...", en: "The role of meditation in your life..." }
  },
  { 
    id: "2", 
    title: { tr: "Astroloji ile İçsel Rehberlik", en: "Inner Guidance with Astrology" }, 
    img: "https://images.unsplash.com/photo-1447452030403-dc122b123282?q=80&w=800&auto=format&fit=crop", 
    date: "2024-03-23",
    text: { tr: "Yıldızların rehberliği...", en: "Guidance from the stars..." }
  }
];

// Minimal fallback content for when Sanity is not available
export const COPY = {
  hero: {
    badge: "Trusted by 100 000+ users",
    title: "Silence the noise\nFind Your Peace",
    subtitle: "Short, simple meditations to help you reset, unwind, and feel present.",
    cta: "Get started"
  },
  features: {
    title: "Find your calm,\nAnytime, Anywhere",
    subtitle: "Whether you need a quick mental reset or a deep meditation session."
  },
  howItWorks: {
    title: "How it works",
    subtitle: "A few mindful moments can change your day."
  },
  testimonials: {
    title: "Hear it from our users"
  },
  journal: {
    title: "The AstroMera Journal",
    subtitle: "Discover expert insights and mindful tips.",
    featuredTag: "Latest Article",
    cta: "Read article",
    viewAll: "All articles"
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "Contact us for more info.",
    cta: "Contact us"
  },
  getStarted: {
    title: "Get started for free",
    appleTag: "Download on the",
    appleName: "App Store",
    googleTag: "Get it on",
    googleName: "Google Play"
  }
};

