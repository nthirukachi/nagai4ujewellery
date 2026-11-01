import { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SITE_DETAILS } from '../data/siteContent';
import { FilmGrain } from './Primitives';

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function IlluminatedWord({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.22, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.26em] inline-block text-[#F6F1E7]"
    >
      {word}
    </motion.span>
  );
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const words = SITE_DETAILS.problemSentence.split(' ');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.78', 'end 0.38'],
  });

  return (
    <section
      ref={sectionRef}
      data-theme="ink"
      aria-label="The problem"
      className="relative overflow-hidden bg-[#1B1F3B] py-[76px] lg:py-[148px]"
    >
      <FilmGrain id="problem-film-grain" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-5 sm:px-8">
        <p className="font-serif text-[36px] sm:text-[50px] lg:text-[66px] leading-[1.08] tracking-[-0.01em] text-[#F6F1E7]">
          {prefersReducedMotion
            ? SITE_DETAILS.problemSentence
            : words.map((word, index) => {
                const start = index / words.length;
                const end = (index + 1) / words.length;
                return (
                  <IlluminatedWord
                    key={`${word}-${index}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
        </p>
      </div>
    </section>
  );
}
