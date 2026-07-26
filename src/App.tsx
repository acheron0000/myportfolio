import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import {
  Menu, X, Sparkles, Mail, Linkedin, Instagram, Globe, ChevronDown, ArrowUp,
  Send, Code, Cpu, Terminal, Lightbulb, PenTool, Monitor, Figma, Palette, Eye, MousePointer
} from 'lucide-react';

/* ============================================================
   BROTHER'S PORTFOLIO — Master's UI/UX at RV University
   Colors: #17252A #287A78 #3AAFA9 #DEF2F1 #FEFFFF
   ============================================================ */

const BROTHER_NAME = "[Sahil sk]";
const BROTHER_EMAIL = "[brother.email@example.com]";
const BROTHER_LINKEDIN = "https://linkedin.com/in/[brother-linkedin]";
const BROTHER_INSTAGRAM = "@[brother.instagram]";
const BROTHER_WEBSITE = "[]";
const BROTHER_LOCATION = "Bangalore, India";

/* ============================================================
   3D Tilt Hook
   ============================================================ */
function use3DTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transformTemplate = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const transform = useSpring(transformTemplate, { damping: 25, stiffness: 300 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateY.set((e.clientX - centerX) / 20);
    rotateX.set(-(e.clientY - centerY) / 20);
  }, [rotateX, rotateY, ref]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0);
  }, [rotateX, rotateY]);

  return { transform, handleMouseMove, handleMouseLeave };
}

/* ============================================================
   Sticky Navbar
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
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'liquid-glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif text-xl tracking-tight text-[#FEFFFF]/90 hover:text-[#FEFFFF] transition-colors">
            {BROTHER_NAME.split(' ')[0]}.
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="px-4 py-2 text-sm text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors rounded-full hover:bg-white/5">
                {link}
              </a>
            ))}
            <a href={`mailto:${BROTHER_EMAIL}`} className="ml-4 px-5 py-2 text-sm bg-[#3AAFA9] text-[#17252A] rounded-full hover:bg-[#3AAFA9]/90 transition-colors font-medium">
              Get in Touch
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden liquid-glass rounded-full p-2.5 w-10 h-10 flex items-center justify-center">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 z-[99] bg-[#17252A]/95 backdrop-blur-xl pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="text-2xl font-serif text-[#DEF2F1]/80 hover:text-[#FEFFFF] py-3 border-b border-white/5 transition-colors">
                {link}
              </motion.a>
            ))}
            <a href={`mailto:${BROTHER_EMAIL}`} onClick={() => setMenuOpen(false)}
              className="mt-4 w-full text-center px-6 py-3 bg-[#3AAFA9] text-[#17252A] rounded-full font-medium">
              Get in Touch
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
};

/* ============================================================
   Scroll Progress
   ============================================================ */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#3AAFA9] z-[101] origin-left" style={{ scaleX }} />;
};

/* ============================================================
   Back to Top — Fixed on all sections
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
    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 liquid-glass rounded-full flex items-center justify-center cursor-pointer shadow-lg"
      title="Back to Top">
      <ArrowUp className="w-5 h-5 text-[#DEF2F1]" />
    </motion.button>
  );
};

/* ============================================================
   Page Section Wrapper (NO video — gradient only)
   ============================================================ */
const PageSection = ({ children, className = '', id, gradientClass }: { children: React.ReactNode; className?: string; id?: string; gradientClass: string }) => (
  <section id={id} className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 ${gradientClass} mesh-overlay ${className}`}>
    <div className="relative z-10 w-full max-w-6xl mx-auto">{children}</div>
  </section>
);

/* ============================================================
   3D Card
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
   PAGE 1 — HERO (Video background KEPT)
   ============================================================ */
const Hero = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [email, setEmail] = useState('');

  const videos = [
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4', label: 'Golden Hour' },
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4', label: 'Still Water' },
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4', label: 'Deep Woods' },
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4', label: 'Quiet Dawn' },
  ];

  const handleVideoSwitch = (idx: number) => {
    if (idx === activeVideo || isTransitioning) return;
    setIsTransitioning(true); setActiveVideo(idx);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleGetAccess = () => {
    if (!email.trim()) return;
    const subject = encodeURIComponent('Early Access Request — Portfolio');
    const body = encodeURIComponent(`Hi ${BROTHER_NAME.split(' ')[0]},\n\nI would like to get early access. My email: ${email}\n\nBest regards`);
    window.open(`mailto:${BROTHER_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#17252A]">
      {videos.map((v, i) => (
        <video key={i} autoPlay muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover video-crossfade ${i === activeVideo ? 'opacity-100' : 'opacity-0'}`}
          src={v.url} />
      ))}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#17252A]/40 via-transparent to-[#17252A]/60 pointer-events-none" />
      <div className="relative z-[2] flex flex-col h-full px-6 sm:px-12">
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass rounded-full px-6 py-2.5 mb-8 inline-flex items-center gap-2 text-sm text-[#DEF2F1]">
            <Sparkles className="w-4 h-4 text-[#3AAFA9]" />
            <span>Master's in UI/UX Design — RV University</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl mb-6 text-[#FEFFFF]">
            Designing the<br />
            <span className="italic text-[#DEF2F1]">Future</span> of Digital<br />
            Experiences
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl leading-relaxed mb-10 text-[#DEF2F1]/70 text-base sm:text-lg">
            A Master's student in UI/UX Design at RV University, crafting intuitive interfaces,
            design systems, and human-centred product strategies that bridge aesthetics with functionality.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="w-full max-w-md">
            <div className="liquid-glass rounded-full p-1.5 flex items-center gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGetAccess()}
                placeholder="Your Best Email"
                className="flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-[#DEF2F1]/40 text-[#FEFFFF] min-w-0" />
              <button onClick={handleGetAccess} className="px-5 py-3 bg-[#3AAFA9] text-[#17252A] text-sm font-medium rounded-full hover:bg-[#3AAFA9]/90 transition-colors whitespace-nowrap flex items-center gap-2">
                <Send className="w-3.5 h-3.5" /> Get Early Access
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex gap-6 mt-12">
            {videos.map((v, i) => (
              <button key={i} onClick={() => handleVideoSwitch(i)}
                className={`text-sm font-sans transition-all duration-500 pb-1 border-b-2 ${i === activeVideo ? 'border-[#3AAFA9] text-[#FEFFFF] opacity-100' : 'border-transparent text-[#DEF2F1] opacity-50 hover:opacity-80'}`}>
                {v.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="pb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#DEF2F1]/60 text-xs sm:text-sm font-sans">
          {['Masters UI/UX', 'RV University', 'Bangalore', '2025 — 2027'].map((stat, i) => (
            <React.Fragment key={stat}>
              <span>{stat}</span>
              {i < 3 && <span className="hidden sm:inline">|</span>}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   PAGE 2 — ABOUT (Gradient background, NO video)
   ============================================================ */
const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <PageSection id="about" gradientClass="bg-gradient-about">
      <div ref={ref} className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: imageY }} className="relative">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden liquid-glass-dark">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop" alt="Portrait"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
          </div>
          <motion.div whileHover={{ scale: 1.05, rotate: 5 }}
            className="absolute -bottom-6 -right-6 w-32 h-32 liquid-glass rounded-2xl flex items-center justify-center">
            <span className="font-serif text-3xl italic text-[#3AAFA9]/60">UI/UX</span>
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-serif text-4xl md:text-5xl mb-2 text-[#FEFFFF]">About Me</h2>
            <p className="text-[#DEF2F1]/40 text-sm uppercase tracking-widest">Master's Student — RV University</p>
            <div className="w-20 h-0.5 bg-[#3AAFA9]/30 mt-4" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-[#DEF2F1]/70 leading-relaxed text-lg">
            I am a Master's student in UI/UX Design at RV University, driven by an insatiable curiosity
            for how humans interact with technology. My practice sits at the intersection of visual
            aesthetics, cognitive psychology, and systems thinking.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="text-[#DEF2F1]/70 leading-relaxed">
            With a foundation in design research and growing expertise in interaction design,
            I approach every project as an opportunity to bridge the gap between user needs and
            business objectives. I believe exceptional design is invisible — it simply works.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: Monitor, label: "Interface Design" },
              { icon: PenTool, label: "Design Systems" },
              { icon: Eye, label: "User Research" },
              { icon: MousePointer, label: "Interaction Design" },
              { icon: Figma, label: "Prototyping" },
              { icon: Palette, label: "Visual Identity" }
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 text-[#DEF2F1]/60">
                <item.icon className="w-4 h-4 text-[#3AAFA9]" />
                <span className="text-sm">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="pt-4 border-t border-[#3AAFA9]/10">
            <div className="flex items-center gap-6 text-sm text-[#DEF2F1]/40">
              <span>RV University</span><span className="w-1 h-1 rounded-full bg-[#DEF2F1]/20" />
              <span>Master's in UI/UX Design</span><span className="w-1 h-1 rounded-full bg-[#DEF2F1]/20" />
              <span>2025 — 2027</span>
            </div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  );
};

/* ============================================================
   PROJECTS DATA & COMPONENTS
   ============================================================ */
interface Project {
  id: number; title: string; category: string;
  problem: string; role: string; outcome: string;
  images: string[]; processImages: string[];
}

const projects: Project[] = [
  {
    id: 1, title: 'Lumora', category: 'Mobile App Design',
    problem: 'Users struggled with consistency in wellness apps due to overwhelming interfaces and lack of personalisation.',
    role: 'Lead UI/UX Designer — User Research, Wireframing, Visual Design, Prototyping',
    outcome: 'Increased daily active engagement by 40% through streamlined onboarding and personalised habit tracking.',
    images: [
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop'
    ],
    processImages: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 2, title: 'Komorebi', category: 'Web Platform',
    problem: 'Digital publications often fail to evoke emotional resonance comparable to print media.',
    role: 'UI Designer — Visual System, Interaction Design, Motion Guidelines',
    outcome: 'Achieved 95% positive feedback on visual storytelling; featured in Awwwards nominations.',
    images: [
      'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
    ],
    processImages: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 3, title: 'Solace', category: 'Design System',
    problem: 'Rapid scaling led to fragmented UI patterns and inconsistent user experiences across platforms.',
    role: 'Systems Designer — Tokens, Components, Documentation, Governance',
    outcome: 'Reduced design-to-dev handoff time by 60%; established single source of truth for 4 product teams.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
    ],
    processImages: [
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 4, title: 'Terra', category: 'Brand Identity',
    problem: 'The firm needed a visual identity that communicated sustainability without appearing generic or clichéd.',
    role: 'Brand Designer — Strategy, Identity, Collateral, Digital Assets',
    outcome: 'Brand recognition increased by 70% within 6 months; secured 3 major commercial projects.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop'
    ],
    processImages: [
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop'
    ]
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
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17252A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase tracking-widest text-[#3AAFA9] mb-2 block">{project.category}</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FEFFFF]">{project.title}</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div><span className="text-[#DEF2F1]/40 block mb-1">Problem</span><p className="text-[#DEF2F1]/80 line-clamp-2">{project.problem}</p></div>
            <div><span className="text-[#DEF2F1]/40 block mb-1">My Role</span><p className="text-[#DEF2F1]/80">{project.role}</p></div>
            <div><span className="text-[#DEF2F1]/40 block mb-1">Outcome</span><p className="text-[#DEF2F1]/80">{project.outcome}</p></div>
          </div>
          {isExpanded && (
            <div className="overflow-hidden">
              <div className="pt-6 border-t border-[#3AAFA9]/10 space-y-6">
                <h4 className="text-sm uppercase tracking-widest text-[#DEF2F1]/40">Process</h4>
                <div className="grid grid-cols-3 gap-4">
                  {project.processImages.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden"><img src={img} alt={`Process ${i + 1}`} className="w-full h-full object-cover" /></div>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.images.slice(1).map((img, i) => (
                    <div key={i} className="flex-1 aspect-video rounded-xl overflow-hidden"><img src={img} alt={`Final ${i + 1}`} className="w-full h-full object-cover" /></div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <button className="flex items-center gap-2 text-sm text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors">
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
  <PageSection id="projects" gradientClass="bg-gradient-projects">
    <div className="relative z-10 max-w-5xl w-full">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-6xl mb-4 text-[#FEFFFF]">Selected Works</h2>
        <p className="text-[#DEF2F1]/50 max-w-lg mx-auto">A curated collection of projects spanning interface design, systems, and brand identity.</p>
      </motion.div>
      <div className="space-y-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </PageSection>
);

/* ============================================================
   PAGE 7 — DESIGN PROCESS (Gradient, NO video)
   ============================================================ */
interface ProcessStepData { title: string; desc: string; }

const processSteps: ProcessStepData[] = [
  { title: 'Discover', desc: 'User interviews, competitive audits, and stakeholder alignment to uncover genuine needs.' },
  { title: 'Define', desc: 'Synthesising insights into problem statements, user journeys, and strategic design briefs.' },
  { title: 'Ideate', desc: 'Rapid sketching, wireframing, and collaborative workshops to explore diverse solutions.' },
  { title: 'Prototype', desc: 'High-fidelity interactive prototypes with realistic data and motion for stakeholder validation.' },
  { title: 'Test', desc: 'Usability testing, heuristic evaluation, and iterative refinement based on behavioural data.' },
];

const ProcessStep = ({ step, index }: { step: ProcessStepData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
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
        {index < 4 && <div className="w-px h-20 bg-gradient-to-b from-[#3AAFA9]/20 to-transparent mt-2" />}
      </div>
      <div className="pb-12">
        <h3 className="font-serif text-xl mb-2 text-[#FEFFFF]">{step.title}</h3>
        <p className="text-[#DEF2F1]/50 text-sm leading-relaxed max-w-sm">{step.desc}</p>
      </div>
    </motion.div>
  );
};

const DesignProcess = () => (
  <PageSection id="process" gradientClass="bg-gradient-process">
    <div className="relative z-10 max-w-4xl w-full grid md:grid-cols-2 gap-16 items-center">
      <div>
        <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-6xl mb-6 text-[#FEFFFF]">
          My Design<br />Process
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[#DEF2F1]/50 leading-relaxed">
          Structured, methodical, and iterative. A disciplined approach to transforming complex problems into elegant design solutions.
        </motion.p>
      </div>
      <div className="space-y-0">
        {processSteps.map((step, i) => (
          <ProcessStep key={step.title} step={step} index={i} />
        ))}
      </div>
    </div>
  </PageSection>
);

/* ============================================================
   PAGE 8 — EXPLORATIONS (Gradient, NO video)
   ============================================================ */
const Explorations = () => {
  const items = [
    { img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop', caption: 'Wireframe Studies' },
    { img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', caption: 'Color Exploration' },
    { img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop', caption: 'Typography Systems' },
    { img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop', caption: 'Motion Experiments' },
    { img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop', caption: 'Icon Design' },
    { img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop', caption: '3D Compositions' },
    { img: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', caption: 'Dashboard Concepts' },
    { img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop', caption: 'Mobile Flows' },
    { img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop', caption: 'Brand Sketches' },
  ];

  return (
    <PageSection id="explorations" gradientClass="bg-gradient-explore">
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-4 text-[#FEFFFF]">Explorations</h2>
          <p className="text-[#DEF2F1]/50">Raw thinking. Intellectual curiosity. Design maturity.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40, rotateX: 10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.03, zIndex: 10 }} className="group perspective-container">
              <div className="card-3d liquid-glass rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4"><p className="text-sm text-[#DEF2F1]/60">{item.caption}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

/* ============================================================
   PAGE 9 — SKILLS (Gradient, NO video)
   ============================================================ */
const Skills = () => {
  const skillCategories = [
    { title: 'Design Tools', items: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Principle', 'After Effects'] },
    { title: 'Research & Strategy', items: ['User Interviews', 'Usability Testing', 'Journey Mapping', 'Competitive Analysis', 'A/B Testing', 'Heuristic Evaluation'] },
    { title: 'Technical Skills', items: ['HTML/CSS', 'JavaScript Basics', 'React Basics', 'Design Tokens', 'Git', 'Responsive Design'] },
    { title: 'Professional Skills', items: ['Design Critique', 'Stakeholder Communication', 'Cross-functional Collaboration', 'Time Management', 'Adaptability', 'Storytelling'] }
  ];

  const experiences = [
    { title: "Master's in UI/UX Design", place: 'RV University', year: '2025 — 2027' },
    { title: 'Design Internship', place: '[Company Name]', year: '[Year]' },
    { title: 'Freelance Projects', place: 'Self-initiated', year: 'Ongoing' }
  ];

  const achievements = [
    'Published research paper on cognitive load in mobile interfaces',
    'Top 5% in UX Design coursework at RV University',
    'Built a 200+ component design system from scratch'
  ];

  return (
    <PageSection id="skills" gradientClass="bg-gradient-skills">
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-4 text-[#FEFFFF]">Skills & Experience</h2>
          <p className="text-[#DEF2F1]/50 max-w-xl mx-auto">Technical proficiencies, academic exposure, and professional competencies.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((cat, i) => (
            <Card3D key={cat.title} delay={i * 0.1}>
              <h3 className="text-sm font-medium mb-4 text-[#FEFFFF]/80">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="px-2.5 py-1.5 bg-[#3AAFA9]/10 border border-[#3AAFA9]/10 rounded-lg text-xs text-[#DEF2F1]/60">
                    {item}
                  </span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="liquid-glass-dark rounded-2xl p-8">
            <h3 className="text-xs uppercase tracking-widest text-[#DEF2F1]/30 mb-6">Experience</h3>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div key={i} className="flex justify-between items-start py-3 border-b border-[#3AAFA9]/5">
                  <div>
                    <p className="text-[#DEF2F1]/70 text-sm">{exp.title}</p>
                    <p className="text-[#DEF2F1]/30 text-xs mt-0.5">{exp.place}</p>
                  </div>
                  <span className="text-[#DEF2F1]/20 text-xs whitespace-nowrap">{exp.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="liquid-glass-dark rounded-2xl p-8">
            <h3 className="text-xs uppercase tracking-widest text-[#DEF2F1]/30 mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((ach, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3AAFA9] mt-2 shrink-0" />
                  <p className="text-[#DEF2F1]/50 text-sm">{ach}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  );
};

/* ============================================================
   PAGE 10 — CONTACT (Gradient, NO video)
   ============================================================ */
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${BROTHER_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageSection id="contact" gradientClass="bg-gradient-contact">
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl mb-2 text-[#FEFFFF]">Let's Create</h2>
            <h2 className="font-serif text-4xl md:text-6xl italic text-[#3AAFA9]/40">Together</h2>
          </div>

          <p className="text-[#DEF2F1]/50 leading-relaxed max-w-md">
            Whether you have a project in mind, want to collaborate, or simply wish to discuss design —
            I would love to hear from you.
          </p>

          <div className="space-y-5">
            <a href={`mailto:${BROTHER_EMAIL}`} className="flex items-center gap-4 text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors group">
              <div className="w-11 h-11 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">{BROTHER_EMAIL}</span>
            </a>
            <a href={BROTHER_LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors group">
              <div className="w-11 h-11 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-sm">LinkedIn Profile</span>
            </a>
            <a href={`https://instagram.com/${BROTHER_INSTAGRAM.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors group">
              <div className="w-11 h-11 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="text-sm">{BROTHER_INSTAGRAM}</span>
            </a>
            <a href={BROTHER_WEBSITE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#DEF2F1]/60 hover:text-[#FEFFFF] transition-colors group">
              <div className="w-11 h-11 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-sm">{BROTHER_WEBSITE}</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#3AAFA9]/10">
            <p className="text-[#DEF2F1]/20 text-sm">{BROTHER_LOCATION}</p>
            <p className="text-[#DEF2F1]/15 text-xs mt-2">Portfolio 2026 — Designed with intention</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="liquid-glass-dark rounded-2xl p-8">
            <h3 className="font-serif text-2xl mb-6 text-[#FEFFFF]">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#DEF2F1]/30 mb-2 block">Your Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FEFFFF]/5 border border-[#3AAFA9]/10 rounded-xl px-4 py-3 text-sm text-[#FEFFFF] placeholder:text-[#DEF2F1]/25 outline-none focus:border-[#3AAFA9]/40 transition-colors"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#DEF2F1]/30 mb-2 block">Your Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FEFFFF]/5 border border-[#3AAFA9]/10 rounded-xl px-4 py-3 text-sm text-[#FEFFFF] placeholder:text-[#DEF2F1]/25 outline-none focus:border-[#3AAFA9]/40 transition-colors"
                  placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#DEF2F1]/30 mb-2 block">Message</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FEFFFF]/5 border border-[#3AAFA9]/10 rounded-xl px-4 py-3 text-sm text-[#FEFFFF] placeholder:text-[#DEF2F1]/25 outline-none focus:border-[#3AAFA9]/40 transition-colors resize-none"
                  placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="w-full bg-[#3AAFA9] text-[#17252A] font-medium py-3.5 rounded-xl hover:bg-[#3AAFA9]/90 transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
};

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  return (
    <div className="relative bg-[#17252A] text-[#FEFFFF]">
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