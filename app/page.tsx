'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Services } from '@/components/Services/Services';
import { Work } from '@/components/Work/Work';
import { CaseOverlay } from '@/components/Work/CaseOverlay';
import { Contact } from '@/components/Contact/Contact';

export default function HomePage() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Work onCaseOpen={setActiveCaseId} />
      <Contact />
      <CaseOverlay caseId={activeCaseId} onClose={() => setActiveCaseId(null)} />
    </main>
  );
}
