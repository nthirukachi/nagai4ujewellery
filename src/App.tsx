import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { HowWeStartSection } from './components/HowWeStartSection';
import { AboutSection } from './components/AboutSection';
import { QuestionsSection } from './components/QuestionsSection';
import {
  FinalInvitationSection,
  FooterSection,
  MobileBottomBookingBar,
} from './components/FinalSectionAndFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1B1F3B]">
      <TopBar />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatIDoSection />
        <BeforeAfterSection />
        <HowWeStartSection />
        <AboutSection />
        <QuestionsSection />
        <FinalInvitationSection />
      </main>
      <FooterSection />
      <MobileBottomBookingBar />
    </div>
  );
}
