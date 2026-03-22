import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const TREATMENTS = [
  {
    title: '3D Imaging',
    description:
      "3D Imaging in dentistry provides detailed, accurate views of a patient's oral structures. Using advanced technology, it helps dentists diagnose issues, plan treatments, and monitor progress with precision, ensuring better outcomes and personalized care.",
  },
  {
    title: 'Apicoectomy',
    description:
      "Apicoectomy is a surgical procedure to remove the tip of a tooth's root and surrounding infected tissue. It's performed when root canal therapy fails or infection persists. The procedure helps save the tooth and restore oral health.",
  },
  {
    title: 'Braces/Orthodontics',
    description:
      'Orthodontics focusses on diagnosing, preventing, and treating dental and facial irregularities. Braces are a common orthodontic appliance used to correct misaligned teeth and jaws, improving both function and appearance.',
  },
  {
    title: 'Clear Aligners',
    description:
      'Clear aligners are a type of orthodontic treatment that uses a series of custom-made, clear plastic trays to gradually straighten teeth. They are a popular alternative to traditional braces for correcting misaligned teeth.',
  },
  {
    title: 'Complete Oral Checkup',
    description:
      'A Complete Oral Checkup includes a thorough examination of your teeth, gums, and mouth to detect any issues like cavities, gum disease, or oral cancer. It typically involves X-rays, professional cleaning, and personalized care advice to maintain optimal oral health.',
  },
  {
    title: 'Cosmetic Dentistry',
    description:
      'Cosmetic Dentistry enhances smiles with treatments like whitening, veneers, and bonding. Focused on aesthetics and function, it corrects imperfections, restores confidence, and improves oral health, offering personalized solutions for a radiant, attractive smile.',
  },
  {
    title: 'Cosmetic Procedures',
    description:
      'Dental Cosmetic Procedures are designed to enhance the appearance of your smile and improve overall dental aesthetics. These treatments address various concerns such as tooth discoloration, misalignment, and damage, and can significantly boost self-confidence and oral health.',
  },
  {
    title: 'Cracked Teeth',
    description:
      'Cracked Teeth can result from trauma, grinding, or large fillings. Symptoms include pain, sensitivity, and discomfort. Early treatment is essential to prevent further damage. Options may include bonding, crowns, or root canals, depending on severity.',
  },
  {
    title: 'Dental Bonding',
    description:
      'Dental Bonding is a cosmetic dental procedure used to improve the appearance of teeth by applying a tooth-colored resin material. This versatile treatment is effective for correcting a range of dental issues, including chipped, cracked, or discolored teeth, as well as gaps between teeth.',
  },
  {
    title: 'Dental Cleaning',
    description:
      'Dental Cleaning involves the removal of plaque, tartar, and stains from teeth to prevent decay and gum disease. Performed by dental hygienists, it includes scaling, polishing, and fluoride treatment to maintain oral health and ensure a bright, healthy smile.',
  },
  {
    title: 'Dental Crowns',
    description:
      'Dental Crowns are custom-made caps that cover damaged or decayed teeth, restoring their shape, size, and function. They protect weakened teeth, improve appearance, and can be made from various materials, including porcelain, metal, or a combination.',
  },
  {
    title: 'Dental Surgery',
    description:
      'Dental Surgery involves procedures to correct or treat issues within the mouth, including tooth extractions, implants, and gum treatments. It addresses complex dental problems, often requiring precision and expertise to restore oral health and function.',
  },
  {
    title: 'Dentures And Bridges',
    description:
      'Dentures And Bridges are common prosthetic solutions used to replace missing teeth and restore oral function and aesthetics. They play a crucial role in enhancing quality of life by allowing individuals to eat, speak, and smile with confidence.',
  },
  {
    title: 'Endodontic Retreatment',
    description:
      'Endodontic Retreatment is a procedure to address issues in a previously treated root canal. It involves removing the old filling, cleaning, and re-sealing the root canals to resolve persistent pain or infection, ensuring long-term tooth health and function.',
  },
  {
    title: 'Endodontic Surgery',
    description:
      'Endodontic Surgery, or root canal surgery, involves the removal of infected or damaged tissue from inside a tooth. It helps preserve the tooth by treating issues that cannot be resolved with standard root canal therapy, ensuring long-term dental health.',
  },
  {
    title: 'Extractions',
    description:
      "Dental Extractions involve the removal of a tooth from its socket in the jawbone. This procedure is typically performed due to decay, damage, or overcrowding. It can be simple or surgical, depending on the tooth's condition and location.",
  },
  {
    title: 'Fillings And Sealants',
    description:
      'Dental fillings restore teeth damaged by cavities, while sealants protect against decay by covering the chewing surfaces. Both treatments help maintain oral health by addressing damage and preventing future issues.',
  },
  {
    title: 'Invisalign Treatment',
    description:
      'Transform your smile with Invisalign treatment from our experienced endodontist. Say goodbye to traditional braces and hello to a discreet and comfortable solution for straighter teeth.',
  },
  {
    title: 'Mouth Guards',
    description:
      'Mouth Guards protect teeth during sports or from teeth grinding. Custom-fitted by a dentist, they cushion impacts and reduce the risk of injury. Ideal for athletes and those with bruxism, they help preserve oral health and prevent damage.',
  },
  {
    title: 'Oral Prophylaxis',
    description:
      'Oral prophylaxis is a professional dental cleaning procedure designed to remove plaque, tartar, and stains from teeth, preventing tooth decay and gum disease. It helps maintain optimal oral health and is typically performed by dental hygienists or dentists.',
  },
  {
    title: 'Oral Surgery',
    description:
      'Oral Surgery involves surgical procedures to treat dental issues such as tooth extractions, jaw reconstruction, and treatment of oral diseases. It addresses complex cases requiring surgical intervention for improved oral health and function.',
  },
  {
    title: 'Relieve Toothache',
    description:
      'Relieve Toothache quickly with these tips: rinse with warm salt water, apply a cold compress, use over-the-counter pain relievers, and avoid very hot or cold foods. For persistent pain, consult your dentist for a thorough evaluation and treatment.',
  },
  {
    title: 'Root Canal Treatment',
    description:
      "We specialize in root canal treatment, a procedure to remove infected pulp, relieve pain, and save your tooth from extraction. Our expert care ensures precise cleaning, sealing, and restoration, preserving your tooth's natural structure and function.",
  },
  {
    title: 'Teeth Reshaping',
    description:
      'Teeth Reshaping is a cosmetic dental procedure that gently alters the shape, length, or surface of teeth to enhance their appearance. It\'s a quick, painless solution for correcting minor imperfections like uneven edges or slight overcrowding.',
  },
  {
    title: 'Tooth Cap/Crown',
    description:
      'A Tooth Cap, or Crown, is a dental restoration that covers a damaged or weakened tooth to restore its shape, size, and function. Made from materials like porcelain, metal, or a combination, crowns protect the tooth and enhance its appearance.',
  },
  {
    title: 'Tooth Whitening',
    description:
      'Tooth Whitening enhances your smile by removing stains and discoloration. Using professional-grade products or treatments, it can brighten teeth significantly, giving you a whiter, more radiant smile. Consult your dentist for safe, effective whitening options.',
  },
  {
    title: 'Veneers & Crowns',
    description:
      'Veneers are thin shells bonded to the front of teeth to enhance appearance, while crowns cover damaged or weakened teeth to restore shape and function. Both offer aesthetic improvements and protection, making them popular choices for dental restoration.',
  },
];

// ─── Infinite Carousel Hook ───────────────────────────────────────────────────
function useInfiniteCarousel(totalItems: number, visibleCount: number) {
  const cloneCount = visibleCount;
  const [index, setIndex] = useState(cloneCount);
  const [animated, setAnimated] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const realIndex = useMemo(() => {
    const raw = (index - cloneCount) % totalItems;
    return raw < 0 ? raw + totalItems : raw;
  }, [index, cloneCount, totalItems]);

  const next = () => setIndex(i => i + 1);
  const prev = () => setIndex(i => i - 1);
  const jumpTo = (i: number) => { setAnimated(true); setIndex(i + cloneCount); };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onTransitionEnd = () => {
      if (index < cloneCount) {
        setAnimated(false);
        setIndex(totalItems + index);
      } else if (index >= totalItems + cloneCount) {
        setAnimated(false);
        setIndex(index - totalItems);
      }
    };
    track.addEventListener('transitionend', onTransitionEnd);
    return () => track.removeEventListener('transitionend', onTransitionEnd);
  }, [index, totalItems, cloneCount]);

  useEffect(() => {
    if (!animated) {
      const t = setTimeout(() => setAnimated(true), 20);
      return () => clearTimeout(t);
    }
  }, [animated]);

  return { index, realIndex, animated, trackRef, next, prev, jumpTo, cloneCount };
}

// ─── Treatment Modal ──────────────────────────────────────────────────────────
function TreatmentModal({
  title,
  description,
  onClose,
}: {
  title: string;
  description: string;
  onClose: () => void;
}) {
  // Close on backdrop click
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h3 className="text-blue-600 font-bold text-2xl mb-4 pr-8 leading-snug">{title}</h3>

        {/* Full description */}
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold py-3 rounded-full transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Treatment Card ───────────────────────────────────────────────────────────
function TreatmentCard({
  title,
  description,
  number,
  onReadMore,
}: {
  title: string;
  description: string;
  number: number;
  onReadMore: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full p-6 relative overflow-hidden">
      {/* Large background number */}
      <span
        className="absolute top-3 right-4 text-6xl font-extrabold select-none pointer-events-none"
        style={{ color: 'rgba(59,130,246,0.08)', lineHeight: 1 }}
      >
        {number}
      </span>

      <h3 className="text-blue-600 font-bold text-xl mb-3 leading-snug pr-8">{title}</h3>

      <p className="text-gray-600 text-base leading-relaxed flex-1 line-clamp-5">{description}</p>

      <button onClick={onReadMore} className="mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold py-2.5 rounded-full transition-colors duration-200">
        Read More
      </button>
    </div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
export default function Services() {
  const [selectedTreatment, setSelectedTreatment] = useState<{ title: string; description: string } | null>(null);
  const VISIBLE_DESKTOP = 3;
  const VISIBLE_MOBILE = 1;
  const N = TREATMENTS.length; // 27

  const desktop = useInfiniteCarousel(N, VISIBLE_DESKTOP);
  const mobile = useInfiniteCarousel(N, VISIBLE_MOBILE);

  const buildExtended = (cloneCount: number) => {
    const head = TREATMENTS.slice(N - cloneCount);
    const tail = TREATMENTS.slice(0, cloneCount);
    return [...head, ...TREATMENTS, ...tail];
  };

  const desktopExtended = useMemo(() => buildExtended(VISIBLE_DESKTOP), []);
  const mobileExtended  = useMemo(() => buildExtended(VISIBLE_MOBILE), []);

  return (
    <section
      id="services"
      className="py-16"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f0f9ff 50%, #e8f4fd 100%)' }}
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Treatments we provide in<br className="hidden md:block" />{' '}
            Roots Dental Care in Hubballi
          </h2>
        </div>

        {/* ── Desktop (≥ md): 3 cards ── */}
        <div className="hidden md:block relative">
          {/* Left arrow */}
          <button
            onClick={desktop.prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center justify-center transition"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="overflow-hidden mx-2">
            <div
              ref={desktop.trackRef}
              className={desktop.animated ? 'flex transition-transform duration-500 ease-in-out' : 'flex'}
              style={{ transform: `translateX(-${desktop.index * (100 / VISIBLE_DESKTOP)}%)` }}
            >
              {desktopExtended.map((t, idx) => {
                // Compute the display number (1-based) for original item position
                const originalIdx = (idx - VISIBLE_DESKTOP + N) % N;
                return (
                  <div key={`d-${idx}`} className="w-1/3 flex-shrink-0 px-4">
                    <TreatmentCard
                      title={t.title}
                      description={t.description}
                      number={originalIdx + 1}
                      onReadMore={() => setSelectedTreatment({ title: t.title, description: t.description })}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={desktop.next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center justify-center transition"
          >
            <ChevronRight size={22} />
          </button>

          {/* Progress indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-8">
            {TREATMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => desktop.jumpTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  desktop.realIndex === i
                    ? 'bg-blue-600 w-5 h-2'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile (< md): 1 card ── */}
        <div className="md:hidden relative">
          {/* Left arrow */}
          <button
            onClick={mobile.prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center justify-center transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="overflow-hidden mx-1">
            <div
              ref={mobile.trackRef}
              className={mobile.animated ? 'flex transition-transform duration-500 ease-in-out' : 'flex'}
              style={{ transform: `translateX(-${mobile.index * 100}%)` }}
            >
              {mobileExtended.map((t, idx) => {
                const originalIdx = (idx - VISIBLE_MOBILE + N) % N;
                return (
                  <div key={`m-${idx}`} className="w-full flex-shrink-0 px-2">
                    <TreatmentCard
                      title={t.title}
                      description={t.description}
                      number={originalIdx + 1}
                      onReadMore={() => setSelectedTreatment({ title: t.title, description: t.description })}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={mobile.next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-10 w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center justify-center transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* Progress dots */}
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {TREATMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => mobile.jumpTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  mobile.realIndex === i
                    ? 'bg-blue-600 w-4 h-2'
                    : 'bg-gray-300 w-2 h-2'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {selectedTreatment && (
        <TreatmentModal
          title={selectedTreatment.title}
          description={selectedTreatment.description}
          onClose={() => setSelectedTreatment(null)}
        />
      )}
    </section>
  );
}