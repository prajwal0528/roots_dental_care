import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Star } from 'lucide-react';

const PHOTOS = [
  '/pic1.jpeg', '/pic2.jpeg', '/pic3.jpeg', '/pic4.jpeg', '/pic5.jpeg',
  '/pic6.jpeg', '/pic7.jpeg', '/pic8.jpeg', '/pic9.jpeg',
];

const VIDEOS = [
  '/Video1.mp4',
  '/Video2.mp4',
  '/Video3.mp4',
  '/Video4.mp4',
  '/Video5.mp4',
];

const REVIEWS = [
  {
    name: 'Aiman Jagirdar',
    date: '18/03/2026',
    rating: 5,
    text: 'Very clean, comfortable and friendly clinic. Must visit for any dental concerns.',
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLzrFU5BN0dQLo6kmNs9VWCb6Q613XNFCN1-mXjpFe0P1Ga=s120-c-rp-mo-br100',
  },
  {
    name: 'Sahila Mulla',
    date: '28/01/2026',
    rating: 5,
    text: "I recently visited and it was hands down the best dentist visit I've had. From the moment I walked in, the staff greeted me warmly and had zero wait time—impeccable organization! And was explained everything clearly, making me feel totally at ease despite my usual anxiety.",
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocJ3GDmZ0Xcyo_0spc1-5gPV0ONKQvP2vQsG91Xp3nARWMq7uw=s120-c-rp-mo-br100',
  },
  {
    name: 'Deepthi Navali',
    date: '27/01/2026',
    rating: 4,
    text: 'Dentist so good and soft care about the patient.',
    avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjX6C3_IzvRBo-nXghMk0U3QY2BV8B6ohDNRLbi5ll2Qm4fxCwA-kQ=s120-c-rp-mo-br100',
  },
  {
    name: 'Mahima M',
    date: '23/01/2026',
    rating: 5,
    text: 'I had a great experience at Root Dental Care Hospital. I went in for a permanent filling, and the entire process was smooth and comfortable. The staff were friendly and professional, making me feel at ease from start to finish. The dentist was thorough in explaining the procedure and ensured I was comfortable throughout. The clinic is well-maintained, and I truly appreciated the care and attention I received. I would highly recommend Root Dental Care Hospital to anyone seeking quality dental services.',
    avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjWzQm6DWkXPIGSf3TKuG6LRx4BwMkrJA_6eSEaoRRqWkFJIuOAYuw=s120-c-rp-mo-ba3-br100',
  },
  {
    name: 'Harsh',
    date: '13/01/2026',
    rating: 5,
    text: 'I visited for a cavity treatment and was extremely pleased with the experience. The doctor was very professional, took great care throughout the procedure, and explained the treatment plan in detail. Overall, it was a smooth and reassuring experience.',
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocI78Cu8jwomgTiIKZ_XIZhwbJUTr2CGTMHKJlzSRR5YHDAQmQ=s120-c-rp-mo-br100',
  },
  {
    name: 'Mazhar Rashadi',
    date: '07/01/2026',
    rating: 5,
    text: 'Alhamdulillah, they provide very good service here. I have been treated twice by me and my wife. Masha Allah, they have given very good treatment. We support the doctor.',
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocISME2c7OAvSkEdz0rd_rBRUfONqUCHumvby1NqIvx3j9LQWg=s120-c-rp-mo-br100',
  },
  {
    name: 'Shiva Kumar S',
    date: '23/12/2025',
    rating: 5,
    text: 'The Root dental care — one of the most caring and concerned for all their patients. After treatment they contact patients and enquire about their health. They say: need help or treatment? Contact us anytime. This is the very good treatment for teeth. I really appreciate their treatment. The one dental care: that is ROOT DENTAL CARE!',
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLfm8qAgLjv02ECcfOQwu980Kn_2radzVhOweysSBH4LE-Wyg=s120-c-rp-mo-br100',
  },
  {
    name: 'Irfana',
    date: '09/12/2025',
    rating: 5,
    text: 'The clinic is very professional and uses modern technology, which makes the whole experience smooth and comfortable. The staff are friendly, caring, and explain everything clearly. Highly recommended for anyone looking for quality dental care!',
    avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXw68HJ5frkTbRR1rLQBKn-_3Lp8ergoG3t__CtO5CDkeVoSzQt=s120-c-rp-mo-ba2-br100',
  },
  {
    name: 'Dr Syed Salim',
    date: '05/12/2025',
    rating: 5,
    text: 'Excellent Treatment, with best Price.',
    avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjWgV5hp9H8HNJNX-LymsjStGs90Jp4bi_byrJ4IUaBwtX924256=s120-c-rp-mo-br100',
  },
  {
    name: 'Mohammed Nayeem',
    date: '08/02/2025',
    rating: 5,
    text: 'Thank you very much for your prompt response.',
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKkm3vwxeda3shuMCJMNxwpKqDnNFrKkw7JmQO_oNlvIqtZnQ=s120-c-rp-mo-br100',
  },
];

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/ROOTS+DENTAL+CARE/@15.3638299,75.122068,17z/data=!3m1!5s0x3bb8d731580e4a41:0x4b60a1aa4228f541!4m16!1m9!3m8!1s0x3bb8d7a16311aa05:0xf35c2dbd1b28aed9!2sROOTS+DENTAL+CARE!8m2!3d15.3638299!4d75.1246429!9m1!1b1!16s%2Fg%2F11k3kw2w_y!3m5!1s0x3bb8d7a16311aa05:0xf35c2dbd1b28aed9!8m2!3d15.3638299!4d75.1246429!16s%2Fg%2F11k3kw2w_y?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D';

// ─── Google Icon ──────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          fill={i <= rating ? '#F59E0B' : 'none'}
          stroke={i <= rating ? '#F59E0B' : '#D1D5DB'}
        />
      ))}
    </div>
  );
}

// ─── Photo Lightbox ───────────────────────────────────────────────────────────
function PhotoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition"
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt="Gallery"
        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// ─── Video Lightbox ───────────────────────────────────────────────────────────
function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition z-10"
      >
        <X size={28} />
      </button>
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="w-full max-h-[85vh] bg-black"
          playsInline
        />
      </div>
    </div>
  );
}

// ─── Photo Slider ─────────────────────────────────────────────────────────────
function PhotoSlider() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const extended = [...PHOTOS, ...PHOTOS];
  const CARD_WIDTH_PERCENT = 100 / 4;
  const displayOffset = offset % PHOTOS.length;

  const next = () => setOffset((o) => o + 1);
  const prev = () => setOffset((o) => (o - 1 + PHOTOS.length) % PHOTOS.length);

  const startAuto = () => {
    autoRef.current = setInterval(() => setOffset((o) => o + 1), 3000);
  };
  const stopAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  return (
    <>
      <div className="relative" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        {/* Desktop */}
        <div className="hidden md:block overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${displayOffset * CARD_WIDTH_PERCENT}%)` }}
          >
            {extended.map((src, idx) => (
              <div
                key={idx}
                className="w-1/4 flex-shrink-0 px-2 cursor-pointer"
                onClick={() => setLightboxSrc(src)}
              >
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={src}
                    alt={`Clinic photo ${(idx % PHOTOS.length) + 1}`}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/400x300?text=Photo';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${displayOffset * 85}%)` }}
          >
            {extended.map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-2 cursor-pointer"
                style={{ width: '85%' }}
                onClick={() => setLightboxSrc(src)}
              >
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={src}
                    alt={`Clinic photo ${(idx % PHOTOS.length) + 1}`}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/400x300?text=Photo';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setOffset(i)}
            className={`rounded-full transition-all duration-300 ${
              displayOffset === i
                ? 'bg-blue-600 w-5 h-2'
                : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {lightboxSrc && (
        <PhotoLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ src, onOpen }: { src: string; onOpen: () => void }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative">
        <video
          src={src}
          className="w-full h-56 object-cover bg-black"
          playsInline
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={24} className="text-blue-700 ml-1" fill="#1d4ed8" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Video Slider ─────────────────────────────────────────────────────────────
function VideoSlider() {
  const [offset, setOffset] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const extended = [...VIDEOS, ...VIDEOS];
  const CARD_WIDTH_PERCENT = 100 / 3;
  const displayOffset = offset % VIDEOS.length;

  const next = () => setOffset((o) => o + 1);
  const prev = () => setOffset((o) => (o - 1 + VIDEOS.length) % VIDEOS.length);

  const startAuto = () => {
    autoRef.current = setInterval(() => setOffset((o) => o + 1), 4000);
  };
  const stopAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  return (
    <>
      <div className="relative" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        {/* Desktop */}
        <div className="hidden md:block overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${displayOffset * CARD_WIDTH_PERCENT}%)` }}
          >
            {extended.map((src, idx) => (
              <div key={idx} className="w-1/3 flex-shrink-0 px-3">
                <VideoCard src={src} onOpen={() => setLightboxSrc(src)} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${displayOffset * 100}%)` }}
          >
            {extended.map((src, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-2">
                <VideoCard src={src} onOpen={() => setLightboxSrc(src)} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition"
        >
          <ChevronRight size={20} />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setOffset(i)}
              className={`rounded-full transition-all duration-300 ${
                displayOffset === i
                  ? 'bg-blue-600 w-5 h-2'
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <VideoLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 120;
  const displayText =
    expanded || !isLong ? review.text : review.text.slice(0, 120) + '...';

  const colors = [
    '#4285F4', '#8D6E63', '#E57373', '#43A047',
    '#FF7043', '#AB47BC', '#00ACC1', '#F4511E',
  ];
  const avatarColor = colors[review.name.charCodeAt(0) % colors.length];
  const initials = review.name.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-base">{review.rating}</span>
          <StarRating rating={review.rating} />
        </div>
        <GoogleIcon />
      </div>

      <p className="text-gray-700 text-sm leading-relaxed flex-1">
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-blue-600 hover:underline ml-1 font-medium"
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </p>

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-100">
        {review.avatarUrl ? (
          <img
            src={review.avatarUrl}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              const fallback = img.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="w-10 h-10 rounded-full items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{
            backgroundColor: avatarColor,
            display: review.avatarUrl ? 'none' : 'flex',
          }}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
          <p className="text-gray-500 text-xs">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Reviews Slider ───────────────────────────────────────────────────────────
function ReviewsSlider() {
  const [offset, setOffset] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const extended = [...REVIEWS, ...REVIEWS];
  const CARD_WIDTH_PERCENT = 100 / 3;
  const displayOffset = offset % REVIEWS.length;

  const next = () => setOffset((o) => o + 1);
  const prev = () => setOffset((o) => (o - 1 + REVIEWS.length) % REVIEWS.length);

  const startAuto = () => {
    autoRef.current = setInterval(() => setOffset((o) => o + 1), 4500);
  };
  const stopAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  return (
    <div>
      <div className="relative" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        {/* Desktop */}
        <div className="hidden md:block overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${displayOffset * CARD_WIDTH_PERCENT}%)` }}
          >
            {extended.map((review, idx) => (
              <div key={idx} className="w-1/3 flex-shrink-0 px-3">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${displayOffset * 100}%)` }}
          >
            {extended.map((review, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-2">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white shadow-md flex items-center justify-center transition border border-white/30"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white shadow-md flex items-center justify-center transition border border-white/30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setOffset(i)}
            className={`rounded-full transition-all duration-300 ${
              displayOffset === i
                ? 'bg-white w-5 h-2'
                : 'bg-white/40 w-2 h-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* See All Reviews Button */}
      <div className="flex justify-center mt-8">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-gray-800 font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <GoogleIcon />
          See All Reviews on Google
        </a>
      </div>
    </div>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
export default function Gallery() {
  return (
    <>
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-14">

          {/* Photos */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Photos of Roots Dental Care in Hubballi
              </h2>
            </div>
            <PhotoSlider />
          </div>

          {/* Videos */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Videos of Roots Dental Care in Hubballi
              </h2>
            </div>
            <VideoSlider />
          </div>

        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16" style={{ backgroundColor: '#3D52A0' }}>
        <div className="container mx-auto px-6 md:px-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Client Testimonials about Roots Dental Care in Hubballi
            </h2>
          </div>
          <ReviewsSlider />
        </div>
      </section>
    </>
  );
}