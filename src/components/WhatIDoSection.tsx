import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SITE_DETAILS, WORK_ITEMS, WorkItem } from '../data/siteContent';
import { MaskedReveal, PremiumPicture } from './Primitives';

function WorkCard({
  item,
  className = '',
  wipeReveal = false,
}: {
  item: WorkItem;
  className?: string;
  wipeReveal?: boolean;
}) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[28px] border border-[#1B1F3B]/12 bg-[#F6F1E7] ${className}`}
    >
      {/* Top 60% image */}
      <div className="h-[58%] sm:h-[60%] w-full shrink-0 border-b border-[#1B1F3B]/12">
        <PremiumPicture
          src={item.image}
          alt={item.imageAlt}
          fallbackMark={item.number}
          wipeReveal={wipeReveal}
          className="h-full w-full"
        />
      </div>

      {/* Bottom 40% text */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:px-10 lg:py-7">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[30px] sm:text-[34px] leading-none text-[#B8892F] tabular-nums">
            {item.number}
          </span>
          <h3 className="font-serif text-[30px] sm:text-[36px] leading-[1.05] text-[#1B1F3B]">
            {item.title}
          </h3>
        </div>

        <div className="mt-4 space-y-2.5 text-[17px] sm:text-[18px] leading-[1.55] text-[#1B1F3B]">
          <p className="max-w-[66ch]">
            <span className="font-semibold text-[#1B1F3B]">Today:</span>{' '}
            <span className="text-[#1B1F3B]/80">{item.today}</span>
          </p>
          <p className="max-w-[66ch]">
            <span className="font-semibold text-[#1B1F3B]">
              With {SITE_DETAILS.businessName}:
            </span>{' '}
            <span className="text-[#1B1F3B]/92">{item.withBrand}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

function DesktopPinnedWhatIDo() {
  const pinSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScrollX, setMaxScrollX] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const parentWidth = trackRef.current.parentElement?.clientWidth ?? window.innerWidth;
      setMaxScrollX(Math.max(0, trackWidth - parentWidth));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: pinSectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxScrollX]);

  return (
    <section
      id="what-i-do"
      ref={pinSectionRef}
      className="relative h-[300vh] bg-[#F6F1E7] border-b border-[#1B1F3B]/12"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[72px]">
        <div className="mx-auto w-full max-w-[1240px] px-8">
          <MaskedReveal>
            <div className="mb-8">
              <h2 className="font-serif text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]">
                What I do
              </h2>
            </div>
          </MaskedReveal>

          <div className="w-full overflow-visible">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-stretch gap-8 pr-8 will-change-transform"
            >
              {WORK_ITEMS.map((item) => (
                <WorkCard
                  key={item.number}
                  item={item}
                  className="h-[66vh] min-h-[500px] max-h-[640px] w-[68vw] max-w-[880px] shrink-0"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatIDoSection() {
  const prefersReducedMotion = useReducedMotion();
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  );
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => setIsDesktop(mq.matches);
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const scrollToMobileCard = (index: number) => {
    setActiveSlide(index);
    const container = mobileCarouselRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      container.scrollTo({
        left: child.offsetLeft - 20,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleMobileScroll = () => {
    const container = mobileCarouselRef.current;
    if (!container) return;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDiff = Infinity;
    Array.from(container.children).forEach((el, idx) => {
      const htmlEl = el as HTMLElement;
      const center = htmlEl.offsetLeft + htmlEl.clientWidth / 2;
      const diff = Math.abs(scrollCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        closest = idx;
      }
    });
    setActiveSlide(closest);
  };

  // Reduced motion: normal stacked vertical list
  if (prefersReducedMotion) {
    return (
      <section
        id="what-i-do"
        className="bg-[#F6F1E7] py-[64px] lg:py-[120px] border-b border-[#1B1F3B]/12"
      >
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <h2 className="font-serif text-[44px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]">
            What I do
          </h2>

          <div className="mt-10 flex flex-col gap-8">
            {WORK_ITEMS.map((item) => (
              <WorkCard
                key={item.number}
                item={item}
                className="h-[520px] sm:h-[580px] w-full max-w-[920px]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop pinned horizontal scroll
  if (isDesktop) {
    return <DesktopPinnedWhatIDo />;
  }

  // Phone / Tablet: swipe sideways carousel
  return (
    <section
      id="what-i-do"
      className="bg-[#F6F1E7] py-[64px] border-b border-[#1B1F3B]/12"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <MaskedReveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-[44px] sm:text-[56px] leading-[1.0] tracking-[-0.02em] text-[#1B1F3B]">
              What I do
            </h2>
            <div className="flex items-center gap-2 pb-1" role="tablist" aria-label="Work cards">
              {WORK_ITEMS.map((item, idx) => (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  onClick={() => scrollToMobileCard(idx)}
                  className={`min-h-[36px] min-w-[36px] rounded-full text-[14px] font-medium tabular-nums transition-colors duration-150 ${
                    activeSlide === idx
                      ? 'bg-[#B8892F] text-[#1A1A1A]'
                      : 'border border-[#1B1F3B]/15 text-[#1B1F3B]/75'
                  }`}
                >
                  {item.number}
                </button>
              ))}
            </div>
          </div>
        </MaskedReveal>

        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          className="no-scrollbar mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
        >
          {WORK_ITEMS.map((item) => (
            <WorkCard
              key={item.number}
              item={item}
              wipeReveal
              className="h-[520px] sm:h-[560px] w-[86vw] max-w-[460px] shrink-0 snap-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
