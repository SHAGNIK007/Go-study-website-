'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { video } from 'framer-motion/client';

const videoData = [
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
    handwrittenNotes:"/pdfs/CS01.pdf",
    cred:"Aryan Mishra",
  },
  {
    title: 'CS02: Python Basics for Beginners',
    youtubeUrl: 'https://www.youtube.com/embed/BEYcTSpvu98',
    subject: 'CSE',
    pdf: '/pdfs/CS2.pdf',
    description: 'An introduction to the basics of Python programming and how to design algorithms.',
    homework: '',
    handwrittenNotes: '/pdfs/CS02.pdf',
    cred:"Aryan Mishra ",
  },
  {
    title: 'E01: Writing Skills',
    youtubeUrl: 'https://www.youtube.com/embed/mJ3nblxv8Jo',
    subject: 'ENGLISH',
    pdf: '/pdfs/E1.pdf',
    description: 'A session focusing on essential writing techniques and structure.',
    homework: '',
    handwrittenNotes: '',
    cred:" ",
  },
  {
    title: 'Math01: Number System & Binomial Algebra',
    youtubeUrl: 'https://www.youtube.com/embed/l9ZIxU56aII',
    subject: 'MATHEMATICS',
    pdf: '/pdfs/MAT1.pdf',
    description: 'Covers fundamentals of number systems and introductory binomial theorems.',
    homework: '/M1.png',
    handwrittenNotes: '/pdfs/MAT01.pdf',
    cred:" Aryan Mishra",
  },
  {
    title: 'Math02: Introduction to Matrices',
    youtubeUrl: 'https://www.youtube.com/embed/5HQ8F41Zxk4',
    subject: 'MATHEMATICS',
    pdf: '/pdfs/MAT2.pdf',
    description: 'Understanding matrices, operations, and applications in engineering.',
    homework: '/M2.png',
    handwrittenNotes: '/pdfs/MAT02.pdf',
    cred:" Aryan Mishra",
  },
  {
    title: 'E02: Introduction to Reading Comprehension',
    youtubeUrl: 'https://www.youtube.com/embed/w1-lGZgIKqQ',
    subject: 'ENGLISH',
    pdf: '',
    description: 'A lecture focused on improving active and passive listening skills.',
    handwrittenNotes: '',
    cred:" ",
  },
    {
   
    title: 'ECE01: Fundementals of electrical and electronics engineering',
    subject: 'ECE',

    youtubeUrl: 'https://www.youtube.com/embed/nqMlXbfoX44',
    pdf: '/ec1.pdf',
    description: 'Introduction to basics of electrical engineering , conductors , semiconductors , etc.',
    handwrittenNotes: '',
    cred:" ",
  },
     {
    
    title: 'Math03: Functions',
    subject: 'MATHEMATICS',

    youtubeUrl: 'https://www.youtube.com/embed/ZRVnNjHoX5k',
    pdf: '/pdfs/MAT3.pdf',
    description: 'Functions fundementals',
    thumbnail: '/M3.png',
    handwrittenNotes: '/pdfs/MAT03.pdf',
    cred:"Aryan Mishra ",
  },
     {
  
    title: 'MANGEMENT01: FINANCE FOR ENGINEERS',
    subject: 'MANAGEMENT',
  
    youtubeUrl: 'https://www.youtube.com/embed/8khIp20Avw0',
    pdf: '',
    description: 'Functions fundementals',
    cred:" ",
    
  },
            {
    id: 10,
    title: 'Phy01: Basic electricity',
    subject: 'PHYSICS',
   
    youtubeUrl: 'https://www.youtube.com/embed/LPuh-hg1adg',
    pdf: '/pdfs/P1.pdf',
    description: 'Basics of electricity',
    thumbnail: '/P1.png',
    cred:" ",
  },
  {
    id: 10,
    title: 'Phy01: Basic electricity',
    subject: 'PHYSICS',
   
    youtubeUrl: 'https://www.youtube.com/embed/LPuh-hg1adg',
    pdf: '/pdfs/P1.pdf',
    description: 'Basics of electricity',
    thumbnail: '/P1.png',
    cred:" ",
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
    cred:" ",
  },
              {
    id: 12,
    title: 'CHEM01:Chemistry and environmental studies',
    subject: 'CHEMISTRY',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/tp2L-77oJcc',
    pdf: '/pdfs/CHE01.pdf',
    description: 'Basics of electricity',
    thumbnail: '/ECE2.png',
    cred:" ",
  },
     {
    id: 13,
    title: 'Phy02:Nano particles , Nano materials and Nanotech',
    subject: 'PHYSICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/r07B7GP0Ugc',
    pdf: '/pdfs/P3.pdf',
    description: 'Basics of Nano particles , Nanotech ,Nano material and its importance',
    thumbnail: '/P3.png',
    cred:" ",
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
    cred:" ",
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
    cred:" ",
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
    cred:"Aryan Mishra ",
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
    cred:"Aryan Mishra ",
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
    cred:"Aryan Mishra ",
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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-[#FFEDD5] text-black pb-10 relative">
      <header className="w-full px-4 md:px-12 py-4 flex justify-between items-center border-b bg-[#FFEDD5] shadow-sm">
        <Link href="/" className="transition-transform hover:scale-105">
          <h1 className="text-xl font-bold text-[#FC6D2F] tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            GOSTUDY.COM
          </h1>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        <nav className="hidden md:flex space-x-6">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href || (link === 'Lectures' && pathname.includes('/lectures'));
            return (
              <Link
                key={link}
                href={href}
                className={`text-sm font-semibold px-4 py-1 rounded border transition-all ${
                  isActive ? 'bg-[#FC6D2F] text-black border-black' : 'text-black hover:text-blue-600'
                }`}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </header>

      
      <nav className={`fixed top-0 right-0 z-30 h-screen w-2/3 sm:w-1/2 bg-black text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col p-6 space-y-6 rounded-l-lg shadow-lg md:hidden`}>
      {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
          const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
         const isActive = pathname === href || (link === 'Lectures' && pathname.includes('/lectures'));
          return (
            <Link
              key={link}
           href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-semibold px-4 py-2 rounded border ${
        isActive ? 'bg-[#FC6D2F] text-black border-black' : 'hover:text-blue-500'
              }`}
            >
              {link.toUpperCase()}
               </Link>
          );
        })}
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
     <div className="mb-2">
          <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full font-mono">
            {lectureCode || subject}
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-2">{decodedTitle}</h1>

        {description && <p className="text-sm text-gray-800 mb-4">📝 {description}</p>}

          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
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
            ⏱️ Last watched at {Math.floor(progress)}s
          </p>
        )}

              <div className="mt-4 flex flex-wrap gap-3">
          {pdf && (
            <a href={pdf} download className="bg-[#FC6D2F] text-black px-4 py-2 rounded shadow hover:bg-orange-400">
              ⬇️ Download Slides
            </a>
          )}
      {homework ? (
            <a href={homework} download className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800">
              📝 Download Homework
            </a>
          ) : (
            <span className="text-sm text-gray-800 px-3 py-2 bg-yellow-100 rounded">
              📝 No homework today.
            </span>
          )}
        </div>

        {pdf && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Lecture Slides</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
              <iframe src={pdf} className="w-full h-[500px]" loading="lazy" />
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Handwritten Notes {videoInfo.cred && <span>— Made by {videoInfo.cred}</span>}</h2>
          {videoInfo.handwrittenNotes ? (
            <div className="flex flex-col gap-3">
              <a
                href={videoInfo.handwrittenNotes}
                download
                className="bg-[#FC6D2F] text-black border-black px-4 py-2 rounded shadow inline-block w-fit"
              >
                Download Handwritten Notes
              </a>
              <iframe src={videoInfo.handwrittenNotes} className="w-full h-[500px] rounded shadow" loading="lazy" />
            </div>
          ) : (
            <div className="bg-yellow-100 p-4 rounded shadow text-sm text-gray-800">
              <p className="mb-2">Handwritten notes haven&apos;t been uploaded yet.</p>
              <p>If you&apos;ve made notes for this lecture, please send them to me:</p>
              <ul className="list-disc list-inside mt-2">
                <li><strong>Discord:</strong> <code>being_leo</code></li>
                <li><strong>Email:</strong> <a href="mailto:srijoyg07@gmail.com" className="text-blue-700 underline">srijoyg07@gmail.com</a></li>
              </ul>
            </div>
          )}
        </div>

    <div className="mt-10 flex justify-between items-center">
          {prevLecture ? (
            <Link
              href={`/lectures/${encodeURIComponent(prevLecture.title)}`}
              className="text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              ⬅️ Prev Lecture
            </Link>
          ) : <div />}
           {nextLecture && (
            <Link
              href={`/lectures/${encodeURIComponent(nextLecture.title)}`}
              className="text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Next Lecture ➡️
            </Link>
          )}
        </div>
      </main>

      <footer className="text-center text-xs mt-10 text-gray-600">
        <p>Made For VIT-AP study resources | v1.0 🔥</p>
        <p>Made With ❤️ by Srijoy &amp; Shagnik (1st Year Students)</p>
      </footer>
    </div>
  );
}
