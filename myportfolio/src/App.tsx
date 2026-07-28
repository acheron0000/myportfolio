import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  Menu, X, Sparkles, Mail, Linkedin, Instagram, Globe, ChevronDown, ArrowUp,
  Send, Code, Cpu, Terminal, Lightbulb, Users, PenTool, Monitor, Figma, Palette, Eye, MousePointer,
  BookOpen, Headphones, Utensils, GraduationCap, Award, FileText, MapPin
} from 'lucide-react';

/* ============================================================
   SAHIL S K — PORTFOLIO
   Masters in Design (UI/UX) — RV University, Bangalore
   Colors: #0a1517 #17252A #287A78 #3AAFA9 #DEF2F1 #FEFFFF
   ============================================================ */

const NAME = "Sahil S K";
const EMAIL = "sahilsk29xyz@gmail.com";
const RV_EMAIL = "sahilskmdesign25@rvu.edu.in";
const LINKEDIN = "https://www.linkedin.com/in/sahil-s-k-3b7043229/";
const LOCATION = "Bangalore, India";
const COURSE = "Masters in Design — UI/UX";
const UNIVERSITY = "RV University";
const COURSE_YEARS = "2025 — 2027";
const UNDERGRAD = "BSc Animation & VFX";

/* Project Images — place these folders in your public/ directory */
const CURIXA_IMGS = Array.from({ length: 12 }, (_, i) => `/images/curixa/curixa-${i + 1}.jpg`);
const AURISYNC_IMGS = Array.from({ length: 5 }, (_, i) => `/images/aurisync/aurisync-${i + 1}.jpg`);
const COOKIT_IMGS = Array.from({ length: 9 }, (_, i) => `/images/cookit/cookit-${i + 1}.jpg`);

const HERO_VIDEOS = [
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4', label: 'Golden Hour' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4', label: 'Still Water' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4', label: 'Deep Woods' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4', label: 'Quiet Dawn' },
];

/* ============================================================
   3D Tilt Hook
   ============================================================ */
function use3DTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { damping: 25, stiffness: 300 });
  const springY = useSpring(rotateY, { damping: 25, stiffness: 300 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${springX}deg) rotateY(${springY}deg)`;
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set((e.clientX - cx) / 20);
    rotateX.set(-(e.clientY - cy) / 20);
  }, [rotateX, rotateY, ref]);
  const handleMouseLeave = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);
  return { transform, handleMouseMove, handleMouseLeave };
}

/* ============================================================
   STICKY NAVBAR
   ============================================================ */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navLinks = ['About', 'Projects', 'Process', 'Explorations', 'Skills', 'Contact'];
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'liquid-glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-tight text-[#FEFFFF]/90 hover:text-[#FEFFFF] transition-colors">
            
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="px-4 py-2 text-sm text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors rounded-full hover:bg-white/5">
                {link}
              </a>
            ))}
            <a href={`mailto:${EMAIL}`} className="ml-4 px-5 py-2.5 text-sm bg-[#3AAFA9] text-[#0a1517] rounded-full hover:bg-[#3AAFA9]/90 transition-colors font-semibold">
              Get in Touch
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden liquid-glass rounded-full p-2.5 w-10 h-10 flex items-center justify-center">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-[99] bg-[#0a1517]/98 backdrop-blur-xl pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="text-3xl font-serif text-[#DEF2F1]/80 hover:text-[#FEFFFF] py-4 border-b border-white/5 transition-colors">
                {link}
              </motion.a>
            ))}
            <a href={`mailto:${EMAIL}`} onClick={() => setMenuOpen(false)}
              className="mt-6 w-full text-center px-6 py-4 bg-[#3AAFA9] text-[#0a1517] rounded-full font-semibold text-lg">
              Get in Touch
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
};

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#287A78] to-[#3AAFA9] z-[101] origin-left shadow-[0_0_10px_rgba(58,175,169,0.5)]" style={{ scaleX }} />;
};

/* ============================================================
   BACK TO TOP
   ============================================================ */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 liquid-glass rounded-full flex items-center justify-center cursor-pointer shadow-lg"
      title="Back to Top">
      <ArrowUp className="w-5 h-5 text-[#3AAFA9]" />
    </motion.button>
  );
};

/* ============================================================
   SECTION WRAPPER
   ============================================================ */
const Section = ({ children, className = '', id, meshClass }: { children: React.ReactNode; className?: string; id?: string; meshClass: string }) => (
  <section id={id} className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 lg:py-36 overflow-hidden scroll-mt-28 ${meshClass} ${className}`}>
    <div className="orb orb-1" />
    <div className="orb orb-2" />
    <div className="section-content w-full max-w-6xl mx-auto">{children}</div>
  </section>
);

/* ============================================================
   3D CARD
   ============================================================ */
const Card3D = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { transform, handleMouseMove, handleMouseLeave } = use3DTilt(ref);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60, rotateX: 15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{ transform }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`perspective-container ${className}`}>
      <div className="card-3d liquid-glass rounded-2xl p-8">
        <div className="card-3d-content">{children}</div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   HERO — Video Background KEPT
   ============================================================ */
const Hero = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [email, setEmail] = useState('');

  const handleVideoSwitch = (idx: number) => {
    if (idx === activeVideo || isTransitioning) return;
    setIsTransitioning(true); setActiveVideo(idx);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleGetAccess = () => {
    if (!email.trim()) return;
    const subject = encodeURIComponent('Early Access Request — Portfolio');
    const body = encodeURIComponent(`Hi Sahil,\n\nI would like to get early access. My email: ${email}\n\nBest regards`);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a1517]">
      {HERO_VIDEOS.map((v, i) => (
        <video key={i} autoPlay muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover video-crossfade ${i === activeVideo ? 'opacity-100' : 'opacity-0'}`}
          src={v.url} />
      ))}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a1517]/50 via-transparent to-[#0a1517]/70 pointer-events-none" />
      <div className="relative z-[2] flex flex-col h-full px-6 sm:px-12">
        <div className="flex-1 flex flex-col items-center justify-center text-center pt-12 md:pt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass rounded-full px-6 py-2.5 mb-10 inline-flex items-center gap-2 text-sm text-[#DEF2F1]">
            <Sparkles className="w-4 h-4 text-[#3AAFA9]" />
            <span>{COURSE} — {UNIVERSITY}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.08] max-w-4xl mb-8 text-[#FEFFFF] text-glow-strong">
            Designing the<br />
            <span className="italic text-[#3AAFA9]">Future</span> of Digital<br />
            Experiences
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl leading-relaxed mb-12 text-[#DEF2F1]/75 text-base sm:text-lg">
            A Master's student in UI/UX Design at RV University, crafting intuitive interfaces,
            design systems, and human-centred product strategies that bridge aesthetics with functionality.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="w-full max-w-md">
            <div className="liquid-glass rounded-full p-1.5 flex items-center gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGetAccess()}
                placeholder="Your Best Email"
                className="flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-[#DEF2F1]/35 text-[#FEFFFF] min-w-0" />
              <button onClick={handleGetAccess} className="px-5 py-3 bg-[#3AAFA9] text-[#0a1517] text-sm font-semibold rounded-full hover:bg-[#3AAFA9]/90 transition-colors whitespace-nowrap flex items-center gap-2">
                <Send className="w-3.5 h-3.5" /> Get Early Access
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex gap-6 mt-14">
            {HERO_VIDEOS.map((v, i) => (
              <button key={i} onClick={() => handleVideoSwitch(i)}
                className={`text-sm font-sans transition-all duration-500 pb-1 border-b-2 ${i === activeVideo ? 'border-[#3AAFA9] text-[#FEFFFF] opacity-100' : 'border-transparent text-[#DEF2F1] opacity-50 hover:opacity-80'}`}>
                {v.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="pb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#DEF2F1]/55 text-xs sm:text-sm font-sans">
          {['Masters UI/UX', UNIVERSITY, LOCATION, COURSE_YEARS].map((stat, i) => (
            <React.Fragment key={stat}>
              <span>{stat}</span>
              {i < 3 && <span className="hidden sm:inline text-[#3AAFA9]/40">|</span>}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   ABOUT
   ============================================================ */
const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const skills = [
    { icon: Monitor, label: "Interface Design" },
    { icon: PenTool, label: "Design Systems" },
    { icon: Eye, label: "User Research" },
    { icon: MousePointer, label: "Interaction Design" },
    { icon: Figma, label: "Prototyping" },
    { icon: Palette, label: "Visual Identity" },
  ];

  return (
    <Section id="about" meshClass="bg-mesh">
      <div ref={ref} className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
        <motion.div style={{ y: imageY }} className="relative">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden liquid-glass-dark">
            <img src="/images/sahilphoto.jpg" alt="Sahil S K"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
          </div>
          <motion.div whileHover={{ scale: 1.05, rotate: 5 }}
            className="absolute -bottom-8 -right-8 w-36 h-36 liquid-glass rounded-2xl flex items-center justify-center">
            <span className="font-serif text-4xl italic text-[#3AAFA9]/70">UI/UX</span>
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-3 text-[#FEFFFF] text-glow">About Me</h2>
            <p className="text-[#3AAFA9] text-sm uppercase tracking-[0.2em] font-medium">{COURSE} — {UNIVERSITY}</p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#3AAFA9] to-transparent mt-5" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-[#DEF2F1]/80 leading-[1.8] text-lg">
            I am <span className="text-[#FEFFFF] font-medium">{NAME}</span>, a Master's student in UI/UX Design at {UNIVERSITY}, driven by an insatiable curiosity
            for how humans interact with technology. With a foundation in <span className="text-[#3AAFA9]">{UNDERGRAD}</span>, my practice sits at the intersection of visual
            aesthetics, cognitive psychology, and systems thinking.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="text-[#DEF2F1]/70 leading-[1.8]">
            I approach every project as an opportunity to bridge the gap between user needs and business objectives. 
            I believe exceptional design is invisible — it simply works. My background in animation and VFX gives me a unique 
            lens on motion, storytelling, and visual communication.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
            {skills.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 text-[#DEF2F1]/70">
                <div className="w-8 h-8 rounded-lg bg-[#3AAFA9]/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#3AAFA9]" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="pt-6 border-t border-[#3AAFA9]/10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#DEF2F1]/50">
              <span className="text-[#FEFFFF]/80 font-medium">{UNIVERSITY}</span>
              <span className="w-1 h-1 rounded-full bg-[#3AAFA9]/40" />
              <span>{COURSE}</span>
              <span className="w-1 h-1 rounded-full bg-[#3AAFA9]/40" />
              <span>{COURSE_YEARS}</span>
              <span className="w-1 h-1 rounded-full bg-[#3AAFA9]/40" />
              <span>{UNDERGRAD}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

/* ============================================================
   PROJECTS DATA
   ============================================================ */
interface Project {
  id: number; title: string; category: string; icon: React.ElementType;
  problem: string; role: string; outcome: string;
  images: string[]; processImages: string[];
}

const projects: Project[] = [
  {
    id: 1, title: 'CookIT', category: 'Mobile App Design', icon: Utensils,
    problem: 'Deciding "what to eat" has become a stressful daily chore. Between busy schedules, limited ingredients, and specific health needs, many people feel too overwhelmed to cook authentic, nutritious meals.',
    role: 'UI/UX Designer — User Application (Team of 2). Designed the complete user-facing application from scratch: research, user personas, journey mapping, information architecture, and all user-side screens.',
    outcome: 'Good Hierarchy with decent Interactive visuals. Streamlined onboarding and personalised meal planning flow.',
    images: [COOKIT_IMGS[4], COOKIT_IMGS[2], COOKIT_IMGS[3]],
    processImages: [COOKIT_IMGS[0], COOKIT_IMGS[6], COOKIT_IMGS[7]]
  },
  {
    id: 2, title: 'AuriSync', category: 'Desktop Audio App', icon: Headphones,
    problem: 'Everyday listeners use audio on multiple devices and in many environments, but existing software forces them to understand complex EQ, balance, and profile settings before they can enjoy consistent sound.',
    role: 'Solo UI/UX Designer. Complete design process from research to high-fidelity UI: card sorting research, information architecture, user flows, wireframing, and final visual design.',
    outcome: 'A two-mode desktop audio app with auto-detection, device-first navigation, and progressive EQ control for everyday users.',
    images: [AURISYNC_IMGS[0], AURISYNC_IMGS[3], AURISYNC_IMGS[4]],
    processImages: [AURISYNC_IMGS[1], AURISYNC_IMGS[2]]
  },
  {
    id: 3, title: 'Curixa', category: 'AI Learning Platform', icon: BookOpen,
    problem: 'Young learners relying on YouTube for skill development experience fragmented and inconsistent learning journeys due to distraction-driven recommendations and lack of structured continuity.',
    role: 'Concept Lead, Researcher & UX Strategist (Team of 3). Originated the core product idea and led the design strategy.',
    outcome: 'A finite content consumption platform with AI-curated learning playlists, goal-aligned session structure, and conscious completion states — designed to replace passive infinite scrolling.',
    images: [CURIXA_IMGS[0], CURIXA_IMGS[5], CURIXA_IMGS[8]],
    processImages: [CURIXA_IMGS[1], CURIXA_IMGS[2], CURIXA_IMGS[3]]
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { transform, handleMouseMove, handleMouseLeave } = use3DTilt(cardRef);

  return (
    <motion.div ref={cardRef} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      style={{ transform }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="perspective-container w-full">
      <div className="card-3d liquid-glass rounded-3xl overflow-hidden group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1517]/90 via-[#0a1517]/30 to-transparent" />
          <div className="absolute top-6 left-6">
            <div className="w-10 h-10 rounded-xl bg-[#3AAFA9]/20 backdrop-blur-md flex items-center justify-center mb-3">
              <project.icon className="w-5 h-5 text-[#3AAFA9]" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] mb-3 block font-medium">{project.category}</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FEFFFF] text-glow">{project.title}</h3>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="text-[#3AAFA9] text-xs uppercase tracking-wider block mb-2 font-semibold">Problem</span>
              <p className="text-[#DEF2F1]/75 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <span className="text-[#3AAFA9] text-xs uppercase tracking-wider block mb-2 font-semibold">My Role</span>
              <p className="text-[#DEF2F1]/75 leading-relaxed">{project.role}</p>
            </div>
            <div>
              <span className="text-[#3AAFA9] text-xs uppercase tracking-wider block mb-2 font-semibold">Outcome</span>
              <p className="text-[#DEF2F1]/75 leading-relaxed">{project.outcome}</p>
            </div>
          </div>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.4 }} className="overflow-hidden">
              <div className="pt-8 border-t border-[#3AAFA9]/10 space-y-8">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-4">Process Screens</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.processImages.map((img, i) => (
                      <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden liquid-glass-dark">
                        <img src={img} alt={`${project.title} Process ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-4">Final Screens</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {project.images.slice(1).map((img, i) => (
                      <div key={i} className="flex-shrink-0 w-64 md:w-80 aspect-[4/3] rounded-xl overflow-hidden liquid-glass-dark">
                        <img src={img} alt={`${project.title} Final ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <button className="flex items-center gap-2 text-sm text-[#DEF2F1]/60 hover:text-[#3AAFA9] transition-colors font-medium">
            {isExpanded ? 'Show Less' : 'View Case Study'}
            <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
              <ChevronDown className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <Section id="projects" meshClass="bg-mesh-warm">
    <div className="relative z-10 max-w-5xl w-full">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-5 text-[#FEFFFF] text-glow">Selected Works</h2>
        <p className="text-[#DEF2F1]/60 max-w-lg mx-auto text-lg">A curated collection of projects spanning interface design, systems, and AI-powered platforms.</p>
      </motion.div>
      <div className="space-y-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </Section>
);

/* ============================================================
   DESIGN PROCESS
   ============================================================ */
interface ProcessStepData { title: string; desc: string; }
const processSteps: ProcessStepData[] = [
  { title: 'Discover', desc: 'User interviews, competitive audits, and stakeholder alignment to uncover genuine needs and behavioural patterns.' },
  { title: 'Define', desc: 'Synthesising insights into problem statements, user journeys, and strategic design briefs that guide every decision.' },
  { title: 'Ideate', desc: 'Rapid sketching, wireframing, and collaborative workshops to explore diverse solutions and interaction models.' },
  { title: 'Prototype', desc: 'High-fidelity interactive prototypes with realistic data, motion, and micro-interactions for stakeholder validation.' },
  { title: 'Test', desc: 'Usability testing, heuristic evaluation, card sorting, and iterative refinement based on behavioural data.' },
];

const ProcessStep = ({ step, index }: { step: ProcessStepData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const stepIcons = [
    <Globe key="0" className="w-6 h-6 text-[#3AAFA9]" />,
    <Lightbulb key="1" className="w-6 h-6 text-[#3AAFA9]" />,
    <Code key="2" className="w-6 h-6 text-[#3AAFA9]" />,
    <Cpu key="3" className="w-6 h-6 text-[#3AAFA9]" />,
    <Terminal key="4" className="w-6 h-6 text-[#3AAFA9]" />,
  ];
  return (
    <motion.div ref={ref} style={{ scale, opacity }} className="flex items-start gap-6">
      <div className="flex flex-col items-center">
        <motion.div className="w-14 h-14 liquid-glass rounded-2xl flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
          {stepIcons[index]}
        </motion.div>
        {index < 4 && <div className="w-px h-24 bg-gradient-to-b from-[#3AAFA9]/30 to-transparent mt-3" />}
      </div>
      <div className="pb-14">
        <h3 className="font-serif text-2xl mb-3 text-[#FEFFFF] text-glow">{step.title}</h3>
        <p className="text-[#DEF2F1]/65 leading-relaxed max-w-md text-[15px]">{step.desc}</p>
      </div>
    </motion.div>
  );
};

const DesignProcess = () => (
  <Section id="process" meshClass="bg-mesh-cool">
    <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div className="space-y-8">
        <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} 
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#FEFFFF] text-glow leading-tight">
          My Design<br />Process
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} 
          className="text-[#DEF2F1]/60 leading-[1.8] text-lg">
          Structured, methodical, and iterative. A disciplined approach to transforming complex problems into elegant, human-centred design solutions.
        </motion.p>
        <div className="flex items-center gap-4 pt-4">
          <div className="w-12 h-[2px] bg-[#3AAFA9]" />
          <span className="text-[#3AAFA9] text-sm font-medium">5-Stage Framework</span>
        </div>
      </div>
      <div className="space-y-0">
        {processSteps.map((step, i) => (
          <ProcessStep key={step.title} step={step} index={i} />
        ))}
      </div>
    </div>
  </Section>
);

/* ============================================================
   EXPLORATIONS — Using actual prototype screenshots
   ============================================================ */
const Explorations = () => {
  const items = [
    { img: CURIXA_IMGS[6], caption: 'Curixa — Active Journeys' },
    { img: COOKIT_IMGS[4], caption: 'Portfolio 2026' },
    { img: AURISYNC_IMGS[0], caption: 'AuriSync — Smart Mode' },
    { img: CURIXA_IMGS[10], caption: 'Curixa — Completion State' },
    { img: COOKIT_IMGS[3], caption: 'CookIT — Recipe Detail' },
    { img: CURIXA_IMGS[11], caption: 'Curixa — Explore' },
    { img: COOKIT_IMGS[5], caption: 'CookIT — Community' },
    { img: CURIXA_IMGS[8], caption: 'Curixa — Video Player' },
    { img: AURISYNC_IMGS[3], caption: 'AuriSync — Connected' },
  ];

  return (
    <Section id="explorations" meshClass="bg-mesh">
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-5 text-[#FEFFFF] text-glow">Explorations</h2>
          <p className="text-[#DEF2F1]/60 text-lg">Raw thinking. Intellectual curiosity. Design maturity.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40, rotateX: 10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.04, zIndex: 10 }} className="group perspective-container">
              <div className="card-3d liquid-glass rounded-3xl overflow-hidden cursor-pointer shadow-2xl shadow-[#00000040]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#DEF2F1]/80 font-medium leading-relaxed">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ============================================================
   SKILLS — Real data from resume
   ============================================================ */
const Skills = () => {
  const skillCategories = [
    { title: 'Design Tools', items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'After Effects', 'Autodesk Maya (3D)'] },
    { title: 'UX Methods', items: ['Card Sorting', 'User Research & Surveys', 'Competitive Analysis', 'Information Architecture', 'User Journey Mapping', 'Wireframing', 'Usability Testing', 'Prototyping'] },
    { title: 'Core Skills', items: ['Research Development', 'Information Architecture', 'Visual Design', 'User Research & Testing', 'UI Designing', 'Typography', 'Wireframes'] },
    { title: 'Soft Skills', items: ['Conceptual Thinking', 'Logical Reasoning', 'Trend Awareness', 'Independent Working', 'Feedback Integration', 'Strategic Delegation', 'Detail Accuracy'] }
  ];

  const experiences = [
    { title: COURSE, place: UNIVERSITY, year: COURSE_YEARS, icon: GraduationCap },
    { title: 'UI/UX Design — Academic Projects', place: 'Self-driven & Team Projects', year: '2025 — Present', icon: Monitor },
    { title: 'Video Editing, Illustration & 3D Modelling', place: 'Independent Creative Practice', year: 'Ongoing', icon: Palette },
    { title: 'Undergraduate Class Leader', place: 'Led batch for full 3-year course', year: '3 Consecutive Years', icon: Users },
  ];

  const achievements = [
    'Led undergraduate batch as class leader for 3 consecutive years',
    'Certificate of Participation — Comic Strip (Multi-Design Competition 2023)',
    'Developed independent illustration and Maya 3D modelling practice outside coursework',
    'Concept lead on Curixa — originated core product idea with team',
    'Research Paper Co-Author (Forthcoming): "Curixa: An AI-Powered Structured Learning Platform" under guidance of B. Karthick',
  ];

  return (
    <Section id="skills" meshClass="bg-mesh-warm">
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-5 text-[#FEFFFF] text-glow">Skills & Experience</h2>
          <p className="text-[#DEF2F1]/60 max-w-xl mx-auto text-lg">Technical proficiencies, academic exposure, and professional competencies.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {skillCategories.map((cat, i) => (
            <Card3D key={cat.title} delay={i * 0.1}>
              <h3 className="text-sm font-semibold mb-5 text-[#3AAFA9] uppercase tracking-wider">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-[#3AAFA9]/8 border border-[#3AAFA9]/15 rounded-lg text-xs text-[#DEF2F1]/75 hover:bg-[#3AAFA9]/15 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="liquid-glass-dark rounded-3xl p-8 lg:p-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-8">Experience & Education</h3>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-[#3AAFA9]/8 last:border-0">
                  <div className="w-10 h-10 rounded-xl bg-[#3AAFA9]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <exp.icon className="w-4 h-4 text-[#3AAFA9]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#FEFFFF]/90 text-sm font-medium leading-snug">{exp.title}</p>
                    <p className="text-[#DEF2F1]/45 text-xs mt-1">{exp.place}</p>
                  </div>
                  <span className="text-[#DEF2F1]/30 text-xs whitespace-nowrap mt-0.5">{exp.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="liquid-glass-dark rounded-3xl p-8 lg:p-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-8">Achievements</h3>
            <div className="space-y-5">
              {achievements.map((ach, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#3AAFA9] mt-2 shrink-0 shadow-[0_0_8px_rgba(58,175,169,0.5)]" />
                  <p className="text-[#DEF2F1]/70 text-sm leading-relaxed">{ach}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

/* ============================================================
   CONTACT — Real contact info
   ============================================================ */
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Section id="contact" meshClass="bg-mesh-deep">
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2 text-[#FEFFFF] text-glow">Let's Create</h2>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-[#3AAFA9]/50 text-glow">Together</h2>
          </div>

          <p className="text-[#DEF2F1]/60 leading-[1.8] max-w-md text-lg">
            Whether you have a project in mind, want to collaborate, or simply wish to discuss design —
            I would love to hear from you.
          </p>

          <div className="space-y-5">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors group">
              <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-[#3AAFA9]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#FEFFFF]/80">{EMAIL}</p>
                <p className="text-xs text-[#DEF2F1]/40">{RV_EMAIL}</p>
              </div>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors group">
              <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5 text-[#3AAFA9]" />
              </div>
              <span className="text-sm font-medium">LinkedIn Profile</span>
            </a>
            <div className="flex items-center gap-4 text-[#DEF2F1]/40">
              <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#3AAFA9]" />
              </div>
              <span className="text-sm font-medium">{LOCATION}</span>
            </div>
          </div>

          <div className="pt-8 border-t border-[#3AAFA9]/10">
            <p className="text-[#DEF2F1]/25 text-sm">{NAME} — Portfolio 2026</p>
            <p className="text-[#DEF2F1]/15 text-xs mt-2">Designed with intention. Built with passion.</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="liquid-glass-dark rounded-3xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl mb-8 text-[#FEFFFF] text-glow">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-3 block">Your Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FEFFFF]/5 border border-[#3AAFA9]/15 rounded-xl px-5 py-3.5 text-sm text-[#FEFFFF] placeholder:text-[#DEF2F1]/25 outline-none focus:border-[#3AAFA9]/50 transition-colors"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-3 block">Your Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FEFFFF]/5 border border-[#3AAFA9]/15 rounded-xl px-5 py-3.5 text-sm text-[#FEFFFF] placeholder:text-[#DEF2F1]/25 outline-none focus:border-[#3AAFA9]/50 transition-colors"
                  placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#3AAFA9] font-semibold mb-3 block">Message</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FEFFFF]/5 border border-[#3AAFA9]/15 rounded-xl px-5 py-3.5 text-sm text-[#FEFFFF] placeholder:text-[#DEF2F1]/25 outline-none focus:border-[#3AAFA9]/50 transition-colors resize-none"
                  placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="w-full bg-[#3AAFA9] text-[#0a1517] font-semibold py-4 rounded-xl hover:bg-[#3AAFA9]/90 transition-colors flex items-center justify-center gap-2 text-sm">
                <Send className="w-4 h-4" />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  return (
    <div className="relative bg-[#0a1517] text-[#FEFFFF]">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <ProjectsSection />
      <DesignProcess />
      <Explorations />
      <Skills />
      <Contact />
      <BackToTop />
    </div>
  );
}
