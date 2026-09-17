import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Bus,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  Code2,
  Cpu,
  ExternalLink,
  Globe2,
  Mail,
  Menu,
  Mic2,
  Radio,
  ScanLine,
  Trophy,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ElementType } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yogasree N — IoT, Web & Robotics Portfolio" },
      { name: "description", content: "The engineering portfolio of Yogasree N, an ECE student building projects across IoT, robotics, electronics, AI and web development." },
      { property: "og:title", content: "Yogasree N — Future Engineer & Creative Technologist" },
      { property: "og:description", content: "IoT developer, web developer, robotics builder, research presenter and bilingual compère." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  icon: ElementType;
  tags: string[];
  link?: string;
  badge?: string;
};

const projects: Project[] = [
  { number: "01", name: "Ninja Ottobot", category: "Robotics", description: "An experimental biped robotics project focused on walking movement, servo control and autonomous interaction.", icon: Bot, tags: ["Biped platform", "Servo control", "Autonomous interaction"] },
  { number: "02", name: "AI Assistant Ottobot", category: "AI + Robotics", description: "An experimental robotics project combining an interactive robotic platform with AI-oriented functionality.", icon: BrainCircuit, tags: ["Robotic platform", "AI-oriented", "Interactive"] },
  { number: "03", name: "RFID Student Attendance System", category: "IoT + Hardware + Web", description: "A student attendance system using RFID-based identification and connected data handling.", icon: Radio, tags: ["RFID", "Connected data", "Student attendance"], badge: "Project Expo Winner" },
  { number: "04", name: "College Bus Tracking System", category: "IoT + Hardware + Web", description: "A college bus tracking solution combining hardware and software to provide useful transportation information.", icon: Bus, tags: ["Tracking", "Hardware", "Web"] },
  { number: "05", name: "EmergencyAI", category: "AI + Web", description: "An AI-powered emergency response web concept designed around detection, analysis, coordination and response.", icon: Zap, tags: ["Detection", "Analysis", "Coordination"], link: "https://emergencyai-nowtt62.public.builtwithrocket.new" },
  { number: "06", name: "VoxApp AI", category: "AI + Web Development", description: "A voice-first AI website builder that allows users to describe website ideas through speech or text and generate interactive web experiences.", icon: Waves, tags: ["Voice-first", "AI", "Web experiences"], link: "https://hackathonvoxai.lovable.app" },
];

const skills = [
  { title: "Programming", icon: Code2, items: ["C", "C++", "Python"], text: "Building logical foundations for software and hardware." },
  { title: "Embedded & IoT", icon: Cpu, items: ["Arduino", "ESP8266", "IoT Development"], text: "Connecting sensors, devices and useful digital experiences." },
  { title: "Web Development", icon: Globe2, items: ["HTML", "CSS", "JavaScript"], text: "Creating practical, interactive experiences for the web." },
  { title: "Electronics", icon: CircuitBoard, items: ["PCB Design", "Robotics"], text: "Turning circuits and mechanical systems into working builds." },
];

const nav = ["Home", "About", "Skills", "Projects", "Research", "Achievements", "Speaking", "Gallery", "Contact"];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [selected, setSelected] = useState<Project | null>(null);
  const [progress, setProgress] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-40% 0px -52%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected || menuOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && (setSelected(null), setMenuOpen(false));
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [selected, menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <div className="cursor-glow" aria-hidden="true" ref={cursorRef} />
      <div className="fixed inset-x-0 top-0 z-[70] h-px bg-border"><div className="h-full bg-primary shadow-[0_0_12px_var(--glow-primary)]" style={{ width: `${progress}%` }} /></div>

      <header className={`site-nav ${progress > 1 ? "is-scrolled" : ""}`}>
        <a href="#home" className="brand" aria-label="Yogasree N home"><span className="brand-mark">YN</span><span>YOGASREE N</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={active === item.toLowerCase() ? "active" : ""}>{item}</a>)}
        </nav>
        <Button asChild size="sm" className="nav-connect"><a href="#contact">Let&apos;s Connect <ArrowUpRight size={14} /></a></Button>
        <Button variant="icon" className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></Button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <Button variant="icon" className="absolute right-5 top-5" onClick={closeMenu} aria-label="Close navigation"><X /></Button>
        <nav aria-label="Mobile navigation">{nav.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}><span>{String(index + 1).padStart(2, "0")}</span>{item}</a>)}</nav>
      </div>

      <main>
        <section id="home" className="hero-section">
          <CircuitField />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow hero-enter">ECE <span /> IoT <span /> Web <span /> Robotics</p>
              <h1 className="hero-name hero-enter">YOGASREE <strong>N</strong></h1>
              <div className="hero-manifesto hero-enter">
                <span>I BUILD <em>TECHNOLOGY.</em></span>
                <span>I PRESENT <em>IDEAS.</em></span>
                <span>I CREATE <em>IMPACT.</em></span>
              </div>
              <p className="hero-description hero-enter">2nd Year B.E. ECE student building creative solutions across IoT, robotics, electronics and web development.</p>
              <div className="flex flex-wrap gap-3 hero-enter">
                <Button asChild size="lg"><a href="#projects">Explore My Projects <ArrowDown size={16} /></a></Button>
                <Button asChild variant="outline" size="lg"><a href="#contact">Contact Me <Mail size={16} /></a></Button>
              </div>
            </div>
            <div className="hero-hud hero-enter" aria-label="Yogasree N professional identity visualization">
              <div className="hud-rings"><div className="hud-core"><span className="hud-initials">YN</span><small>Future Engineer</small></div></div>
              <span className="hud-tag tag-one">IoT Developer</span><span className="hud-tag tag-two">Web Developer</span><span className="hud-tag tag-three">Robotics</span><span className="hud-tag tag-four">ECE</span>
              <div className="scanner" />
            </div>
          </div>
          <div className="hero-footer"><span>Building Creative Technology for a Better Tomorrow.</span><a href="#about">Scroll to explore <ArrowDown size={14} /></a></div>
        </section>

        <section id="about" className="section about-section">
          <SectionHeading index="01" kicker="The person behind the projects" title="ABOUT ME" />
          <div className="about-grid">
            <div data-reveal>
              <p className="lead">I am Yogasree N, a 2nd Year B.E. Electronics &amp; Communication Engineering student at Gojan School of Business and Technology.</p>
              <p className="body-copy">I enjoy transforming creative ideas into practical technology through IoT, web development, electronics and robotics.</p>
              <p className="body-copy">My goal is to build impressive projects that solve real-world problems, inspire creative thinking and contribute positively to humanity.</p>
              <div className="education-line"><CalendarDays size={18} /><div><strong>B.E. Electronics &amp; Communication Engineering</strong><span>Expected Graduation · 2029</span></div></div>
            </div>
            <div className="engineer-flow" data-reveal>
              <div className="flow-label"><span>Engineer Journey</span><small>PROCESS / 06</small></div>
              {[
                ["01", "Idea"], ["02", "Design"], ["03", "Build"], ["04", "Test"], ["05", "Improve"], ["06", "Impact"],
              ].map(([num, text]) => <div className="flow-step" key={text}><span>{num}</span><strong>{text}</strong><ChevronRight /></div>)}
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <SectionHeading index="02" kicker="Tools, systems, foundations" title="TECHNICAL SKILLS" />
          <div className="skills-grid">
            {skills.map((skill, index) => <article className="skill-module" data-reveal key={skill.title} style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="skill-top"><skill.icon /><span>0{index + 1}</span></div><h3>{skill.title}</h3><p>{skill.text}</p>
              <div className="skill-tags">{skill.items.map((item) => <span key={item}>{item}</span>)}</div><div className="circuit-path" />
            </article>)}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <SectionHeading index="03" kicker="Hardware meets software" title="PROJECTS I BUILT" />
          <div className="projects-grid">
            {projects.map((project, index) => <ProjectCard project={project} index={index} onOpen={() => setSelected(project)} key={project.name} />)}
          </div>
        </section>

        <section id="research" className="section research-section">
          <SectionHeading index="04" kicker="Ideas presented beyond the classroom" title="RESEARCH & CONFERENCES" />
          <div className="research-timeline">
            <ResearchCard number="01" conference="4th International Conference on Sustainable Computing and Smart Systems (ICSCSS 2026)" paper="A Web-Based Mental Health Assessment Framework Using Natural Language Processing Techniques" date="22–24 July 2026" institution="Hindustan College of Engineering and Technology · Coimbatore, India" />
            <ResearchCard number="02" conference="International Conference on Circuit, Power and Computing Technologies (ICCPCT 2026)" paper="A Secure Multi-Drone Video Streaming Architecture Using 5G Networks and Machine Learning-Based Access Control" date="6–7 August 2026" institution="Baselios Mathews II College of Engineering · Kerala" />
          </div>
        </section>

        <section id="achievements" className="section achievements-section">
          <SectionHeading index="05" kicker="Verified milestones" title="ACHIEVEMENTS" />
          <div className="achievement-layout">
            <article className="featured-achievement" data-reveal><div className="trophy-orbit"><Trophy /></div><div><p className="eyebrow">Featured achievement</p><h3>PROJECT EXPO&apos;26 — WINNER</h3><p>RFID Student Attendance System</p><dl><div><dt>Organizer</dt><dd>Gojan School of Business and Technology in association with VIPS.Tech</dd></div><div><dt>Date</dt><dd>20 August 2026</dd></div></dl></div></article>
            <div className="achievement-stack">
              <article data-reveal><Globe2 /><div><h3>International Conference Presentations</h3><p>2 conference paper presentations in 2026</p></div></article>
              <article data-reveal><CheckCircle2 /><div><h3>SWEEP Awareness Activities</h3><p>Essay competition participation · 7 April 2026</p></div></article>
            </div>
          </div>
        </section>

        <section id="speaking" className="speaking-section">
          <div className="spotlight" />
          <div className="section speaking-inner">
            <div data-reveal><p className="eyebrow">Beyond technology</p><h2>THE VOICE<br />BEHIND <em>THE STAGE</em></h2><p>Alongside technology, I actively participate as a Tamil and English compère, hosting and coordinating programs in colleges and schools.</p><div className="speaker-roles"><span>Tamil Compère</span><span>English Compère</span><span>Public Speaker</span><span>Event Host</span></div></div>
            <div className="sound-console" data-reveal><div className="mic-orbit"><Mic2 /></div><div className="waveform" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${i * -0.07}s` }} />)}</div><div className="console-labels"><span>VOICE INPUT</span><span>LIVE / READY</span></div></div>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <SectionHeading index="07" kicker="A visual record of the work" title="BUILD • PRESENT • CREATE" />
          <div className="gallery-grid" data-reveal>
            {projects.slice(0, 5).map((project, index) => <button key={project.name} className={`gallery-tile tile-${index + 1}`} onClick={() => setSelected(project)} aria-label={`View ${project.name}`}><project.icon /><div><span>{project.category}</span><strong>{project.name}</strong></div><ScanLine className="tile-scan" /></button>)}
          </div>
        </section>

        <section id="journey" className="section journey-section">
          <SectionHeading index="08" kicker="Progress in motion" title="MY JOURNEY" />
          <div className="journey-track" data-reveal><div className="journey-year"><strong>2026</strong><span>Year of building &amp; presenting</span></div><ul><li>Project Expo Winner</li><li>International Conference Presentation</li><li>International Conference Presentation</li><li>Robotics Projects</li><li>AI/Web Projects</li><li>Continued development in IoT and web technologies</li></ul><div className="journey-future"><span>2027+</span><strong>BUILDING WHAT&apos;S NEXT</strong><ArrowUpRight /></div></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid" data-reveal><div><p className="eyebrow">Open to ideas and opportunities</p><h2>LET&apos;S BUILD<br /><em>SOMETHING.</em></h2></div><div><p>Have an idea, project, collaboration or opportunity? Let&apos;s connect.</p><a className="email-link" href="mailto:hancock0516@gmail.com">hancock0516@gmail.com <ArrowUpRight /></a><Button asChild size="lg"><a href="mailto:hancock0516@gmail.com">Email Me <Mail size={16} /></a></Button></div></div>
        </section>
      </main>

      <footer><div className="footer-brand">YOGASREE N</div><div><p>B.E. ECE • IoT • Web • Robotics</p><p>Building creative technology for a better tomorrow.</p></div><a href="mailto:hancock0516@gmail.com">hancock0516@gmail.com</a></footer>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function SectionHeading({ index, kicker, title }: { index: string; kicker: string; title: string }) {
  return <div className="section-heading" data-reveal><div><span>{index}</span><p>{kicker}</p></div><h2>{title}</h2></div>;
}

function CircuitField() {
  return <div className="circuit-field" aria-hidden="true"><div className="tech-grid" />{Array.from({ length: 16 }, (_, i) => <i className={`particle particle-${(i % 5) + 1}`} key={i} />)}<svg viewBox="0 0 1440 850" preserveAspectRatio="none"><path d="M0 180H210V300H390V145H610"/><path d="M1440 130H1220V245H1050V390H890"/><path d="M0 680H190V570H360V730H570"/><path d="M1440 690H1290V570H1110V720H920"/><circle cx="610" cy="145" r="5"/><circle cx="890" cy="390" r="5"/><circle cx="570" cy="730" r="5"/><circle cx="920" cy="720" r="5"/></svg></div>;
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const Icon = project.icon;
  return <article className="project-card" data-reveal style={{ transitionDelay: `${(index % 2) * 100}ms` }}>
    <button className="project-visual" onClick={onOpen} aria-label={`View ${project.name} details`}><div className="project-grid-lines" /><Icon /><div className="project-orbit" />{project.badge && <span className="project-badge"><Trophy size={12} /> {project.badge}</span>}<span className="visual-label">SYS / PROJECT_{project.number}</span><span className="visual-scan" /></button>
    <div className="project-info"><div className="project-meta"><span>PROJECT {project.number}</span><span>{project.category}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-actions"><Button variant="ghost" onClick={onOpen}>View Project <ArrowUpRight size={15} /></Button>{project.link && <Button asChild variant="outline" size="sm"><a href={project.link} target="_blank" rel="noreferrer">Live Project <ExternalLink size={14} /></a></Button>}</div></div>
  </article>;
}

function ResearchCard({ number, conference, paper, date, institution }: { number: string; conference: string; paper: string; date: string; institution: string }) {
  return <article className="research-card" data-reveal><div className="research-node"><span>{number}</span></div><div><div className="research-status"><span>Paper Presented</span><small>2026</small></div><p className="conference-name">{conference}</p><h3>“{paper}”</h3><div className="research-details"><span><CalendarDays />{date}</span><span><Globe2 />{institution}</span></div></div></article>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><Button variant="icon" className="modal-close" onClick={onClose} aria-label="Close project"><X /></Button><div className="modal-visual"><div className="project-grid-lines" /><Icon /><div className="project-orbit" /></div><div className="modal-copy"><p className="eyebrow">Project {project.number} / {project.category}</p><h2 id="project-title">{project.name}</h2>{project.badge && <span className="modal-badge"><Trophy size={14} />{project.badge}</span>}<div className="modal-section"><span>Problem / Idea</span><p>{project.description}</p></div><div className="modal-section"><span>What I built</span><p>{project.description}</p></div><div className="modal-section"><span>Project focus</span><div className="modal-tags">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div></div>{project.link && <Button asChild><a href={project.link} target="_blank" rel="noreferrer">View Live Project <ExternalLink size={15} /></a></Button>}</div></div></div>;
}
