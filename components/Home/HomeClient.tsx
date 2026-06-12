'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { DrawIn } from '@/components/DrawIn/DrawIn';
import { Work } from '@/components/Work/Work';
import { CaseOverlay } from '@/components/Work/CaseOverlay';
import { Contact } from '@/components/Contact/Contact';
import CardScroll from '@/components/CardScroll/CardScroll';

export function HomeClient() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  return (
    <main>
      <div className="scroll-stage">
        <div className="card-wrap" id="card-hero"><Hero /></div>
        <div className="card-wrap" id="card-drawin"><DrawIn /></div>
        <div className="card-wrap" id="card-work"><Work onCaseOpen={setActiveCaseId} /></div>
        <div className="card-wrap" id="card-contact"><Contact /></div>
      </div>
      <CaseOverlay caseId={activeCaseId} onClose={() => setActiveCaseId(null)} />
      <CardScroll />
    </main>
  );
}
