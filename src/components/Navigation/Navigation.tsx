'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.scss';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : styles.hero}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoMark}>B</span>
          <span className={styles.logoText}>BEIRUX</span>
        </a>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.cta}>
            Start a project
          </a>
        </div>

        <button
          className={`${styles.menuOpener} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerContent}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
              Start a project
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
