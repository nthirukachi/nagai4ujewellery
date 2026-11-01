import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { HOW_WE_START_STEPS, SITE_DETAILS } from '../data/siteContent';
import { MaskedReveal } from './Primitives';

export function HowWeStartSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.72', 'end 0.55'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.3,
  });

  return (
    <section
      id="how-we-start"
      className="bg-[#F6F1E7] py-[64px] lg:py-[128px] border-b border-[#1B1F3B]/12"
    >
      <div className="mx-auto max-w-[960px] px-5 sm:px-8">
        <MaskedReveal>
          <h2 className="font-serif text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]">
            How we start
          </h2>
        </MaskedReveal>

        <div ref={timelineRef} className="relative mt-12 sm:mt-16 pl-9 sm:pl-14">
          {/* Thin vertical hairline track */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[11px] sm:left-[15px] w-[2px] bg-[#1B1F3B]/12"
          />

          {/* Accent vertical fill line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : scaleY }}
            className="absolute top-2 bottom-2 left-[11px] sm:left-[15px] w-[2px] origin-top bg-[#B8892F]"
          />

          <ol className="space-y-12 sm:space-y-16">
            {HOW_WE_START_STEPS.map((step, idx) => {
              const isLast = idx === HOW_WE_START_STEPS.length - 1;
              return (
                <li key={step.number} className="relative">
                  {/* Small mark on line */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-9 sm:-left-14 top-2.5 flex h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] items-center justify-center rounded-full border border-[#B8892F] bg-[#F6F1E7]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#B8892F]" />
                  </span>

                  <MaskedReveal delay={idx * 0.05}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="font-serif text-[28px] sm:text-[34px] leading-none text-[#B8892F] tabular-nums">
                        {step.number}
                      </span>
                      <h3 className="mt-1 sm:mt-0 font-serif text-[32px] sm:text-[40px] leading-[1.05] text-[#1B1F3B]">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-3 max-w-[62ch] text-[18px] leading-[1.6] text-[#1B1F3B]/85">
                      {step.body}
                    </p>

                    {isLast && SITE_DETAILS.price && (
                      <div className="mt-6 pt-5 border-t border-[#1B1F3B]/12 max-w-[62ch]">
                        <p className="font-serif text-[28px] sm:text-[32px] leading-[1.15] text-[#1B1F3B]">
                          {SITE_DETAILS.price}
                        </p>
                      </div>
                    )}
                  </MaskedReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
