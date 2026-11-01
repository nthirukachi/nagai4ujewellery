import { SITE_DETAILS } from '../data/siteContent';
import { MagneticButton, MaskedReveal, PremiumPicture } from './Primitives';

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#F6F1E7] py-[64px] lg:py-[128px] border-b border-[#1B1F3B]/12"
    >
      <div className="mx-auto max-w-[820px] px-5 sm:px-8">
        <div className="rounded-[28px] border border-[#1B1F3B]/12 bg-[#F6F1E7] p-5 sm:p-12 lg:p-16">
          <div className="flex items-center gap-4 sm:gap-5">
            <PremiumPicture
              src="/me.jpg"
              alt={SITE_DETAILS.myName}
              fallbackMark="NT"
              wipeReveal={false}
              className="h-[68px] w-[68px] sm:h-[84px] sm:w-[84px] shrink-0 rounded-full border border-[#1B1F3B]/15 bg-[#1B1F3B]"
              imgClassName="object-top"
            />
            <MaskedReveal>
              <h2 className="font-serif text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.02] tracking-[-0.01em] text-[#1B1F3B]">
                A note from {SITE_DETAILS.myName}
              </h2>
            </MaskedReveal>
          </div>

          <MaskedReveal delay={0.08}>
            <p className="mt-8 max-w-[62ch] text-[20px] sm:text-[22px] leading-[1.65] text-[#1B1F3B]/92">
              {SITE_DETAILS.aboutLetter}
            </p>
          </MaskedReveal>

          <MaskedReveal delay={0.14}>
            <div className="mt-8">
              <p className="font-signature text-[42px] sm:text-[48px] leading-none text-[#1B1F3B]">
                {SITE_DETAILS.firstName}
              </p>
            </div>

            <div className="mt-8 pt-7 border-t border-[#1B1F3B]/12">
              <MagneticButton
                href={SITE_DETAILS.bookingUrl}
                variant="accent"
                className="!px-5 sm:!px-7 !text-[15px] sm:!text-[16px]"
              >
                Book a 20 minute call with {SITE_DETAILS.firstName}
              </MagneticButton>
            </div>
          </MaskedReveal>
        </div>
      </div>
    </section>
  );
}
