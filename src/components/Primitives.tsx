import React, { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

export function FilmGrain({ id }: { id: string }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay select-none"
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.78"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

interface BrandLogoProps {
  onInk?: boolean;
  href?: string;
}

export function BrandLogo({ onInk = false, href = '#' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href={href}
      aria-label="nagai4u home"
      className={`inline-flex items-center shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8892F] ${
        onInk
          ? 'isolate rounded-[14px] bg-[#F6F1E7] px-3.5 py-1.5'
          : 'isolate rounded-[14px] bg-transparent py-1'
      }`}
    >
      {failed ? (
        <span className="font-serif text-[28px] leading-none tracking-tight text-[#1B1F3B] whitespace-nowrap">
          nagai<span className="text-[#B8892F]">4u</span>
        </span>
      ) : (
        <img
          src="/logo.png"
          alt="nagai4u"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-[32px] sm:h-[38px] w-auto object-contain select-none"
        />
      )}
    </a>
  );
}

interface PremiumPictureProps {
  src: string;
  alt: string;
  fallbackMark: string;
  className?: string;
  imgClassName?: string;
  wipeReveal?: boolean;
  immediate?: boolean;
  priority?: boolean;
}

export function PremiumPicture({
  src,
  alt,
  fallbackMark,
  className = '',
  imgClassName = '',
  wipeReveal = true,
  immediate = false,
  priority = false,
}: PremiumPictureProps) {
  const [missing, setMissing] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, { once: true, amount: 0.08 });

  const shouldShow = immediate || isInView;

  const content = missing ? (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #1B1F3B 0%, #3F2E36 55%, #B8892F 100%)',
      }}
    >
      <FilmGrain id={`fallback-grain-${fallbackMark}`} />
      <span
        aria-hidden="true"
        className="outline-serif font-serif text-[128px] sm:text-[160px] leading-none select-none"
      >
        {fallbackMark}
      </span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setMissing(true)}
      className={`h-full w-full object-cover ${imgClassName}`}
    />
  );

  if (prefersReducedMotion || !wipeReveal) {
    return <div className={`relative overflow-hidden ${className}`}>{content}</div>;
  }

  // Observe the unclipped outer container so clipPath never blocks IntersectionObserver
  return (
    <div ref={outerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.85 }}
        animate={
          shouldShow
            ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
            : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.85 }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {content}
      </motion.div>
    </div>
  );
}

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'accent' | 'outline-cream' | 'outline-ink';
  className?: string;
  external?: boolean;
}

export function MagneticButton({
  href,
  children,
  variant = 'accent',
  className = '',
  external = true,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.18;
    const deltaY = (e.clientY - centerY) * 0.22;
    rawX.set(Math.max(-8, Math.min(8, deltaX)));
    rawY.set(Math.max(-6, Math.min(6, deltaY)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const variantClasses =
    variant === 'accent'
      ? 'bg-[#B8892F] text-[#1A1A1A] font-semibold hover:bg-[#c59638]'
      : variant === 'outline-cream'
      ? 'border border-[#F6F1E7]/25 text-[#F6F1E7] font-medium hover:border-[#F6F1E7]/60'
      : 'border border-[#1B1F3B]/18 text-[#1B1F3B] font-medium hover:border-[#1B1F3B]/45';

  if (prefersReducedMotion) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`inline-flex min-h-[50px] items-center justify-center rounded-full px-7 py-3.5 text-[16px] whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8892F] ${variantClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex min-h-[50px] items-center justify-center rounded-full px-7 py-3.5 text-[16px] whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8892F] ${variantClasses} ${className}`}
    >
      {children}
    </motion.a>
  );
}

interface MaskedRevealProps {
  children: React.ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}

export function MaskedReveal({
  children,
  delay = 0,
  immediate = false,
  className = '',
}: MaskedRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, { once: true, amount: 0.08 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const shouldShow = immediate || isInView;

  // Observe the untransformed outer container so y: '100%' never prevents IntersectionObserver from firing
  return (
    <div ref={outerRef} className={`overflow-hidden py-2 -my-2 px-1 -mx-1 ${className}`}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        animate={shouldShow ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
        transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
