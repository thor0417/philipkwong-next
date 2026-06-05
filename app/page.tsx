'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Services } from '@/components/Services/Services';
import { Work } from '@/components/Work/Work';
import { CaseOverlay } from '@/components/Work/CaseOverlay';
import { Contact } from '@/components/Contact/Contact';
import { CardScroll } from '@/components/CardScroll/CardScroll';

export default function HomePage() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  return (
    <main>
      <div className="scroll-stage">

        {/* Hero lifts into About */}
        <div className="card-pair" id="pair-hero">
          <div className="card-wrap" id="card-hero">
            <Hero />
          </div>
          <div className="card-wrap" id="card-about">
            <About />
          </div>
        </div>

        {/* Services — outside both pairs, no sticky interference */}
        <div className="card-wrap" id="card-services">
          <Services />
        </div>

        {/* Work lifts into Contact */}
        <div className="card-pair" id="pair-work">
          <div className="card-wrap" id="card-work">
            <Work onCaseOpen={setActiveCaseId} />
          </div>
          <div className="card-wrap" id="card-contact">
            <Contact />
          </div>
        </div>

      </div>
      <CaseOverlay caseId={activeCaseId} onClose={() => setActiveCaseId(null)} />
      <CardScroll />
    </main>
  );
}
