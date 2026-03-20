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

export const journalArticles = [
  {
    id: 1,
    title: "A Simple Habit for a Calmer Mind",
    date: "Mar 1, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    body: [
      "Mindfulness is more than just a technique; it's a way of being. In today's fast-paced world, finding moments of stillness can feel impossible, but it is precisely these moments that allow us to reconnect with our true selves.",
      "When we practice conscious breathing, we are not just taking in air. We are inviting calmness into our nervous system, signaling to our body that it is safe to relax. This simple act can have profound effects on our mental well-being and physical health.",
      "Start small. Just three focused breaths can reset your focus. Over time, these moments add up, creating a foundation of peace that you can carry with you throughout your day, no matter what challenges arise.",
      "The beauty of this habit lies in its simplicity. You don't need a quiet room, a yoga mat, or a scheduled block of time. You just need a moment — and the willingness to pause. Try it right now: breathe in for four counts, hold for four, and exhale for four. Notice how your shoulders drop, how your jaw unclenches, how the tension begins to melt away."
    ]
  },
  {
    id: 2,
    title: "How Conscious Breathing Can Reduce Stress",
    date: "Feb 18, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    body: [
      "Stress is the body's natural response to perceived threats — a survival mechanism that evolved over thousands of years. But in modern life, this mechanism is triggered not by predators, but by emails, deadlines, and social pressures. The result is a chronic state of low-level anxiety that quietly erodes our well-being.",
      "Conscious breathing is one of the most powerful and accessible tools we have to interrupt this cycle. When you breathe slowly and deliberately, you activate the parasympathetic nervous system — the body's 'rest and digest' mode — which directly counteracts the fight-or-flight response.",
      "Techniques like box breathing (inhale 4 counts, hold 4, exhale 4, hold 4) or the 4-7-8 method have been studied extensively and shown to lower cortisol levels, reduce heart rate, and improve mood within minutes. What makes these techniques remarkable is that they work regardless of your belief system, fitness level, or prior experience.",
      "The key is consistency. Even five minutes of intentional breathing each morning can rewire how your nervous system responds to stressors over time. Think of it as training your mind to return to calm — not as a retreat, but as a foundation from which you can engage with life more fully."
    ]
  },
  {
    id: 3,
    title: "Small Mindful Habits That Can Make a Big Difference",
    date: "Feb 12, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    body: [
      "We often think transformation requires grand gestures — a week-long retreat, a radical diet, or a complete lifestyle overhaul. But research in behavioral psychology consistently shows that small, consistent habits are the true engine of lasting change.",
      "Consider the 'habit stacking' approach: attaching a new mindful behavior to an existing routine. Brewing your morning coffee? That's two minutes of deep breathing. Walking to the mailbox? A chance to notice the sensation of your feet on the ground. Waiting for a meeting to start? A moment to check in with how you're feeling without judgment.",
      "These micro-practices don't demand time you don't have. They simply ask you to show up fully to the time you're already spending. Over weeks and months, the cumulative effect is profound — a quieter inner dialogue, a more stable mood, and a deeper sense of connection to the present moment.",
      "Start with just one habit this week. Choose something you already do every day and add a single mindful element to it. Notice what shifts. Small hinges swing big doors."
    ]
  },
  {
    id: 4,
    title: "Using Soft Bedtime Sounds to Help You Sleep",
    date: "Feb 5, 2025",
    readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
    body: [
      "Sleep is not a passive state — it's an active, restorative process that your brain actively participates in each night. Yet for millions of people, the transition from wakefulness to sleep is disrupted by a mind that simply refuses to quiet down.",
      "Soundscapes — from gentle rain and ocean waves to white noise and binaural beats — have emerged as a scientifically supported tool for improving sleep onset and quality. These sounds work by masking disruptive environmental noise and providing a consistent auditory backdrop that the brain associates with rest.",
      "Pink noise, in particular, has been shown in studies to deepen slow-wave sleep, the most restorative phase of the sleep cycle. Unlike white noise, which has equal energy across all frequencies, pink noise is weighted toward lower frequencies, creating a softer, more natural sound — similar to rainfall or a gentle stream.",
      "Building a pre-sleep ritual that includes 10–15 minutes of soft sound, combined with dimmed lights and a screen-free environment, can dramatically improve both the speed and quality of your sleep. Over time, these cues become signals your nervous system recognizes, making it easier to let go at the end of each day."
    ]
  },
  {
    id: 5,
    title: "The Power of Morning Silence",
    date: "Jan 28, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=800&auto=format&fit=crop",
    body: [
      "Most people begin their day by immediately reaching for their phone — scanning notifications, checking news, responding to messages. Within minutes, the mind is flooded with information, comparison, and urgency. The day has barely started, and you're already reactive.",
      "Morning silence offers a different path. Even 10 minutes of quiet — before the phone, before the news, before the first task — allows you to step into your day from a place of intention rather than reaction. You get to decide what kind of day you want to have, rather than having it decided for you.",
      "This practice doesn't require meditation experience. It can be as simple as sitting with your coffee and watching the light change, journaling a few sentences about how you feel, or taking a slow walk without headphones. The goal is not emptiness, but presence.",
      "Research shows that people who protect even small amounts of morning quiet time report higher levels of daily focus, emotional resilience, and creative thinking. Your mornings are the most precious real estate of your day. Guard them thoughtfully."
    ]
  },
  {
    id: 6,
    title: "A Guide to Mindful Walking in Nature",
    date: "Jan 20, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1447452030403-dc122b123282?q=80&w=800&auto=format&fit=crop",
    body: [
      "Walking is something most of us do every day without a second thought. But walking mindfully — with full attention to the experience of movement and the environment around you — is a practice with deep roots in contemplative traditions and a growing body of scientific research behind it.",
      "Nature, in particular, amplifies the benefits. Studies on 'forest bathing' (a translation of the Japanese concept Shinrin-yoku) have found that spending time among trees reduces cortisol levels, lowers blood pressure, boosts immune function, and elevates mood — even when the walks are short.",
      "To walk mindfully, begin by slowing down your pace slightly. Notice the physical sensation of your feet meeting the ground. Feel the movement of your arms, the rhythm of your breath. Then expand your awareness outward — sounds, smells, the play of light through leaves. When your mind wanders (and it will), gently return your attention to one of these sensory anchors.",
      "You don't need a forest. A park, a quiet street, even a rooftop with plants can serve as your sanctuary. The invitation is simply to leave the earbuds at home and show up as a witness to the world around you. Let nature remind you that you are part of something much larger, and much more beautiful, than the noise inside your head."
    ]
  }
];

export const COPY = {
  hero: {
    badge: "Trusted by 100 000+ users",
    title: "Silence the noise\nFind Your Peace",
    subtitle: "Short, simple meditations to help you reset, unwind, and feel present—whenever you need a break.",
    cta: "Get started"
  },
  features: {
    title: "Find your calm,\nAnytime, Anywhere",
    subtitle: "Whether you need a quick mental reset or a deep meditation session, Bloom helps you slow down, breathe, and feel at ease—whenever life gets overwhelming."
  },
  howItWorks: {
    title: "How it works",
    subtitle: "A few mindful moments can change your day. Bloom helps you reset, relax, and grow with ease."
  },
  testimonials: {
    title: "Hear it from our users"
  },
  journal: {
    title: "The Bloom Journal",
    subtitle: "Discover expert insights, mindful tips, and guided practices to help you find balance and inner peace—one breath at a time.",
    featuredTag: "Latest Article",
    featuredTitle: "A Simple Habit for a Calmer Mind",
    cta: "Read article",
    viewAll: "All articles"
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "If you can't find what you are looking for don't hesitate to contact us.",
    cta: "Contact us"
  },
  getStarted: {
    title: "Get started for free",
    subtitle: "Start your free 3-month subscription from the links below.",
    appleTag: "Download on the",
    appleName: "App Store",
    googleTag: "Download on the",
    googleName: "Google Play"
  }
};
