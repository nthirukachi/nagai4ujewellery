import { useEffect, useState } from 'react';
import { SITE_DETAILS } from '../data/siteContent';
import { BrandLogo, MagneticButton } from './Primitives';

type BarSurface = 'transparent' | 'cream' | 'ink';

export function TopBar() {
  const [surface, setSurface] = useState<BarSurface>('transparent');

  useEffect(() => {
    let ticking = false;

    const updateSurface = () => {
      const scrollY = window.scrollY;
      const probeY = 40;
      const inkSections = document.querySelectorAll<HTMLElement>('[data-theme="ink"]');
      let overInk = false;

      inkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          overInk = true;
        }
      });

      if (overInk) {
        setSurface('ink');
      } else if (scrollY > 24) {
        setSurface('cream');
      } else {
        setSurface('transparent');
      }
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSurface);
        ticking = true;
      }
    };

    updateSurface();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const headerStyle =
    surface === 'ink'
      ? 'bg-[#1B1F3B] text-[#F6F1E7] border-b border-[#F6F1E7]/12'
      : surface === 'cream'
      ? 'bg-[#F6F1E7] text-[#1B1F3B] border-b border-[#1B1F3B]/12'
      : 'bg-transparent text-[#1B1F3B] border-b border-transparent';

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-200 ${headerStyle}`}
    >
      <div className="mx-auto flex h-[78px] max-w-[1240px] items-center justify-between gap-8 px-5 sm:px-8">
        <BrandLogo onInk={surface === 'ink'} href="#" />

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-10 text-[16px] font-medium"
        >
          <a
            href="#what-i-do"
            className="whitespace-nowrap shrink-0 underline-offset-8 decoration-[#B8892F] hover:underline transition-opacity duration-150 hover:opacity-85"
          >
            What I do
          </a>
          <a
            href="#how-we-start"
            className="whitespace-nowrap shrink-0 underline-offset-8 decoration-[#B8892F] hover:underline transition-opacity duration-150 hover:opacity-85"
          >
            How it works
          </a>
          <a
            href="#about"
            className="whitespace-nowrap shrink-0 underline-offset-8 decoration-[#B8892F] hover:underline transition-opacity duration-150 hover:opacity-85"
          >
            About
          </a>
        </nav>

        <MagneticButton
          href={SITE_DETAILS.bookingUrl}
          variant="accent"
          className="!min-h-[44px] !px-6 !py-2.5 !text-[15px]"
        >
          Book a call
        </MagneticButton>
      </div>
    </header>
  );
}
