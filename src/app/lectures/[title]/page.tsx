'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface VideoData {
  id: number;
  title: string;
  subject: string;
  type: string;
  youtubeUrl: string;
  pdf: string;
  description: string;
  homework: string;
  thumbnail: string;
  handwrittenNotes: string;
  cred: string;
}

const videoData: VideoData[] = [
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
    handwrittenNotes: "/pdfs/CS01.pdf",
    cred: "Aryan Mishra",
  },
  {
    id: 2,
    title: 'CS02: Python Basics for Beginners',
    subject: 'CSE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/BEYcTSpvu98',
    pdf: '/pdfs/CS2.pdf',
    description: 'An introduction to the basics of Python programming and how to design algorithms.',
    homework: '',
    handwrittenNotes: '/pdfs/CS02.pdf',
    cred: "Aryan Mishra",
    thumbnail:" "
  },
  {
    id: 3,
    title: 'E01: Writing Skills',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/mJ3nblxv8Jo',
    pdf: '/pdfs/E1.pdf',
    description: 'A session focusing on essential writing techniques and structure.',
    homework: '',
    handwrittenNotes: '',
    cred: "",
    thumbnail:" "
  },
  {
    id: 4,
    title: 'Math01: Number System & Binomial Algebra',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/l9ZIxU56aII',
    pdf: '/pdfs/MAT1.pdf',
    description: 'Covers fundamentals of number systems and introductory binomial theorems.',
    homework: '/M1.png',
    handwrittenNotes: '/pdfs/MAT01.pdf',
    cred: "Aryan Mishra",
    thumbnail:" "
  },
  {
    id: 5,
    title: 'Math02: Introduction to Matrices',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/5HQ8F41Zxk4',
    pdf: '/pdfs/MAT2.pdf',
    description: 'Understanding matrices, operations, and applications in engineering.',
    homework: '/M2.png',
    handwrittenNotes: '/pdfs/MAT02.pdf',
    cred: "Aryan Mishra",
    thumbnail:" "
  },
  {
    id: 6,
    title: 'E02: Introduction to Reading Comprehension',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/w1-lGZgIKqQ',
    pdf: '',
    description: 'A lecture focused on improving active and passive listening skills.',
    handwrittenNotes: '',
    cred: "",
    thumbnail: " ",
    homework: "",
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
    handwrittenNotes: "/pdfs/ec1.pdf",
    cred: "Aryan Mishra",
    homework:""
  },
  {
    id: 8,
    title: 'Math03: Functions',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/ZRVnNjHoX5k',
    pdf: '/pdfs/MAT3.pdf',
    description: 'Functions fundamentals',
    thumbnail: '/M3.png',
    handwrittenNotes: '/pdfs/MAT03.pdf',
    cred: "Aryan Mishra",
    homework:""
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
    handwrittenNotes: '',
    cred: "",
    homework:""
  },
  {
    id: 10,
    title: 'Phy01: Basic electricity',
    subject: 'PHYSICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/LPuh-hg1adg',
    pdf: '/pdfs/P1.pdf',
    description: 'Basics of electricity',
    thumbnail: '/P1.png',
    handwrittenNotes: "/pdfs/Ph1.pdf",
    cred: "Aryan Mishra",
    homework:""
  },
  {
    id: 11,
    title: 'ECE02:Kirchoffs Law',
    subject: 'ECE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/FbEATAEnQ6o',
    pdf: '/pdfs/EC2.pdf',
    description: 'Basics of electricity',
    thumbnail: '/ECE2.png',
    handwrittenNotes: "/pdfs/ECE2.pdf",
    cred: "Aryan Mishra",
    homework:""
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
    handwrittenNotes: "/pdfs/Che1.pdf",
    cred: "Aryan Mishra",
    homework:""
  },
  {
    id: 13,
    title: 'Phy02: Nano particles, Nano materials and Nanotech',
    subject: 'PHYSICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/r07B7GP0Ugc',
    pdf: '/pdfs/P3.pdf',
    description: 'Basics of Nano particles, Nanotech, Nano material and its importance',
    thumbnail: '/P3.png',
    handwrittenNotes: "/pdfs/Ph2.pdf",
    cred: "Aryan Mishra",
    homework:""
  },
  {
    id: 14,
    title: 'CHEM02: Electrochemistry and chemical sensors',
    subject: 'CHEMISTRY',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/CmLfoYdtb9A',
    pdf: '/pdfs/CHE02.pdf',
    description: 'Electrochemistry and its use in chemical sensors',
    thumbnail: '/CHE02.png',
    handwrittenNotes: "/pdfs/Che2.pdf",
    cred: "Aryan Mishra",
    homework:""
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
    handwrittenNotes: '',
    cred: "",
    homework:""
  },
  {
    id: 16,
    title: 'Math04: Derivatives',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/SpY7wHiLiEQ',
    pdf: 'no pdf for todays class',
    description: 'prof didnt have his mic turned ON',
    thumbnail: '/Mngm2.png',
    handwrittenNotes: '',
    cred: "",
    homework:""
  },
  {
    id: 17,
    title: 'E03: Indianism and common errors',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/fluFwsJeFv8',
    pdf: 'no pdf for todays class',
    description: 'get to know how to speak english',
    thumbnail: '/engd6.png',
    handwrittenNotes: '',
    cred: "",
    homework:""
  },
  {
    id: 18,
    title: 'CS03: Projects of seniors',
    subject: 'CSE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/qI1xBWG9L7o',
    pdf: 'no pdf for todays class',
    description: 'projects of seniors nothing to do anything with us',
    thumbnail: '/csd6.png',
    handwrittenNotes: '',
    cred: "",
    homework:""
  },
  {
    id: 19,
    title: 'CS04: World cinematic universe coding ',
    subject: 'CSE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/twwl8vrD_tM',
    pdf: '/pdfs/CSD7.pdf',
    description: 'some coding basics in python',
    thumbnail: '/CSD7.png',
    handwrittenNotes: '/pdfs/cse4.pdf',
    cred: "Aryan Mishra",
    homework:""
  },
  {
    id: 20,
    title: 'E04: Communication skills',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/ju1EvvS5_Ho',
    pdf: '/pdfs/ENGD7.pdf ',
    description: 'get to know how to communicate',
    thumbnail: '/ED7.png',
    handwrittenNotes: '/pdfs/eng4.pdf',
    cred: "Aryan Mishra",
    homework:""
  },
  {
    id: 21,
    title: 'Math05: Integration',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/02WcRfGV2-g',
    pdf: '/pdfs/MD7.pdf ',
    description: 'just integration',
    thumbnail: '/MD7.png',
    handwrittenNotes: '/pdfs/maths5.pdf',
    cred: "Aryan Mishra",
    homework:""
  },
];

export default function LecturePage() {
  const { title } = useParams();
  const pathname = usePathname();
  const decodedTitle = decodeURIComponent(title as string);
  const currentIndex = videoData.findIndex((vid) => vid.title === decodedTitle);
  const videoInfo = videoData[currentIndex];
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`watch-${decodedTitle}`);
    if (saved) setProgress(Number(saved));
  }, [decodedTitle]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen && window.innerWidth < 768 ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  if (!videoInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFEDD5]">
        <p className="text-xl font-semibold text-red-600">
          Video not found for: {decodedTitle}
        </p>
      </div>
    );
  }

  const { youtubeUrl, subject, pdf, description, homework } = videoInfo;
  const match = decodedTitle.match(/\b[A-Z]{2,}\d{2}\b/);
  const lectureCode = match ? match[0] : subject?.slice(0, 3).toUpperCase();
  const prevLecture = videoData[currentIndex - 1];
  const nextLecture = videoData[currentIndex + 1];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFEDD5] text-black font-sans antialiased">
      <header className="w-full px-4 md:px-8 py-3 flex justify-between items-center border-b border-[#E2B991] bg-[#F7E6D4] shadow-sm">
        <Link
          href="/"
          className="text-lg font-semibold text-[#D15555] hover:text-[#B44646] transition-colors duration-300"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          GOSTUDY.COM
        </Link>

        <nav className="hidden md:flex space-x-6 text-md font-medium">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href || (link === 'Lectures' && pathname.includes('/lectures'));
            return (
              <Link
                key={link}
                href={href}
                className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D15555] text-white'
                    : 'text-[#5B4C3A] hover:bg-[#FFE4C4]'
                }`}
              >
                {link}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#D9A679] bg-[#FFF5E6] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            />
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#5B4C3A] focus:outline-none">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-[#5B4C3A] rounded transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-[#5B4C3A] rounded transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-[#5B4C3A] rounded transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden bg-[#FFF5E6] border-b border-[#D9A679] overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#D9A679] bg-white rounded-md px-3 py-1 text-sm"
          />
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href || (link === 'Lectures' && pathname.includes('/lectures'));
            return (
              <Link
                key={link}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-sm hover:bg-[#FFE4C4] transition-colors duration-300 rounded-md ${isActive ? 'bg-[#D15555] text-white' : ''}`}
              >
                {link}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8">
        <div className="mb-2">
          <span className="inline-block bg-[#D15555] text-white text-xs px-3 py-1 rounded-full font-medium">
            {lectureCode || subject}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">{decodedTitle}</h1>

        {description && <p className="text-sm md:text-base text-gray-800 mb-4">{description}</p>}

        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <iframe
            src={youtubeUrl}
            title={decodedTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {progress > 0 && (
          <p className="text-sm mt-2 text-gray-700">
            Last watched at {Math.floor(progress)}s
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {pdf && (
            <a href={pdf} download className="bg-[#D15555] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#B44646] transition-all duration-300">
              Download Slides
            </a>
          )}
          {homework ? (
            <a href={homework} download className="bg-[#D15555] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#B44646] transition-all duration-300">
              Download Homework
            </a>
          ) : (
            <span className="text-sm text-gray-800 px-3 py-2 bg-[#FFF5E6] rounded-md border border-[#D9A679]">
              No homework available.
            </span>
          )}
        </div>

        {pdf && (
          <div className="mt-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Lecture Slides</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg">
              <iframe src={pdf} className="w-full h-[400px] md:h-[600px] lg:h-[800px]" loading="lazy" />
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Handwritten Notes {videoInfo.cred && <span>— Contributed by {videoInfo.cred.trim()}</span>}</h2>
          {videoInfo.handwrittenNotes ? (
            <div className="flex flex-col gap-3">
              <a
                href={videoInfo.handwrittenNotes}
                download
                className="bg-[#D15555] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#B44646] transition-all duration-300 inline-block w-fit"
              >
                Download Handwritten Notes
              </a>
              <iframe src={videoInfo.handwrittenNotes} className="w-full h-[400px] md:h-[600px] lg:h-[800px] rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg" loading="lazy" />
            </div>
          ) : (
            <div className="bg-[#FFF5E6] p-4 rounded-md shadow-sm border border-[#D9A679] text-sm text-gray-800">
              <p className="mb-2">Handwritten notes are not available yet.</p>
              <p>If you have notes for this lecture, please contribute by contacting us:</p>
              <ul className="list-disc list-inside mt-2">
                <li><strong>Discord:</strong> being_leo</li>
                <li><strong>Email:</strong> <a href="mailto:srijoyg07@gmail.com" className="text-[#D15555] underline hover:text-[#B44646]">srijoyg07@gmail.com</a></li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-between items-center">
          {prevLecture ? (
            <Link
              href={`/lectures/${encodeURIComponent(prevLecture.title)}`}
              className="text-sm px-4 py-2 bg-[#FFF5E6] text-[#5B4C3A] rounded-md border border-[#D9A679] hover:bg-[#FFE4C4] transition-all duration-300"
            >
              ← Previous Lecture
            </Link>
          ) : <div />}
          {nextLecture && (
            <Link
              href={`/lectures/${encodeURIComponent(nextLecture.title)}`}
              className="text-sm px-4 py-2 bg-[#FFF5E6] text-[#5B4C3A] rounded-md border border-[#D9A679] hover:bg-[#FFE4C4] transition-all duration-300"
            >
              Next Lecture →
            </Link>
          )}
        </div>
      </main>

      <footer className="w-full bg-[#F7E6D4] text-[#5B4C3A] p-3 text-center border-t border-[#E2B991] shadow-sm mt-auto">
        <p className="text-sm font-medium">Made For VIT-AP study resources | v1.1</p>
        <p className="text-sm font-medium">Created by Srijoy & Shagnik</p>
      </footer>
    </div>
  );
}