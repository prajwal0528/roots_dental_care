import { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, ChevronDown } from 'lucide-react';

const SERVICES = [
  '3D Imaging', 'Apicoectomy', 'Braces/Orthodontics', 'Clear Aligners',
  'Complete Oral Checkup', 'Cosmetic Dentistry', 'Cosmetic Procedures',
  'Cracked Teeth', 'Dental Bonding', 'Dental Cleaning', 'Dental Crowns',
  'Dental Surgery', 'Dentures And Bridges', 'Endodontic Retreatment',
  'Endodontic Surgery', 'Extractions', 'Fillings And Sealants',
  'Invisalign Treatment', 'Mouth Guards', 'Oral Prophylaxis', 'Oral Surgery',
  'Relieve Toothache', 'Root Canal Treatment', 'Teeth Reshaping',
  'Tooth Cap/Crown', 'Tooth Whitening', 'Veneers & Crowns', 'Other',
];

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsApp = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number to book an appointment.');
      return;
    }
    const text = `Hi, I'd like to book an appointment at Roots Dental Care.

*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service || 'N/A'}
*Message:* ${message || 'N/A'}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918904481179?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="px-4" style={{ maxWidth: '100%' }}>

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Get In Touch</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Book an appointment or reach out — we're here to help you smile better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* ── Left: Info + Map ── */}
          <div className="flex flex-col gap-8">

            {/* Clinic Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">Address</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1st floor, Hubli Central Mall,<br />
                    above Vishal Mega Mart,<br />
                    beside Shushruta Hospital,<br />
                    Vidya Nagar, Hubballi<br />
                    Dharwad – 580021
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">Phone</p>
                  <a
                    href="tel:+918904481179"
                    className="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    +91 8904481179
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5 flex gap-4 items-start sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">Clinic Timings</p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-800">Morning:</span> 10:00 AM – 02:00 PM
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-800">Evening:</span> 05:00 PM – 09:00 PM
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Sunday Holiday</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '320px' }}>
              <iframe
                title="Roots Dental Care Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.0!2d75.122068!3d15.3638299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7a16311aa05%3A0xf35c2dbd1b28aed9!2sROOTS%20DENTAL%20CARE!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Right: Booking Form ── */}
          <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Book an Appointment</h3>
            <p className="text-gray-500 text-sm mb-7">
              Fill in your details and we'll connect you instantly via WhatsApp.
            </p>

            <div className="flex flex-col gap-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Service Required
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-10"
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Additional Message
                </label>
                <textarea
                  placeholder="Any specific concerns or questions..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                />
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-200 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-200 hover:scale-[1.02]"
              >
                <MessageCircle size={22} />
                Book via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}