'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d9.module.scss';

/* --- data --- */

interface CommandItem {
  id: string;
  label: string;
  shortcut: string;
  sectionId: string;
  icon: string;
  description: string;
}

const COMMANDS: CommandItem[] = [
  { id: 'services', label: 'Services', shortcut: '1', sectionId: 'section-services', icon: '○', description: 'What we build and how we build it' },
  { id: 'projects', label: 'Projects', shortcut: '2', sectionId: 'section-projects', icon: '□', description: 'Real work, shipped and running' },
  { id: 'stack', label: 'Stack', shortcut: '3', sectionId: 'section-stack', icon: '△', description: 'The tools and systems behind the work' },
  { id: 'about', label: 'About', shortcut: '4', sectionId: 'section-about', icon: '◇', description: 'Who runs this and why it exists' },
  { id: 'contact', label: 'Contact', shortcut: '5', sectionId: 'section-contact', icon: '○', description: 'Start a conversation' },
];

const SERVICES = [
  { name: 'Digital Products', detail: 'Full-stack web and mobile apps. Schema-first, production-grade.' },
  { name: 'AI Automation', detail: 'Autonomous agents, workflow engines, systems that run without babysitting.' },
  { name: 'Growth Ops', detail: 'SEO, analytics, paid media, conversion infrastructure that compounds.' },
  { name: 'Branding', detail: 'Identity systems, design language, visual standards. Zero templates.' },
  { name: 'Infrastructure', detail: 'Cloud architecture, CI/CD, monitoring, 99.9% uptime SLAs.' },
  { name: 'Strategy', detail: 'Product roadmaps, technical audits, and hard conversations about what to build.' },
];

const PROJECTS = [
  { name: 'Cartley LLC', type: 'SaaS Platform', summary: 'Multi-tenant architecture shipped in 11 weeks.' },
  { name: 'Steven Paul Diamonds', type: 'E-Commerce', summary: '3D product views and a checkout that converts.' },
  { name: 'Adonis Market', type: 'Marketplace', summary: 'Two-sided platform with real-time order tracking.' },
  { name: 'Rides With Vinnie', type: 'Mobile App', summary: 'GPS, booking, driver management. Cross-platform.' },
  { name: 'Key Vision LLC', type: 'Web Platform', summary: 'Data visualization and client portals, built to scale.' },
];

const STACK_ITEMS = [
  { category: 'Frontend', tools: 'Next.js, React, TypeScript, SCSS Modules' },
  { category: 'Backend', tools: 'Node.js, Python, PostgreSQL, Firebase' },
  { category: 'AI/ML', tools: 'Claude, GPT-4, Custom Agents, RAG Pipelines' },
  { category: 'Infrastructure', tools: 'Vercel, GCP, Docker, GitHub Actions' },
  { category: 'Analytics', tools: 'GA4, Search Console, PostHog, Custom Dashboards' },
];

/* --- command palette --- */

function CommandPalette({ onNavigate }: { onNavigate: (sectionId: string) => void }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (sectionId: string) => {
      onNavigate(sectionId);
      setQuery('');
      inputRef.current?.blur();
    },
    [onNavigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter' && filtered.length > 0) {
        e.preventDefault();
        handleSelect(filtered[activeIndex].sectionId);
      }
    },
    [filtered, activeIndex, handleSelect]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function handleGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (e.metaKey || e.ctrlKey) {
        const match = COMMANDS.find((cmd) => cmd.shortcut === e.key);
        if (match) {
          e.preventDefault();
          handleSelect(match.sectionId);
        }
      }
    }
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [handleSelect]);

  return (
    <div className={`${s.palette} ${isFocused ? s.paletteFocused : ''}`}>
      <div className={s.paletteGlow} />
      <div className={s.paletteInner}>
        <div className={s.paletteInputRow}>
          <span className={s.paletteIcon}>&#8984;</span>
          <input
            ref={inputRef}
            className={s.paletteInput}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={s.paletteKbd}>&#8984;K</kbd>
        </div>
        <ul className={s.paletteList}>
          {filtered.map((cmd, i) => (
            <li
              key={cmd.id}
              className={`${s.paletteItem} ${i === activeIndex ? s.paletteItemActive : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(cmd.sectionId);
              }}
            >
              <span className={s.paletteItemIcon}>{cmd.icon}</span>
              <div className={s.paletteItemText}>
                <span className={s.paletteItemLabel}>{cmd.label}</span>
                <span className={s.paletteItemDesc}>{cmd.description}</span>
              </div>
              <kbd className={s.paletteItemShortcut}>&#8984;{cmd.shortcut}</kbd>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className={s.paletteEmpty}>No results for &ldquo;{query}&rdquo;</li>
          )}
        </ul>
      </div>
    </div>
  );
}

/* --- section components --- */

function SectionShortcut({ shortcut }: { shortcut: string }) {
  return (
    <div className={s.sectionShortcut}>
      <kbd>&#8984;{shortcut}</kbd>
    </div>
  );
}

function ServicesSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="section-services" ref={ref} className={`${s.section} ${isVisible ? s.sectionVisible : ''}`}>
      <SectionShortcut shortcut="1" />
      <h2 className={s.sectionTitle}>Services</h2>
      <p className={s.sectionSubtitle}>What we build and how we build it.</p>
      <div className={s.servicesGrid}>
        {SERVICES.map((svc) => (
          <div key={svc.name} className={s.serviceCard}>
            <h3 className={s.serviceCardName}>{svc.name}</h3>
            <p className={s.serviceCardDetail}>{svc.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="section-projects" ref={ref} className={`${s.section} ${isVisible ? s.sectionVisible : ''}`}>
      <SectionShortcut shortcut="2" />
      <h2 className={s.sectionTitle}>Projects</h2>
      <p className={s.sectionSubtitle}>Real work, shipped and running.</p>
      <div className={s.projectsList}>
        {PROJECTS.map((proj, i) => (
          <div key={proj.name} className={s.projectRow}>
            <span className={s.projectIndex}>{String(i + 1).padStart(2, '0')}</span>
            <div className={s.projectInfo}>
              <span className={s.projectName}>{proj.name}</span>
              <span className={s.projectType}>{proj.type}</span>
            </div>
            <p className={s.projectSummary}>{proj.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="section-stack" ref={ref} className={`${s.section} ${isVisible ? s.sectionVisible : ''}`}>
      <SectionShortcut shortcut="3" />
      <h2 className={s.sectionTitle}>Stack</h2>
      <p className={s.sectionSubtitle}>The tools and systems behind the work.</p>
      <div className={s.stackGrid}>
        {STACK_ITEMS.map((item) => (
          <div key={item.category} className={s.stackCard}>
            <h3 className={s.stackCategory}>{item.category}</h3>
            <p className={s.stackTools}>{item.tools}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="section-about" ref={ref} className={`${s.section} ${isVisible ? s.sectionVisible : ''}`}>
      <SectionShortcut shortcut="4" />
      <h2 className={s.sectionTitle}>About</h2>
      <p className={s.sectionSubtitle}>Who runs this and why it exists.</p>
      <div className={s.aboutContent}>
        <p className={s.aboutText}>
          BEIRUX is a digital agency that ships real products with AI-powered systems.
          We build full-stack applications, automate workflows with autonomous agents,
          and scale growth infrastructure. No templates. No outsourcing. Every line of
          code, every pixel, every deployment is ours.
        </p>
        <div className={s.aboutStats}>
          <div className={s.aboutStat}>
            <span className={s.aboutStatValue}>12+</span>
            <span className={s.aboutStatLabel}>Projects Shipped</span>
          </div>
          <div className={s.aboutStat}>
            <span className={s.aboutStatValue}>4</span>
            <span className={s.aboutStatLabel}>AI Agents Running</span>
          </div>
          <div className={s.aboutStat}>
            <span className={s.aboutStatValue}>0</span>
            <span className={s.aboutStatLabel}>Templates Used</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="section-contact" ref={ref} className={`${s.section} ${isVisible ? s.sectionVisible : ''}`}>
      <SectionShortcut shortcut="5" />
      <h2 className={s.sectionTitle}>Contact</h2>
      <p className={s.sectionSubtitle}>Start a conversation.</p>
      <div className={s.contactContent}>
        <a href="mailto:samih@beirux.com" className={s.contactLink}>
          samih@beirux.com
        </a>
        <p className={s.contactNote}>
          Or press <kbd className={s.inlineKbd}>&#8984;K</kbd> and type what you need.
        </p>
      </div>
    </section>
  );
}

/* --- page --- */

export default function D9Page() {
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <main className={s.page}>
      <section className={s.hero}>
        <div className={s.heroContent}>
          <p className={s.heroBrand}>BEIRUX</p>
          <h1 className={s.heroHeadline}>Navigate everything.</h1>
          <p className={s.heroSub}>
            A digital agency built like a developer tool. Keyboard-first. Ship-first.
          </p>
          <CommandPalette onNavigate={handleNavigate} />
        </div>
      </section>

      <ServicesSection />
      <ProjectsSection />
      <StackSection />
      <AboutSection />
      <ContactSection />

      <footer className={s.footer}>
        <span className={s.footerBrand}>BEIRUX</span>
        <span className={s.footerYear}>2026</span>
      </footer>
    </main>
  );
}
