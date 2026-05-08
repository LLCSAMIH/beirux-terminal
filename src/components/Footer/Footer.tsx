'use client';

import { useState } from 'react';
import styles from './Footer.module.scss';

const FOOTER_LINKS = {
  discover: [
    { label: 'Experience', href: '#experience' },
    { label: 'Technology', href: '#technology' },
    { label: 'Company', href: '#company' },
    { label: 'News', href: '#news' },
    { label: 'Careers', href: '#careers' },
  ],
  explore: [
    { label: 'For Investors', href: '#' },
    { label: 'Fly Blade', href: '#' },
    { label: 'Shop', href: '#' },
  ],
  connect: [
    { label: 'YouTube', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.top}>
        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Impact Reporting</a>
          <p className={styles.copyright}>&copy; 2026 Joby Aero, Inc.</p>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>Discover</h4>
            {FOOTER_LINKS.discover.map(link => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className={styles.column}>
            <h4>Explore</h4>
            {FOOTER_LINKS.explore.map(link => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className={styles.column}>
            <h4>Connect</h4>
            {FOOTER_LINKS.connect.map(link => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.logoLarge}>
          <svg width="80" height="56" viewBox="0 0 40 28" fill="none">
            <path d="M20 0C14 0 8.5 3.5 5.5 9C2 15.5 0 20 0 24c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.5.5-3 1.5-5C12 14 15.5 10 20 10s8 4 11.5 9c1 2 1.5 3.5 1.5 5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-2-8.5-5.5-15C32.5 3.5 26 0 20 0z" fill="currentColor"/>
          </svg>
        </div>

        <div className={styles.newsletter}>
          <h3>Sign up for updates</h3>
          <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter e-mail address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Subscribe">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
          <p className={styles.newsletterDisclaimer}>
            By entering your email address and clicking subscribe, you agree to receive updates.
          </p>
        </div>
      </div>
    </footer>
  );
}
