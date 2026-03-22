import { MapPin, Clock, Phone, Navigation, Share2, Star, ChevronDown, CalendarDays } from 'lucide-react';
import { useState, useEffect } from 'react';

type Slot = { open: string; close: string };

const HOURS: Record<string, Slot[]> = {
  Monday:    [{ open: '10:00 AM', close: '2:00 PM' }, { open: '5:00 PM', close: '8:00 PM' }],
  Tuesday:   [{ open: '10:00 AM', close: '2:00 PM' }, { open: '5:00 PM', close: '8:00 PM' }],
  Wednesday: [{ open: '10:00 AM', close: '2:00 PM' }, { open: '5:00 PM', close: '8:00 PM' }],
  Thursday:  [{ open: '10:00 AM', close: '2:00 PM' }, { open: '5:00 PM', close: '8:00 PM' }],
  Friday:    [{ open: '10:00 AM', close: '2:00 PM' }, { open: '5:00 PM', close: '8:00 PM' }],
  Saturday:  [{ open: '10:00 AM', close: '2:00 PM' }, { open: '5:00 PM', close: '8:00 PM' }],
};

const DAYS: string[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

function parseTime(t: string): number {
  const parts = t.split(' ');
  const period = parts[1];
  const timeParts = parts[0].split(':');
  let h = parseInt(timeParts[0], 10);
  const m = parseInt(timeParts[1], 10);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function getStatus(day: string): { label: string; open: boolean; slots: string } {
  const slots = HOURS[day];
  if (!slots) {
    return { label: 'Closed Today', open: false, slots: 'Closed' };
  }
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  let isOpen = false;
  for (let i = 0; i < slots.length; i++) {
    if (cur >= parseTime(slots[i].open) && cur < parseTime(slots[i].close)) {
      isOpen = true;
      break;
    }
  }
  const slotStr = slots[0].open + ' - ' + slots[0].close + '  |  ' + slots[1].open + ' - ' + slots[1].close;
  return {
    label: isOpen ? 'Open Now' : 'Closed Now',
    open: isOpen,
    slots: slotStr,
  };
}

export default function Hero() {
  const [hoursOpen, setHoursOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [today, setToday] = useState<string>('');
  const [status, setStatus] = useState<{ label: string; open: boolean; slots: string }>({
    label: '',
    open: false,
    slots: '',
  });

  useEffect(() => {
    const day = DAYS[new Date().getDay()];
    setToday(day);
    setStatus(getStatus(day));
  }, []);

  const toggleHours = () => {
    setHoursOpen(function(prev) { return !prev; });
  };

  const scrollToDoctors = () => {
    const section = document.getElementById('doctors');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const badgeClass = status.open
    ? 'text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500 text-white'
    : 'text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500 text-white';

  const chevronClass = hoursOpen
    ? 'ml-auto text-gray-500 transition-transform duration-200 rotate-180'
    : 'ml-auto text-gray-500 transition-transform duration-200';

  return (
    <>
      <section id="home" className="pt-28 pb-0 bg-[#dde3ef]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 items-center min-h-[340px]">

            <div className="py-10">

              <h1 className="text-5xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                Roots Dental Care
              </h1>

              <p className="text-sm font-semibold text-black-600 mb-4">
                Dental clinic in Hubballi, Dharwad
              </p>

              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg font-bold text-gray-800">5</span>
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map(function(i) {
                    return <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />;
                  })}
                </div>
                <a
                  href="https://www.google.com/maps/place/ROOTS+DENTAL+CARE/@15.3638299,75.122068,17z/data=!3m1!5s0x3bb8d731580e4a41:0x4b60a1aa4228f541!4m16!1m9!3m8!1s0x3bb8d7a16311aa05:0xf35c2dbd1b28aed9!2sROOTS+DENTAL+CARE!8m2!3d15.3638299!4d75.1246429!9m1!1b1!16s%2Fg%2F11k3kw2w_y!3m5!1s0x3bb8d7a16311aa05:0xf35c2dbd1b28aed9!8m2!3d15.3638299!4d75.1246429!16s%2Fg%2F11k3kw2w_y?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm font-medium ml-1"
                >
                  90+ Reviews
                </a>
              </div>

              <div className="flex items-start gap-3 mb-4 text-black-700 text-sm">
                <MapPin size={17} className="text-black-500 mt-0.5 shrink-0" />
                <div>
                  <p>1st floor, Hubli Central Mall, above Vishal Mega Mart,</p>
                  <p>beside Shushruta Hospital, Vidya Nagar, Hubballi</p>
                  <p>Dharwad - 580021</p>
                </div>
              </div>

              {/* ── DESKTOP: absolute dropdown, floats over image, original behaviour ── */}
              <div className="mb-4 relative inline-block hidden md:inline-block">
                <button
                  onClick={toggleHours}
                  className="flex items-center gap-2 text-sm text-black-700"
                >
                  <Clock size={17} className="text-black-500 shrink-0" />
                  <span className="font-medium">
                    {today !== '' ? status.slots : 'Loading...'}
                  </span>
                  {status.label !== '' && (
                    <span className={badgeClass}>
                      {status.open ? 'Open' : 'Closed'}
                    </span>
                  )}
                  <ChevronDown size={14} className={chevronClass} />
                </button>

                {hoursOpen && (
                  <div className="absolute left-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 text-sm whitespace-nowrap">
                    {Object.keys(HOURS).map(function(day) {
                      const slots = HOURS[day];
                      const rowClass = day === today
                        ? 'flex justify-between gap-6 px-3 py-1.5 bg-blue-50 font-semibold text-blue-800'
                        : 'flex justify-between gap-6 px-3 py-1.5 text-gray-700 hover:bg-gray-50';
                      return (
                        <div key={day} className={rowClass}>
                          <span>{day}</span>
                          <span className="text-gray-500">
                            {slots[0].open + ' - ' + slots[0].close + ',  ' + slots[1].open + ' - ' + slots[1].close}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between gap-6 px-3 py-1.5 text-gray-400 border-t border-gray-100">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ── MOBILE: inline dropdown, day name + stacked times, no overflow ── */}
              <div className="mb-4 md:hidden">
                <button
                  onClick={toggleHours}
                  className="flex items-center gap-2 text-sm text-black-700"
                >
                  <Clock size={17} className="text-black-500 shrink-0" />
                  <span className="font-medium">
                    {today !== '' ? status.slots : 'Loading...'}
                  </span>
                  {status.label !== '' && (
                    <span className={badgeClass}>
                      {status.open ? 'Open' : 'Closed'}
                    </span>
                  )}
                  <ChevronDown size={14} className={chevronClass} />
                </button>

                {hoursOpen && (
                  <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm">
                    {Object.keys(HOURS).map(function(day) {
                      const slots = HOURS[day];
                      const isToday = day === today;
                      return (
                        <div
                          key={day}
                          className={`px-3 py-2 ${isToday ? 'bg-blue-50 font-semibold text-blue-800' : 'text-gray-700'}`}
                        >
                          <span className="block font-medium">{day}</span>
                          <span className="block text-gray-500 text-xs pl-3">
                            {slots[0].open + ' - ' + slots[0].close + ','}
                          </span>
                          <span className="block text-gray-500 text-xs pl-3">
                            {slots[1].open + ' - ' + slots[1].close}
                          </span>
                        </div>
                      );
                    })}
                    <div className="px-3 py-2 text-gray-400 border-t border-gray-100">
                      <span className="block font-medium">Sunday</span>
                      <span className="block text-xs pl-3">Closed</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-7 text-gray-800 text-xl font-semibold">
                <Phone size={20} className="text-black-600 shrink-0" />
                <a href="tel:+918904481179" className="hover:text-blue-700 transition">
                  8904481179
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&origin=&destination=15.3638809,75.1246557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-900 transition shadow-md"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
                <button
                  onClick={function() {
                    if (navigator.share) {
                      navigator.share({ title: 'Roots Dental Care', url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      });
                    }
                  }}
                  className="flex items-center gap-2 border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-50 transition"
                >
                  <Share2 size={16} />
                  {copied ? 'Link Copied!' : 'Share'}
                </button>
              </div>

            </div>

            <div className="flex justify-center items-end h-full">
              <img
                src="/home.png"
                alt="Roots Dental Care"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>
      </section>

      <div className="bg-[#1a2a4a] text-white px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-3 shrink-0">
            <CalendarDays size={28} className="text-[#1a2a4a]" />
          </div>
          <div>
            <p className="text-2xl font-bold leading-tight">Open for Appointments</p>
            <p className="text-base text-gray-300 mt-1">We are delighted to announce that our doors are open, and we are now accepting appointments to serve you better</p>
          </div>
        </div>
        <button
          onClick={scrollToDoctors}
          className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-bold px-7 py-3 rounded-full transition shadow-md text-sm"
        >
          Book An Appointment
        </button>
      </div>
    </>
  );
}