import { Menu, X, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home',       id: 'home' },
    { label: 'About',      id: 'about' },
    { label: 'Doctors',    id: 'doctors' },
    { label: 'Treatments', id: 'services' },
    { label: 'Gallery',    id: 'gallery' },
    { label: 'FAQ',        id: 'faq' },
    { label: 'Contact',    id: 'contact' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>

      {/* Top blue bar */}
      <div className="bg-blue-600 text-white py-1.5">
        <div className="w-full px-4 flex justify-between items-center text-xs" style={{ boxSizing: 'border-box' }}>
          <div className="flex items-center gap-1.5 min-w-0">
            <Phone size={13} className="flex-shrink-0" />
            <span className="truncate">+91 8904481179</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin size={13} className="flex-shrink-0" />
            <span className="truncate">Hubballi, Karnataka</span>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="w-full px-4" style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center py-2">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="/roots-dental-logo.jpg"
              alt="Roots Dental Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop Book Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex-shrink-0"
          >
            Book Appointment
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex-shrink-0 p-1"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col border-t border-gray-100 mt-1">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition font-medium py-3 px-2 rounded-lg"
              >
                {label}
              </button>
            ))}
            {/* Book Appointment in mobile menu too */}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Book Appointment
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}