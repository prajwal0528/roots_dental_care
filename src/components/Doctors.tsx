import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';

type Doctor = {
  name: string;
  specialty: string;
  experience: string;
  image: string;
  languages: string;
  description: string;
  fee: string;
};

const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Riyajahmad Mantur',
    specialty: 'Root Canal Specialist',
    experience: '18+ Years of Experience',
    image: '/Dr_Riyajahmad_Mantur.jpg',
    languages: 'English, Hindi, Kannada, Urdu, Arabic',
    description: 'Dr. Riyajahmad Mantur is a highly accomplished Root Canal Specialist with over 16 years of expertise in Conservative Dentistry and Endodontics. He is the Founder and Manager of Roots Dental Care, delivering exceptional endodontic treatments with a passion for excellence and a commitment to patient care across various healthcare systems.',
    fee: '₹250',
  },
  {
    name: 'Dr. Ayeshasiddiqa Mantur',
    specialty: 'Cosmetic Dentistry',
    experience: '14+ Years of Experience',
    image: '/Dr_Ayeshasiddiqa_Mantur.jpg',
    languages: 'English, Hindi, Kannada',
    description: "Dr. Ayesha Siddiqa Mantur, BDS, is a skilled dentist with 12 years of experience specializing in Cosmetic Dentistry. Dedicated to enhancing smiles and oral health, she offers personalized care tailored to each patient's unique needs. Available Monday to Saturday, she ensures each patient achieves optimal oral health and aesthetic results.",
    fee: '₹250',
  },
  {
    name: 'Dr. Ameet V Revankar',
    specialty: 'Braces and Aligner Specialist',
    experience: '19+ Years of Experience',
    image: '/Dr_Ameet_V_Revankar.jpg',
    languages: 'English, Hindi, Kannada',
    description: "Dr. Ameet V. Revankar, MDS in Orthodontics, brings over 17 years of specialized orthodontic experience and 26 years of comprehensive dental expertise. He is a certified Invisalign provider dedicated to providing advanced orthodontic solutions — from braces to clear aligners — ensuring precise treatments tailored to each patient's needs.",
    fee: '₹250',
  },
  {
    name: 'Dr. Abhishek Kavlekar',
    specialty: 'Dental Prosthesis and Implant Specialist',
    experience: '12+ Years of Experience',
    image: '/Dr_Abhishek_Kavlekar.jpg',
    languages: 'English, Hindi, Kannada',
    description: 'Dr. Abhishek Kavlekar is a highly skilled Prosthodontist and Implantologist with over 10 years of experience in restoring smiles and oral functionality. Specializing in dental implants, crowns, bridges, and dentures, he is dedicated to providing personalized, patient-centric care using the latest dental technologies.',
    fee: '₹250',
  },
  {
    name: 'Dr. Mahantesh Shirgavi',
    specialty: 'Impactions and Maxillofacial Surgeries',
    experience: '15+ Years of Experience',
    image: '/Dr_Mahantesh_Shirgavi.jpg',
    languages: 'English, Hindi, Kannada',
    description: 'Dr. Mahantesh Shirgavi is a highly skilled Oral and Maxillofacial Surgeon with 15 years of experience, specializing in impactions and complex maxillofacial surgeries. His expertise covers removal of impacted teeth, corrective jaw surgeries, and treatment of facial trauma with precise surgical techniques.',
    fee: '₹250',
  },
];

const WHATSAPP_NUMBER = '918904481179';

type BookingStep1 = { date: string; slot: string };
type BookingStep2 = {
  forSelf: boolean;
  name: string;
  age: string;
  gender: string;
  location: string;
  mobile: string;
  email: string;
  reason: string;
};

const MORNING_SLOTS = ['10:00 AM', '11:00 AM'];
const AFTERNOON_SLOTS = ['12:00 PM', '1:00 PM'];
const EVENING_SLOTS = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let day = 1; day <= totalDays; day++) days.push(day);
  return days;
}

function isDateInPast(year: number, month: number, day: number): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

function formatDateForSelection(year: number, month: number, day: number): string {
  return `${DAY_NAMES[new Date(year, month, day).getDay()]}\n${day}`;
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ doctor, onClose }: { doctor: Doctor; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<BookingStep1>({ date: '', slot: '' });
  const [step2, setStep2] = useState<BookingStep2>({
    forSelf: true, name: '', age: '', gender: '', location: '', mobile: '', email: '', reason: '',
  });

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const calendarDays = useMemo(() => getCalendarDays(currentYear, currentMonth), [currentYear, currentMonth]);

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };
  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const handleDateSelect = (day: number) => {
    const dateObj = new Date(currentYear, currentMonth, day);
    if (dateObj.getDay() === 0 || isDateInPast(currentYear, currentMonth, day)) return;
    setStep1(prev => ({ ...prev, date: formatDateForSelection(currentYear, currentMonth, day) }));
  };

  const handleNext = () => {
    if (!step1.date || !step1.slot) { alert('Please select a date and time slot.'); return; }
    setStep(2);
  };

  const handleConfirm = () => {
    if (!step2.name || !step2.age || !step2.gender || !step2.mobile || !step2.reason) {
      alert('Please fill all required fields.'); return;
    }
    const msg =
      'Hello, I would like to book an appointment at Roots Dental Care.' +
      '%0ADoctor: ' + doctor.name +
      '%0ASpecialty: ' + doctor.specialty +
      '%0ADate: ' + step1.date +
      '%0ATime: ' + step1.slot +
      '%0AFor: ' + (step2.forSelf ? 'Myself' : 'Someone else') +
      '%0AName: ' + step2.name +
      '%0AAge: ' + step2.age +
      '%0AGender: ' + step2.gender +
      '%0ALocation: ' + step2.location +
      '%0AMobile: ' + step2.mobile +
      '%0AEmail: ' + step2.email +
      '%0AReason: ' + step2.reason;
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
    onClose();
  };

  const slotBtn = (s: string) =>
    step1.slot === s
      ? 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white'
      : 'px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 text-gray-700 hover:border-blue-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-800">
                <ArrowLeft size={18} />
              </button>
            )}
            <span className="font-bold text-gray-900 text-base">Book an Appointment</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
        </div>

        {step === 1 && (
          <div className="px-5 py-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Select Date &amp; Time
              <span className="ml-2 text-xs text-green-600 font-normal">8 Slots Available</span>
            </p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <button onClick={handlePrevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition">
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-semibold text-gray-800">{MONTH_NAMES[currentMonth]} {currentYear}</span>
                <button onClick={handleNextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition">
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_NAMES.map(day => (
                  <div key={day} className={`text-center text-xs font-semibold py-1 ${day === 'SUN' ? 'text-red-500' : 'text-gray-500'}`}>
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;
                  const dateObj = new Date(currentYear, currentMonth, day);
                  const isSunday = dateObj.getDay() === 0;
                  const isPast = isDateInPast(currentYear, currentMonth, day);
                  const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  const isSelected = step1.date === formatDateForSelection(currentYear, currentMonth, day);
                  const isDisabled = isSunday || isPast;

                  let btnClass = 'aspect-square flex items-center justify-center text-xs font-medium rounded-lg transition ';
                  if (isDisabled) btnClass += 'text-gray-300 cursor-not-allowed';
                  else if (isSelected) btnClass += 'bg-blue-600 text-white font-bold';
                  else if (isToday) btnClass += 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50';
                  else btnClass += 'text-gray-700 hover:bg-blue-50 hover:text-blue-600';

                  return (
                    <button key={day} className={btnClass} disabled={isDisabled} onClick={() => handleDateSelect(day)}>
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded border-2 border-blue-500" /> Today</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600" /> Selected</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200" /> Sunday (Closed)</div>
              </div>
            </div>

            {[['Morning Slots', MORNING_SLOTS], ['Afternoon Slots', AFTERNOON_SLOTS], ['Evening Slots', EVENING_SLOTS]].map(([label, slots]) => (
              <div key={label as string} className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">{label as string}</p>
                <div className="flex flex-wrap gap-2">
                  {(slots as string[]).map(s => (
                    <button key={s} className={slotBtn(s)} onClick={() => setStep1(prev => ({ ...prev, slot: s }))}>{s}</button>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={handleNext} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="px-5 py-4">
            <p className="text-sm text-gray-700 mb-3">I am booking appointment for</p>
            <div className="flex gap-6 mb-4">
              {[{ label: 'Myself', val: true }, { label: 'Someone else', val: false }].map(({ label, val }) => (
                <label key={label} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="forWhom" checked={step2.forSelf === val}
                    onChange={() => setStep2(prev => ({ ...prev, forSelf: val }))} className="accent-blue-600" />
                  {label}
                </label>
              ))}
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-3">Patient Details</p>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Name*" value={step2.name}
                onChange={e => setStep2(prev => ({ ...prev, name: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-400" />

              <div className="flex gap-2">
                <input type="number" placeholder="Age*" value={step2.age}
                  onChange={e => setStep2(prev => ({ ...prev, age: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:border-blue-400" />
                {['Male', 'Female'].map(g => (
                  <button key={g} onClick={() => setStep2(prev => ({ ...prev, gender: g }))}
                    className={step2.gender === g
                      ? 'px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white'
                      : 'px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:border-blue-400'}>
                    {g}
                  </button>
                ))}
              </div>

              <input type="text" placeholder="Location*" value={step2.location}
                onChange={e => setStep2(prev => ({ ...prev, location: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-400" />

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-400">
                <span className="px-3 py-2 bg-gray-50 text-sm text-gray-600 border-r border-gray-300">+91</span>
                <input type="tel" placeholder="Mobile Number*" value={step2.mobile}
                  onChange={e => setStep2(prev => ({ ...prev, mobile: e.target.value }))}
                  className="flex-1 px-3 py-2 text-sm focus:outline-none" />
              </div>

              <input type="email" placeholder="Email ID" value={step2.email}
                onChange={e => setStep2(prev => ({ ...prev, email: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-400" />

              <textarea placeholder="Reason for Visit*" value={step2.reason}
                onChange={e => setStep2(prev => ({ ...prev, reason: e.target.value }))}
                rows={3} className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-400 resize-none" />
            </div>

            <button onClick={handleConfirm}
              className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm">
              Confirm Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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

// ─── Doctor Card ──────────────────────────────────────────────────────────────
function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-64 object-cover object-top"
          onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Doctor+Photo'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-lg font-bold leading-tight">{doctor.name}</p>
          <p className="text-sm text-blue-200">{doctor.specialty}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-blue-700 font-semibold text-sm mb-2">{doctor.experience}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1">{doctor.description}</p>
        <p className="text-xs text-gray-500 mb-4">
          <span className="font-semibold text-gray-700">Languages: </span>{doctor.languages}
        </p>
        <button
          onClick={onBook}
          className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 rounded-xl transition text-sm"
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const N = DOCTORS.length;

  const desktop = useInfiniteCarousel(N, 3);
  const mobile = useInfiniteCarousel(N, 1);

  const buildExtended = (cloneCount: number) => {
    const head = DOCTORS.slice(N - cloneCount);
    const tail = DOCTORS.slice(0, cloneCount);
    return [...head, ...DOCTORS, ...tail];
  };

  const desktopExtended = useMemo(() => buildExtended(3), []);
  const mobileExtended  = useMemo(() => buildExtended(1), []);

  return (
    <section id="doctors" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">The Medical Practitioners Who Care for You</h2>
          <p className="text-gray-500 text-base">Meet our team of experienced dental specialists</p>
        </div>

        {/* ── Desktop (≥ md): show 3 cards ── */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden">
            <div
              ref={desktop.trackRef}
              className={desktop.animated ? 'flex transition-transform duration-500 ease-in-out' : 'flex'}
              style={{ transform: `translateX(-${desktop.index * (100 / 3)}%)` }}
            >
              {desktopExtended.map((doctor, idx) => (
                <div key={`d-${idx}`} className="w-1/3 flex-shrink-0 px-3">
                  <DoctorCard doctor={doctor} onBook={() => setSelectedDoctor(doctor)} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={desktop.prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-10 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={desktop.next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 z-10 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {DOCTORS.map((_, i) => (
              <button
                key={i}
                onClick={() => desktop.jumpTo(i)}
                className={`rounded-full transition-all duration-300 ${desktop.realIndex === i ? 'bg-blue-600 w-5 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile (< md): show 1 card with nav buttons BELOW ── */}
        <div className="md:hidden">
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={mobile.trackRef}
              className={mobile.animated ? 'flex transition-transform duration-500 ease-in-out' : 'flex'}
              style={{ transform: `translateX(-${mobile.index * 100}%)` }}
            >
              {mobileExtended.map((doctor, idx) => (
                <div key={`m-${idx}`} className="w-full flex-shrink-0 px-2">
                  <DoctorCard doctor={doctor} onBook={() => setSelectedDoctor(doctor)} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation row below the card */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={mobile.prev}
              className="flex items-center gap-1 px-4 py-2 rounded-full border border-blue-200 bg-white text-blue-600 text-sm font-medium hover:bg-blue-50 transition shadow-sm"
            >
              <ChevronLeft size={18} />
              Prev
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {DOCTORS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => mobile.jumpTo(i)}
                  className={`rounded-full transition-all duration-300 ${mobile.realIndex === i ? 'bg-blue-600 w-5 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'}`}
                />
              ))}
            </div>

            <button
              onClick={mobile.next}
              className="flex items-center gap-1 px-4 py-2 rounded-full border border-blue-200 bg-white text-blue-600 text-sm font-medium hover:bg-blue-50 transition shadow-sm"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {selectedDoctor && (
        <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </section>
  );
}