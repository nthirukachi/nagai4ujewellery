import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BEFORE_AFTER } from '../data/siteContent';
import { MaskedReveal } from './Primitives';

type Mode = 'without' | 'with';

export function BeforeAfterSection() {
  const [mode, setMode] = useState<Mode>('without');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Before and after"
      className="bg-[#F6F1E7] py-[64px] lg:py-[128px] border-b border-[#1B1F3B]/12"
    >
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <MaskedReveal>
            <h2 className="font-serif text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]">
              Before and after
            </h2>
          </MaskedReveal>

          {/* Two-position switch */}
          <div
            role="tablist"
            aria-label="Compare evening without and with nagai4u"
            className="inline-flex items-center rounded-full border border-[#1B1F3B]/15 bg-[#F6F1E7] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'without'}
              onClick={() => setMode('without')}
              className={`relative min-h-[42px] rounded-full px-4 sm:px-5 py-2 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8892F] ${
                mode === 'without'
                  ? 'bg-[#B8892F] text-[#1A1A1A]'
                  : 'text-[#1B1F3B]/75 hover:text-[#1B1F3B]'
              }`}
            >
              {BEFORE_AFTER.withoutLabel}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'with'}
              onClick={() => setMode('with')}
              className={`relative min-h-[42px] rounded-full px-4 sm:px-5 py-2 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8892F] ${
                mode === 'with'
                  ? 'bg-[#B8892F] text-[#1A1A1A]'
                  : 'text-[#1B1F3B]/75 hover:text-[#1B1F3B]'
              }`}
            >
              {BEFORE_AFTER.withLabel}
            </button>
          </div>
        </div>

        {/* Stacked crossfade container: both lists occupy the same grid cell */}
        <div className="mt-12 rounded-[28px] border border-[#1B1F3B]/12 bg-[#F6F1E7] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 grid-rows-1">
            {/* Layer 1: Without nagai4u */}
            <motion.ul
              aria-hidden={mode !== 'without'}
              initial={false}
              animate={{
                opacity: mode === 'without' ? 1 : 0,
                y: prefersReducedMotion ? 0 : mode === 'without' ? 0 : -6,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
              }
              className={`col-start-1 row-start-1 divide-y divide-[#1B1F3B]/12 ${
                mode === 'without' ? 'pointer-events-auto' : 'pointer-events-none select-none'
              }`}
            >
              {BEFORE_AFTER.withoutLines.map((line) => (
                <li
                  key={line}
                  className="py-5 first:pt-1 last:pb-1 text-[18px] sm:text-[20px] leading-[1.6] text-[#1B1F3B]/88 max-w-[66ch]"
                >
                  {line}
                </li>
              ))}
            </motion.ul>

            {/* Layer 2: With nagai4u */}
            <motion.ul
              aria-hidden={mode !== 'with'}
              initial={false}
              animate={{
                opacity: mode === 'with' ? 1 : 0,
                y: prefersReducedMotion ? 0 : mode === 'with' ? 0 : 6,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
              }
              className={`col-start-1 row-start-1 divide-y divide-[#1B1F3B]/12 ${
                mode === 'with' ? 'pointer-events-auto' : 'pointer-events-none select-none'
              }`}
            >
              {BEFORE_AFTER.withLines.map((line) => (
                <li
                  key={line}
                  className="py-5 first:pt-1 last:pb-1 text-[18px] sm:text-[20px] leading-[1.6] text-[#1B1F3B] max-w-[66ch]"
                >
                  {line}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
