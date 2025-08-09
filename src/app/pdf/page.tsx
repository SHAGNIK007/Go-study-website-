'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

const pdfData = [
  { title: 'Introduction DSA Notes', src: '/pdfs/DSANotes.pdf' },
  { title: 'Calculus Made Easy Notes', src: '/pdfs/calculus_notes.pdf' },
  { title: 'Basic Concepts of Physics Notes', src: '/pdfs/physics_basics.pdf' },
];

function PDFContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const title = searchParams.get('title');
  const [src, setSrc] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const found = pdfData.find((item) => item.title === title);
    setSrc(found?.src ?? null);
  }, [title]);

  useEffect(() => {
    document.body.style.overflow = menuOpen && window.innerWidth < 768 ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  if (!src) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFEDD5] text-red-600 font-semibold text-lg">
        PDF not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEDD5] text-black relative pb-20">
     
      <header className="w-full px-6 md:px-16 py-4 flex justify-between items-center bg-[#FFEDD5] border-b shadow-md">
        <Link href="/" className="text-[#FC6D2F] text-xl font-bold tracking-wider" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          GOSTUDY.COM
        </Link>
        <nav className="hidden md:flex space-x-6">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link}
                href={href}
                className={`text-sm font-semibold px-4 py-1 rounded border transition ${
                  isActive ? 'bg-[#FC6D2F] text-black border-black' : 'hover:text-blue-600'
                }`}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-[6px]">
            <div className={`w-6 h-0.5 bg-black transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-black transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <nav className={`fixed top-0 right-0 z-40 h-full w-2/3 sm:w-1/2 bg-black text-white transform ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out p-6 space-y-6 rounded-l-lg shadow-lg md:hidden`}>
        {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
          const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
          const isActive = pathname === href;
          return (
            <Link
              key={link}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block text-lg font-semibold px-4 py-2 rounded border ${
                isActive ? 'bg-[#FC6D2F] text-black border-black' : 'hover:text-blue-500'
              }`}
            >
              {link.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          {title}
        </h1>

        <div className="flex justify-center mb-6">
          <a
            href={src}
            download
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all"
          >
            Download PDF
          </a>
        </div>

        <div className="flex justify-center">
          <iframe
            src={src}
            className="w-full max-w-5xl h-[80vh] rounded-xl border border-gray-400 shadow-xl"
            title={title ?? 'PDF Viewer'}
          />
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-[#FFEDD5] border-t py-2 text-center text-sm text-gray-700 font-medium">
        <p>Made for VIT-AP Study Resources | v1.0 🔥</p>
        <p>With ❤️ by being_leo & aqua.suxs</p>
      </footer>
    </div>
  );
}

export default function PDFViewer() {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
      <PDFContent />
    </Suspense>
  );
}
