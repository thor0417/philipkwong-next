import { Contact } from '@/components/Contact/Contact';
import CardScroll from '@/components/CardScroll/CardScroll';

/**
 * Replicates the home page card-scroll contact reveal for subpages.
 * Content card uses #card-work (reuses existing CSS + Nav dark-state check).
 * Contact card is fixed at bottom via #card-contact in globals.css.
 */
export function SubpageWithContact({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="scroll-stage">
        <div className="card-wrap" id="card-work">
          {children}
        </div>
        <div className="card-wrap" id="card-contact">
          <Contact />
        </div>
      </div>
      <CardScroll />
    </>
  );
}
