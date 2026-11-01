import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SITE_DETAILS } from '../data/siteContent';
import { FilmGrain, MagneticButton } from './Primitives';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageMissing, setImageMissing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Arch portrait moves slightly slower than the page
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative bg-[#F6F1E7] pt-[96px] pb-[72px] lg:min-h-[calc(100svh-16px)] lg:flex lg:items-center lg:pt-[132px] lg:pb-[120px] border-b border-[#1B1F3B]/12"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Text Content Column: Second on phone, Left column (7 cols) on desktop */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-7 lg:pr-8 xl:pr-12">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }
              className="mb-6 flex items-center gap-3.5"
            >
              <span aria-hidden="true" className="h-[1.5px] w-8 shrink-0 bg-[#B8892F]" />
              <p className="text-[15px] sm:text-[16px] font-medium tracking-[0.01em] text-[#1B1F3B]/80">
                For {SITE_DETAILS.whoIHelp} in {SITE_DETAILS.city}
              </p>
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.72, delay: 0.06, ease: [0.16, 1, 0.3, 1] }
              }
              className="font-serif text-[44px] sm:text-[64px] lg:text-[78px] xl:text-[88px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]"
            >
              {SITE_DETAILS.promiseBefore}
              <em className="italic text-[#B8892F]">{SITE_DETAILS.promiseHighlight}</em>
              {SITE_DETAILS.promiseAfter}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.68, delay: 0.12, ease: [0.16, 1, 0.3, 1] }
              }
              className="mt-7 max-w-[56ch] text-[18px] leading-[1.6] text-[#1B1F3B]/85"
            >
              {SITE_DETAILS.whatISetUpSentence}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.68, delay: 0.18, ease: [0.16, 1, 0.3, 1] }
              }
              className="mt-10 pt-8 border-t border-[#1B1F3B]/12 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <MagneticButton
                href={SITE_DETAILS.bookingUrl}
                variant="accent"
                className="!px-8 !py-4 shadow-[0_12px_28px_-8px_rgba(184,137,47,0.45)]"
              >
                Book a 20 minute call
              </MagneticButton>

              <a
                href={SITE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[48px] items-center gap-1.5 text-[17px] font-medium text-[#1B1F3B] underline decoration-[#1B1F3B]/30 underline-offset-8 transition-colors duration-150 hover:decoration-[#1B1F3B] whitespace-nowrap shrink-0"
              >
                <span>Message me on WhatsApp</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-[#B8892F] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* Image Container Column: First on phone (above text), Right column (5 cols) on desktop */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end lg:border-l lg:border-[#1B1F3B]/12 lg:pl-10 xl:pl-12">
            {/* Padding on bottom and right reserves clean space for the overhanging bottom-right badge */}
            <div className="relative w-full max-w-[330px] sm:max-w-[380px] lg:max-w-[420px] pb-5 pr-3 sm:pb-6 sm:pr-5">
              <motion.div
                style={prefersReducedMotion ? undefined : { y: archY }}
                className="relative"
              >
                {/* Arch-shaped Image Container (z-10) */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.9 }
                  }
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="relative z-10 rounded-t-full rounded-b-none border border-[#1B1F3B]/14 bg-[#F6F1E7] p-2.5 sm:p-3.5 shadow-[0_24px_60px_-15px_rgba(27,31,59,0.20),0_10px_24px_-10px_rgba(27,31,59,0.12)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-none bg-[#1B1F3B] ring-1 ring-[#B8892F]/35">
                    {imageMissing ? (
                      <div
                        className="relative flex h-full w-full items-center justify-center overflow-hidden"
                        style={{
                          background:
                            'linear-gradient(145deg, #1B1F3B 0%, #3F2E36 55%, #B8892F 100%)',
                        }}
                      >
                        <FilmGrain id="hero-fallback-grain" />
                        <span
                          aria-hidden="true"
                          className="outline-serif font-serif text-[128px] leading-none select-none"
                        >
                          NT
                        </span>
                      </div>
                    ) : (
                      <img
                        src="/me.jpg"
                        alt={`${SITE_DETAILS.myName}, founder of ${SITE_DETAILS.businessName}`}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        onError={() => setImageMissing(true)}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Founder Badge positioned over bottom-right corner of the arch container (z-20) */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.65, delay: 0.26, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="absolute -right-3 -bottom-4 sm:-right-5 sm:-bottom-5 z-20 flex max-w-[calc(100%-12px)] items-center gap-3 rounded-[20px] border border-[#1B1F3B]/14 bg-[#F6F1E7]/98 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-sm shadow-[0_18px_42px_-10px_rgba(27,31,59,0.24),0_6px_16px_-4px_rgba(27,31,59,0.12)]"
                >
                  <span
                    aria-hidden="true"
                    className="h-6 w-[2.5px] shrink-0 rounded-full bg-[#B8892F]"
                  />
                  <p className="text-[13.5px] sm:text-[15px] leading-snug font-medium text-[#1B1F3B]">
                    {SITE_DETAILS.myName}, founder of {SITE_DETAILS.businessName}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
