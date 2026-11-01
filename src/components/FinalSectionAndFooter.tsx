import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_DETAILS } from '../data/siteContent';
import { BrandLogo, FilmGrain, MagneticButton, MaskedReveal } from './Primitives';

export function FinalInvitationSection() {
  return (
    <section
      data-theme="ink"
      aria-label="Book a call"
      className="relative overflow-hidden bg-[#1B1F3B] py-[80px] lg:py-[148px]"
    >
      <FilmGrain id="final-invitation-grain" />

      <div className="relative z-10 mx-auto max-w-[1040px] px-5 sm:px-8 text-center">
        <MaskedReveal>
          <h2 className="mx-auto max-w-[18ch] font-serif text-[46px] sm:text-[64px] lg:text-[82px] leading-[1.0] tracking-[-0.02em] text-[#F6F1E7]">
            Let&apos;s give your <em className="italic text-[#B8892F]">evenings</em> back, with every buyer followed up.
          </h2>
        </MaskedReveal>

        <MaskedReveal delay={0.08}>
          <div className="mt-10 flex justify-center">
            <MagneticButton href={SITE_DETAILS.bookingUrl} variant="accent">
              Book a 20 minute call
            </MagneticButton>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[17px] text-[#F6F1E7]/85">
            <a
              href={SITE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#F6F1E7]/35 underline-offset-8 transition-colors duration-150 hover:text-[#F6F1E7] hover:decoration-[#F6F1E7] whitespace-nowrap"
            >
              Message me on WhatsApp
            </a>
            <a
              href={SITE_DETAILS.emailUrl}
              className="underline decoration-[#F6F1E7]/35 underline-offset-8 transition-colors duration-150 hover:text-[#F6F1E7] hover:decoration-[#F6F1E7] whitespace-nowrap"
            >
              {SITE_DETAILS.emailDisplay}
            </a>
          </div>
        </MaskedReveal>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer
      data-theme="ink"
      className="relative overflow-hidden border-t border-[#F6F1E7]/12 bg-[#1B1F3B] pt-12 pb-28 md:pb-14 text-[#F6F1E7]"
    >
      <FilmGrain id="footer-film-grain" />

      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <BrandLogo onInk href="#" />
          <span className="text-[16px] text-[#F6F1E7]/80">{SITE_DETAILS.city}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] text-[#F6F1E7]/85">
          <a
            href={SITE_DETAILS.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-8 hover:underline hover:text-[#F6F1E7] whitespace-nowrap"
          >
            Book a 20 minute call
          </a>
          <a
            href={SITE_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-8 hover:underline hover:text-[#F6F1E7] whitespace-nowrap"
          >
            Message me on WhatsApp
          </a>
          <a
            href={SITE_DETAILS.emailUrl}
            className="underline-offset-8 hover:underline hover:text-[#F6F1E7] whitespace-nowrap"
          >
            {SITE_DETAILS.emailDisplay}
          </a>
        </div>

        <p className="text-[15px] text-[#F6F1E7]/65 whitespace-nowrap">
          {SITE_DETAILS.year} {SITE_DETAILS.businessName}
        </p>
      </div>
    </footer>
  );
}

export function MobileBottomBookingBar() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkHeroScroll = () => {
      const hero = document.getElementById('hero-section') ?? document.getElementById('hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    };

    checkHeroScroll();
    window.addEventListener('scroll', checkHeroScroll, { passive: true });
    window.addEventListener('resize', checkHeroScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkHeroScroll);
      window.removeEventListener('resize', checkHeroScroll);
    };
  }, []);

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: prefersReducedMotion ? 0 : visible ? '0%' : '100%',
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
      }
      className={`fixed right-0 bottom-0 left-0 z-50 border-t border-[#F6F1E7]/15 bg-[#1B1F3B] px-4 py-2.5 md:hidden ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <a
        href={SITE_DETAILS.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#B8892F] px-5 py-2.5 text-[15px] font-semibold text-[#1A1A1A] whitespace-nowrap active:scale-[0.98] transition-transform duration-150"
      >
        Book a 20 minute call
      </a>
    </motion.div>
  );
}
