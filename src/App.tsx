import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Menu, X, Sparkles, Mail, Linkedin, Instagram, Globe, ChevronDown, ArrowUp, Code, Cpu, Terminal, Send } from 'lucide-react';

/* ============================================================
   GOWTHAM K PORTFOLIO — BTech CSE & AIML
   Tech: React 18, Framer Motion, Tailwind CSS, Lucide Icons
   ============================================================ */

/* ─── 3D Tilt Hook ─── */
function use3DTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    rotateY.set(mouseX / 20);
    rotateX.set(-mouseY / 20);
  }, [rotateX, rotateY, ref]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { transform, handleMouseMove, handleMouseLeave };
}

/* ─── Page Wrapper with Scroll Animations ─── */
const PageSection = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y }}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ─── 3D Card Component ─── */
const Card3D = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { transform, handleMouseMove, handleMouseLeave } = use3DTilt(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-container ${className}`}
    >
      <div className="card-3d liquid-glass rounded-2xl p-8">
        <div className="card-3d-content">{children}</div>
      </div>
    </motion.div>
  );
};

/* ─── Background Video Component ─── */
const BgVideo = ({ url, overlay = true }: { url: string; overlay?: boolean }) => (
  <>
    <video
      autoPlay muted loop playsInline
      className="absolute inset-0 w-full h-full object-cover"
      src={url}
    />
    {overlay && <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none" />}
  </>
);

/* ─── Nature Video URL (Quiet Dawn — mountains/glaciers) ─── */
const NATURE_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4';

/* ============================================================
   PAGE 1 — COVER / HERO
   ============================================================ */
const Hero = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const videos = [
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4', label: 'Golden Hour' },
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4', label: 'Still Water' },
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4', label: 'Deep Woods' },
    { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4', label: 'Quiet Dawn' },
  ];

  const isDark = activeVideo === 2;

  const handleVideoSwitch = (idx: number) => {
    if (idx === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(idx);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleGetAccess = () => {
    if (!email.trim()) return;
    const subject = encodeURIComponent('Early Access Request — Portfolio');
    const body = encodeURIComponent(`Hi Gowtham,\n\nI would like to get early access. My email: ${email}\n\nBest regards`);
    window.open(`mailto:gowthamkarna2007@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const navLinks = ['About', 'Projects', 'Process', 'Explorations', 'Skills', 'Contact'];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {videos.map((v, i) => (
        <video
          key={i}
          autoPlay muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover video-crossfade ${i === activeVideo ? 'opacity-100' : 'opacity-0'}`}
          src={v.url}
        />
      ))}
      <div
        className="absolute inset-0 z-[1] train-bob opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url(https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="relative z-[2] flex flex-col h-full px-6 sm:px-12">
        <nav className="flex items-center justify-between py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`font-serif italic text-xl sm:text-2xl ${isDark ? 'text-[#182C41]' : 'text-white'}`}
          >
            Gowtham K
          </motion.div>
          <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 hover:bg-white/10 ${isDark ? 'text-[#182C41]/90 hover:text-[#182C41]' : 'text-white/90 hover:text-white'}`}
              >
                {link}
              </a>
            ))}
            <a href="#contact" className="ml-2 px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
              Get in Touch
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden liquid-glass rounded-full p-3 relative w-12 h-12 flex items-center justify-center"
          >
            {menuOpen ? (
              <X className={`w-5 h-5 ${isDark ? 'text-[#182C41]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-5 h-5 ${isDark ? 'text-[#182C41]' : 'text-white'}`} />
            )}
          </button>
        </nav>
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute inset-x-4 top-24 bottom-4 bg-[#0a0a0a]/95 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center gap-6 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl text-white font-light"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-8 px-8 py-3 bg-white text-black rounded-full font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`liquid-glass rounded-full px-6 py-2.5 mb-8 inline-flex items-center gap-2 ${isDark ? 'text-[#182C41]' : 'text-white'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-sans">Portfolio 2026 — BTech CSE & AIML</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl mb-6 transition-colors duration-700 ${isDark ? 'text-[#182C41]' : 'text-white'}`}
          >
            Engineering the<br />
            <span className="italic">Future of Intelligence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`max-w-xl leading-relaxed mb-10 text-sm sm:text-base transition-colors duration-700 ${isDark ? 'text-[#182C41]/80' : 'text-white/70'}`}
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            A second-year BTech student in Computer Science & AI/ML at Sai Vidya Institute of Technology.
            Passionate about building intelligent systems, crafting elegant code, and exploring the frontiers of machine learning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="liquid-glass rounded-full p-1.5 flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGetAccess()}
                placeholder="Your Best Email"
                className={`flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-white/40 min-w-0 ${isDark ? 'text-[#182C41] placeholder:text-[#182C41]/40' : 'text-white'}`}
              />
              <button
                onClick={handleGetAccess}
                className="px-5 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Get Early Access
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-6 mt-12"
          >
            {videos.map((v, i) => (
              <button
                key={i}
                onClick={() => handleVideoSwitch(i)}
                className={`text-sm font-sans transition-all duration-500 pb-1 border-b-2 ${
                  i === activeVideo
                    ? `${isDark ? 'border-[#182C41] text-[#182C41]' : 'border-white text-white'} opacity-100`
                    : `${isDark ? 'border-transparent text-[#182C41]' : 'border-transparent text-white'} opacity-50 hover:opacity-80`
                }`}
              >
                {v.label}
              </button>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="pb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70 text-xs sm:text-sm font-sans"
        >
          {['BTech CSE & AIML', '2nd Semester', 'Sai Vidya Institute of Technology', '2025 — 2029'].map((stat, i) => (
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
   PAGE 2 — ABOUT ME (with nature background)
   ============================================================ */
const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <PageSection id="about" className="relative overflow-hidden">
      <BgVideo url={NATURE_VIDEO} />
      <div ref={ref} className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: imageY }} className="relative">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden liquid-glass-dark">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
              alt="Portrait"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          <motion.div
            className="absolute -bottom-6 -right-6 w-32 h-32 liquid-glass rounded-2xl flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <span className="font-serif italic text-2xl">2026</span>
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-2">About Me</h2>
            <div className="w-20 h-0.5 bg-white/20" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 leading-relaxed text-base md:text-lg"
          >
            I am Gowtham K, a zealous second-year undergraduate pursuing a BTech in Computer Science 
            and Artificial Intelligence & Machine Learning at Sai Vidya Institute of Technology (2025–2029). 
            My intellectual fervor lies at the confluence of algorithmic problem-solving, full-stack development, 
            and the architecting of intelligent systems. I am relentlessly committed to transmuting theoretical 
            computer science paradigms into pragmatic, high-impact technological solutions that augment human capability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">CS Interests</h3>
            <div className="flex flex-wrap gap-3">
              {['Machine Learning', 'Full-Stack Dev', 'Data Structures', 'System Design', 'Cloud Computing', 'DevOps'].map((tag) => (
                <span key={tag} className="liquid-glass px-4 py-2 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {['HTML', 'CSS', 'JavaScript', 'React JS', 'Java', 'SQL', 'Python', 'C'].map((tool) => (
                <span key={tool} className="text-white/60 text-sm">{tool}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="liquid-glass-dark rounded-xl p-6"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Education</h3>
            <p className="text-white/80">BTech in CSE & AIML</p>
            <p className="text-white/60 text-sm">Sai Vidya Institute of Technology</p>
            <p className="text-white/50 text-sm">2025 — 2029</p>
          </motion.div>
        </div>
      </div>
    </PageSection>
  );
};

/* ============================================================
   PAGES 3-6 — PROJECTS (Academic / Learning Projects)
   ============================================================ */
interface Project {
  id: number;
  title: string;
  category: string;
  problem: string;
  role: string;
  outcome: string;
  images: string[];
  processImages: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Personal Portfolio Website',
    category: 'Web Development',
    problem: 'Needed a professional digital presence to showcase academic journey and technical skills.',
    role: 'Design, Frontend Development, Animation',
    outcome: 'Built with React, Framer Motion, and Tailwind CSS. Fully responsive with 3D effects.',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
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
    id: 2,
    title: 'Student Management System',
    category: 'Java / SQL',
    problem: 'Academic records were scattered. Needed a centralized database-driven management solution.',
    role: 'Backend Logic, Database Design, UI',
    outcome: 'CRUD operations with MySQL backend and Java Swing frontend.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
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
    id: 3,
    title: 'Python Data Analyzer',
    category: 'Python / Data Science',
    problem: 'Raw datasets needed cleaning, visualization, and statistical insight extraction.',
    role: 'Scripting, Visualization, Analysis',
    outcome: 'Automated CSV processing with Pandas, Matplotlib visualizations, and summary reports.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
    ],
    processImages: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'C Programming Utilities',
    category: 'C / Systems',
    problem: 'Fundamental algorithms and data structures needed hands-on implementation.',
    role: 'Algorithm Design, Debugging, Optimization',
    outcome: 'Implemented sorting algorithms, linked lists, stacks, queues, and file I/O operations.',
    images: [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-container w-full"
    >
      <div className="card-3d liquid-glass rounded-3xl overflow-hidden group cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}>
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase tracking-widest text-white/50 mb-2 block">{project.category}</span>
            <h3 className="font-serif text-2xl sm:text-3xl">{project.title}</h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-white/40 block mb-1">Problem</span>
              <p className="text-white/80 line-clamp-2">{project.problem}</p>
            </div>
            <div>
              <span className="text-white/40 block mb-1">My Role</span>
              <p className="text-white/80">{project.role}</p>
            </div>
            <div>
              <span className="text-white/40 block mb-1">Outcome</span>
              <p className="text-white/80">{project.outcome}</p>
            </div>
          </div>

          {isExpanded && (
            <div className="overflow-hidden">
              <div className="pt-6 border-t border-white/10 space-y-6">
                <h4 className="text-sm uppercase tracking-widest text-white/40">Process</h4>
                <div className="grid grid-cols-3 gap-4">
                  {project.processImages.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                      <img src={img} alt={`Process ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.images.slice(1).map((img, i) => (
                    <div key={i} className="flex-1 aspect-video rounded-xl overflow-hidden">
                      <img src={img} alt={`Final ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
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
  <PageSection id="projects" className="relative overflow-hidden">
    <BgVideo url={NATURE_VIDEO} />
    <div className="relative z-10 max-w-5xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl md:text-6xl mb-4">Selected Works</h2>
        <p className="text-white/50 max-w-lg mx-auto">Academic projects and self-driven explorations in code and design.</p>
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
   PAGE 7 — DESIGN PROCESS (with nature background)
   ============================================================ */
interface ProcessStepData {
  title: string;
  desc: string;
}

const processSteps: ProcessStepData[] = [
  { title: 'Discover', desc: 'Immerse in context. Research papers, documentation, and problem statement analysis to find the real challenge.' },
  { title: 'Define', desc: 'Synthesize requirements into actionable technical specifications and architectural blueprints.' },
  { title: 'Ideate', desc: 'Rapid pseudocode generation, algorithm selection, and divergent solution exploration.' },
  { title: 'Prototype', desc: 'Build functional prototypes. From console apps to full-stack implementations.' },
  { title: 'Test', desc: 'Validate with unit tests, edge cases, and peer review until the solution is robust.' },
];

const ProcessStep = ({ step, index }: { step: ProcessStepData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const stepIcons = [
    <Globe key="0" className="w-6 h-6 text-white/80" />,
    <Sparkles key="1" className="w-6 h-6 text-white/80" />,
    <Code key="2" className="w-6 h-6 text-white/80" />,
    <Cpu key="3" className="w-6 h-6 text-white/80" />,
    <Terminal key="4" className="w-6 h-6 text-white/80" />,
  ];

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className="flex items-start gap-6">
      <div className="flex flex-col items-center">
        <motion.div className="w-14 h-14 liquid-glass rounded-2xl flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
          {stepIcons[index]}
        </motion.div>
        {index < 4 && <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent mt-2" />}
      </div>
      <div className="pb-12">
        <h3 className="font-serif text-xl mb-2">{step.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">{step.desc}</p>
      </div>
    </motion.div>
  );
};

const DesignProcess = () => (
  <PageSection id="process" className="relative overflow-hidden">
    <BgVideo url={NATURE_VIDEO} />
    <div className="relative z-10 max-w-4xl w-full grid md:grid-cols-2 gap-16 items-center">
      <div>
        <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-6xl mb-6">
          My Development<br />Process
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/50 leading-relaxed">
          Structured, methodical, and iterative. A disciplined approach to transforming complex problems into elegant software solutions.
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
   PAGE 8 — EXPLORATIONS / SKETCHBOOK (with nature background)
   ============================================================ */
const Explorations = () => {
  const items = [
    { img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop', caption: 'Algorithm Visualizations' },
    { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', caption: 'Code Snippets & Patterns' },
    { img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop', caption: 'Data Structure Diagrams' },
    { img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop', caption: 'UI Component Studies' },
    { img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop', caption: 'Terminal Experiments' },
    { img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop', caption: 'Database Schema Designs' },
    { img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop', caption: 'API Architecture Sketches' },
    { img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop', caption: 'ML Model Diagrams' },
    { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', caption: 'Dashboard Wireframes' },
  ];

  return (
    <PageSection id="explorations" className="relative overflow-hidden">
      <BgVideo url={NATURE_VIDEO} />
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-4">Explorations</h2>
          <p className="text-white/50">Raw thinking. Intellectual curiosity. Technical maturity.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="group perspective-container"
            >
              <div className="card-3d liquid-glass rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/60">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};


/* ============================================================
   PAGE 9 — SKILLS / EXPERIENCE / EXTRAS (with nature background)
   ============================================================ */
const Skills = () => {
  const skillCategories = [
    {
      title: 'Software Development',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React JS', 'Java', 'SQL', 'Python', 'C', 'Git', 'REST APIs']
    },
    {
      title: 'AI & Machine Learning',
      items: ['Python for ML', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'TensorFlow Basics', 'Data Preprocessing', 'Model Evaluation']
    },
    {
      title: 'Professional Skills',
      items: ['Problem Solving', 'Algorithm Design', 'Debugging', 'Code Review', 'Technical Writing', 'Team Collaboration']
    }
  ];

  const experiences = [
    { title: 'Academic Projects', place: 'Sai Vidya Institute of Technology', year: '2025-26' },
    { title: 'Self-Learning & Certifications', place: 'Online Platforms', year: 'Ongoing' },
    { title: 'Coding Practice', place: 'LeetCode / HackerRank', year: 'Ongoing' }
  ];

  const achievements = [
    'Consistently scoring top grades in CSE & AIML coursework',
    'Built full-stack portfolio with React + Framer Motion',
    'Solved 100+ algorithmic problems on coding platforms'
  ];

  return (
    <PageSection id="skills" className="relative overflow-hidden">
      <BgVideo url={NATURE_VIDEO} />
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-4">Skills & Experience</h2>
          <p className="text-white/50">Technical capabilities, academic exposure, and self-driven initiative.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat, i) => (
            <Card3D key={cat.title} delay={i * 0.15}>
              <h3 className="text-lg font-medium mb-4 text-white/90">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/70">{item}</span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="liquid-glass-dark rounded-2xl p-8">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">Experience</h3>
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                  <div>
                    <p className="text-white/80">{exp.title}</p>
                    <p className="text-white/40 text-sm">{exp.place}</p>
                  </div>
                  <span className="text-white/30 text-sm">{exp.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="liquid-glass-dark rounded-2xl p-8">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((ach, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                  <p className="text-white/70">{ach}</p>
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
   PAGE 10 — CONTACT / CLOSING (with Contact Form + nature bg)
   ============================================================ */
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:gowthamkarna2007@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageSection id="contact" className="relative overflow-hidden min-h-screen">
      <BgVideo url={NATURE_VIDEO} />
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-full overflow-hidden liquid-glass-dark">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop" alt="Collage" className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="absolute inset-8 rounded-full overflow-hidden border border-white/10 float-anim">
              <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&h=500&fit=crop" alt="Work" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-6xl mb-2">Let's Build</h2>
            <h2 className="font-serif text-4xl md:text-6xl italic text-white/40">Together</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
            <a href="mailto:gowthamkarna2007@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
              <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <span>gowthamkarna2007@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/gowtham-k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
              <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-4 h-4" />
              </div>
              <span>linkedin.com/in/gowtham-k</span>
            </a>
            <a href="https://instagram.com/gowtham.k.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
              <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="w-4 h-4" />
              </div>
              <span>@gowtham.k.dev</span>
            </a>
            <a href="https://gowthamk.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
              <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-4 h-4" />
              </div>
              <span>gowthamk.dev</span>
            </a>
          </motion.div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/30 text-sm">Bangalore, India</p>
            <p className="text-white/20 text-xs mt-2">Portfolio 2026 — Crafted with precision</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="liquid-glass-dark rounded-2xl p-8">
            <h3 className="font-serif text-2xl mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="I'd like to discuss a project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 liquid-glass rounded-full flex items-center justify-center cursor-pointer"
        title="Back to Top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </PageSection>
  );
};


/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / total);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black text-white">
      <motion.div className="fixed top-0 left-0 h-0.5 bg-white/80 z-[100]" style={{ width: `${scrollProgress * 100}%` }} />
      <Hero />
      <About />
      <ProjectsSection />
      <DesignProcess />
      <Explorations />
      <Skills />
      <Contact />
    </div>
  );
}
