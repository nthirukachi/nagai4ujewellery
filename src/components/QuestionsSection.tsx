import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FAQ_ITEMS } from '../data/siteContent';
import { MaskedReveal } from './Primitives';

export function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      aria-label="Questions"
      className="bg-[#F6F1E7] py-[64px] lg:py-[128px]"
    >
      <div className="mx-auto max-w-[920px] px-5 sm:px-8">
        <MaskedReveal>
          <h2 className="font-serif text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]">
            Questions
          </h2>
        </MaskedReveal>

        <div className="mt-10 sm:mt-14 border-t border-[#1B1F3B]/12">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div
                key={item.question}
                className="border-b border-[#1B1F3B]/12"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8892F]"
                >
                  <span className="font-serif text-[26px] sm:text-[30px] leading-[1.15] text-[#1B1F3B]">
                    {item.question}
                  </span>

                  {/* Plus that rotates 45deg into a cross */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1B1F3B]/15 text-[#1B1F3B]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
                      }
                      className="pb-7 pr-8"
                    >
                      <p className="max-w-[66ch] text-[18px] leading-[1.6] text-[#1B1F3B]/85">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
