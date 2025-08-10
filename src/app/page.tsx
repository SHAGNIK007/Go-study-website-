'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Resource {
  id: number;
  title: string;
  subject: string;
  type: string;
  youtubeUrl: string;
  pdf?: string;
  description?: string;
  homework?: string;
  thumbnail?: string;
  cred?: string;
}

const categories = ['CSE', 'ECE', 'MATHEMATICS', 'ENGLISH', 'PHYSICS', 'CHEMISTRY', 'MANAGEMENT'];

const resourcesData: Resource[] = [
  {
    id: 1,
    title: 'CS01: Introduction to algorithm',
    subject: 'CSE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/dkTOJXPBgpM',
    pdf: '/pdfs/CS1.pdf',
    description: 'An overview of algorithms with practical applications and introductory concepts.',
    homework: '/CS1H.png',
    thumbnail: '/C1.png',
  },
  {
    id: 4,
    title: 'CS02: Python Basics for Beginners',
    subject: 'CSE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/BEYcTSpvu98',
    pdf: '/pdfs/CS2.pdf',
    description: 'An introduction to basics of Python programming and how to deal and design algorithms.',
    homework: '',
    thumbnail: '/C2.png',
  },
  {
    id: 2,
    title: 'Math01: Number System & Binomial Algebra',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/l9ZIxU56aII',
    pdf: '/pdfs/MAT1.pdf',
    description: 'Covers fundamentals of number systems and introductory binomial theorems.',
    thumbnail: '/M1.png',
  },
  {
    id: 3,
    title: 'E01: Writing Skills',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/mJ3nblxv8Jo',
    pdf: '/pdfs/E1.pdf',
    description: 'An introduction to basic writing techniques and academic communication.',
    thumbnail: '/E1.png',
  },
  {
    id: 5,
    title: 'Math02: Introduction to Matrices',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/Ag-C6FFmUu8',
    pdf: '/pdfs/MAT2.pdf',
    description: 'Covers fundamentals of matrices and their use in solving linear equations.',
    homework: '',
    thumbnail: '/M2.png',
  },
  {
    id: 6,
    title: 'E02: Introduction to Reading Comprehension',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/w1-lGZgIKqQ',
    pdf: '/pdfs/E2.pdf',
    description: 'Techniques to master reading comprehension and interpretative analysis.',
    thumbnail: '/E2.png',
  },
  {
    id: 7,
    title: 'ECE01: Fundementals of electrical and electronics engineering',
    subject: 'ECE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/nqMlXbfoX44',
    pdf: '/pdfs/E2.pdf',
    description: 'Introduction to basics of electrical engineering , conductors , semiconductors , etc.',
    thumbnail: '/ECE1.png',
  },
  {
    id: 8,
    title: 'Math03: Functions',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/ZRVnNjHoX5k',
    pdf: '/pdfs/MAT3.pdf',
    description: 'Functions fundementals',
    thumbnail: '/M3.png',
  },
  {
    id: 9,
    title: 'MANGEMENT01: FINANCE FOR ENGINEERS',
    subject: 'MANAGEMENT',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/8khIp20Avw0',
    pdf: '',
    description: 'Functions fundementals',
    thumbnail: '/Mngm1.png',
  },
  {
    id: 10,
    title: 'Phy01: Basic electricity',
    subject: 'PHYSICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/LPuh-hg1adg',
    pdf: '/pdfs/P2.png',
    description: 'Basics of electricity',
    thumbnail: '/P1.png',
  },
  {
    id: 11,
    title: 'ECE02:Kirchoffs Law',
    subject: 'ECE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/FbEATAEnQ6o',
    pdf: '',
    description: 'Basics of electricity',
    thumbnail: '/ECE2.png',
  },
  {
    id: 12,
    title: 'CHEM01:Chemistry and environmental studies',
    subject: 'CHEMISTRY',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/tp2L-77oJcc',
    pdf: '/pdfs/CHE01.pdf',
    description: 'Basic Chemistry',
    thumbnail: '/CHE01.png',
  },
  {
    id: 13,
    title: 'Phy02:Nano particles , Nano materials and Nanotech',
    subject: 'PHYSICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/r07B7GP0Ugc',
    pdf: '/pdfs/CHE01.pdf',
    description: 'Basics of Nano particles , Nanotech ,Nano material and its importance',
    thumbnail: '/P3.png',
  },
  {
    id: 14,
    title: 'CHEM02:Electrochemisty and chemical sensors',
    subject: 'CHEMISTRY',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/CmLfoYdtb9A',
    pdf: '/pdfs/CHE02.pdf',
    description: 'Electrochemistry and its use in chemical sensors',
    thumbnail: '/CHE02.png',
  },
  {
    id: 15,
    title: 'MANGEMENT02:Blooms reveresed taxonomy',
    subject: 'MANAGEMENT',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/EF5zWZzOTGc',
    pdf: '/pdfs/Mngm02.pdf',
    description: 'some management stuff  u wont need anyways',
    thumbnail: '/Mngm2.png',
  },
];

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('CSE');
  const [resources, setResources] = useState<Resource[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔹 Login states
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  // Filter resources
  useEffect(() => {
    const filteredResources = resourcesData.filter((item) => item.subject === selectedCategory);
    setResources(filteredResources);
  }, [selectedCategory]);

  // Menu scroll lock
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Show popup only first visit
  useEffect(() => {
    const hasLoggedIn = localStorage.getItem('hasLoggedIn');
    if (hasLoggedIn) {
      setShowLogin(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hasLoggedIn', 'true');
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentCourse', course);
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-[#FFEDD5] text-black relative">
      {/* 🔹 Login Popup */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FFEDD5] p-6 rounded-2xl shadow-lg w-96 border-2 border-[#FC6D2F]">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#FC6D2F]">
              Welcome to GOSTUDY
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-[#FC6D2F] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC6D2F]"
                required
              />
              <input
                type="text"
                placeholder="Enter your college course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="border border-[#FC6D2F] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC6D2F]"
                required
              />
              <button
                type="submit"
                className="bg-[#FC6D2F] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full px-4 md:px-12 py-4 flex justify-between items-center border-b bg-[#FFEDD5] shadow-sm">
        <Link href="/" className="cursor-pointer transition-transform duration-200 hover:scale-105">
          <h1 style={{ fontFamily: "'Press Start 2P', cursive", color: '#FC6D2F', fontSize: '24px', margin: 0 }}>
            GOSTUDY.COM
          </h1>
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        <nav className="hidden md:flex space-x-4 md:space-x-6">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link}
                href={href}
                className={`text-sm md:text-base font-semibold px-3 py-1 rounded border transition ${
                  isActive ? 'bg-[#FC6D2F] text-black border-black' : 'text-black hover:text-blue-600'
                }`}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Mobile nav */}
      <nav
        className={`${isMenuOpen ? 'flex flex-col slide-in' : 'hidden'} md:hidden fixed top-0 right-0 bg-black text-white p-6 shadow-md rounded-l-lg w-1/2 h-screen z-20`}
      >
        {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
          const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
          const isActive = pathname === href;
          return (
            <Link
              key={link}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-3 text-sm font-semibold px-4 rounded border transition ${
                isActive ? 'bg-[#FC6D2F] text-black border-black' : 'hover:text-blue-600'
              }`}
              style={{ marginBottom: '1rem' }}
            >
              {link.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      {/* Main content */}
      <main className="container mx-auto p-6">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border rounded-full font-medium text-sm ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer group"
              onClick={() => router.push(`/lectures/${encodeURIComponent(item.title)}`)}
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.thumbnail || '/video-placeholder.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-3 relative">
                <h3 className="font-semibold text-sm text-center">{item.title}</h3>
                <span className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full bg-[#FFEDD5] text-gray-500 p-2 fixed bottom-0 left-0 text-center">
        <p className="text-sm font-semibold">Made For VIT-AP study resources| v1.0 🔥</p>
        <p className="text-sm font-semibold">Made With ❤️ by Srijoy & Shagnik (1st Year Students)</p>
      </footer>
    </div>
  );
}
