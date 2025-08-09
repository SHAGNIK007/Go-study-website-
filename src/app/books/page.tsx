'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  pdf: string;
  rating: number;
  category: string;
  released: string;
  publisher: string;
  format: string;
}

const books: Book[] = [
  {
    id: 1,
    title: 'NERDS : A BREIF HISTORY OF THE INTERNET',
    author: 'STEPHEN SEGALLER',
    cover: '/nerds.jpg',
    pdf: '/pdfs/nerds.pdf',
    rating: 5,
    category: 'CSE',
    released: '1998',
    publisher: 'PBS',
    format: 'PDF',
  },
  {
    id: 2,
    title: 'Physics & Philosophy: The revolution in modern science',
    author: 'Werner Hisenberg',
    cover: '/pp.jpg',
    pdf: '/pdfs/physics-philosphy.pdf',
    rating: 5,
    category: 'Physics',
    released: '1967',
    publisher: 'Harper & Row',
    format: 'PDF',
  },
  {
    id: 3,
    title: 'Logic: A Complete Introduction: Teach Yourself',
    author: 'Siu-Fan Lee',
    cover: '/logic.jpg',
    pdf: '/pdfs/logic.pdf',
    rating: 5,
    category: 'CSE',
    released: '2017',
    publisher: 'Teach yourself',
    format: 'PDF',
  },
  {
    id: 4,
    title: 'The C Programming Language ',
    author: 'Brian Kernighan and Dennis Ritchie',
    cover: '/c.jpg',
    pdf: '/pdfs/C.pdf',
    rating: 4,
    category: 'CSE',
    released: '1988',
    publisher: 'Prentice Hall PTR',
    format: 'PDF',
  },
  {
    id: 5,
    title: 'Grokking Algorithms : An Illustrated Guide for Programmers and Other Curious People',
    author: 'Aditya Y. Bhargava',
    cover: '/dsa.jpg',
    pdf: '/pdfs/dsa.pdf',
    rating: 4,
    category: 'CSE',
    released: '2017',
    publisher: ' unkown ',
    format: 'PDF',
  },
  {
    id: 6,
    title: 'Study guide to accompany Sears, Zemansky, Young: University physics, Seventh edition',
    author: 'Zemansky',
    cover: '/unip.jpg',
    pdf: '/pdfs/uni_physics.pdf',
    rating: 4,
    category: 'Physics',
    released: '2017',
    publisher: ' unkown ',
    format: 'PDF',
  },
];

const categories = ['Everything', 'Physics', 'Chemistry', 'Maths', 'CSE', 'ECE'];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Everything');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookmarked, setBookmarked] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('bookmarked') || '[]');
    }
    return [];
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem('bookmarked', JSON.stringify(bookmarked));
  }, [bookmarked]);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev: number[]) =>
      prev.includes(id) ? prev.filter((bid: number) => bid !== id) : [...prev, id]
    );
  };

  const filteredBooks =
    selectedCategory === 'Everything'
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5ede2] text-black font-mono">
      <header className="w-full px-4 md:px-12 py-4 flex justify-between items-center border-b bg-[#f5ede2] shadow-sm">
        <Link href="/">
          <h1 className="text-2xl font-bold" style={{fontFamily: "'Press Start 2P', cursive", color: '#FC6D2F' }}>
            GOSTUDY.COM
          </h1>
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        <nav className="hidden md:flex space-x-6">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link key={link} href={href} className={`text-sm font-semibold px-3 py-1 border rounded ${isActive ? 'bg-[#FC6D2F] text-black border-black' : 'hover:text-blue-600'}`}>
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex gap-2 overflow-x-auto mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border rounded font-mono text-sm whitespace-nowrap ${selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white border rounded shadow p-2 hover:shadow-xl cursor-pointer transition duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-[2/3] w-full mb-2" onClick={() => setSelectedBook(book)}>
                  <Image src={book.cover} alt={book.title} fill className="object-cover rounded" />
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-bold leading-tight line-clamp-2">{book.title}</h3>
                  <p className="text-[10px] italic text-gray-600">{book.author}</p>
                  <p className="text-xs">{'★'.repeat(book.rating)}</p>
                  <button
                    onClick={() => toggleBookmark(book.id)}
                    className={`mt-1 text-xs px-2 py-1 rounded ${bookmarked.includes(book.id) ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {bookmarked.includes(book.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedBook && (
          <aside className="w-full md:w-[350px] fixed right-0 top-0 h-full bg-white border-l shadow-lg z-40 p-4 overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{selectedBook.title}</h2>
              <button onClick={() => setSelectedBook(null)} className="text-black text-lg">✕</button>
            </div>
            <div className="w-full aspect-[2/3] relative mb-4">
              <Image src={selectedBook.cover} alt={selectedBook.title} fill className="object-cover rounded" />
            </div>
            <p className="text-sm"><strong>Author:</strong> {selectedBook.author}</p>
            <p className="text-sm"><strong>Rating:</strong> {'★'.repeat(selectedBook.rating)}</p>
            <p className="text-sm"><strong>Released:</strong> {selectedBook.released}</p>
            <p className="text-sm"><strong>Format:</strong> {selectedBook.format}</p>
            <p className="text-sm"><strong>Publisher:</strong> {selectedBook.publisher}</p>
            <div className="mt-4 space-y-2">
              <a
                href={selectedBook.pdf}
                target="_blank"
                className="block w-full text-center bg-black text-white py-2 rounded hover:bg-gray-900"
              >
                Download PDF
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="block w-full text-center border border-black text-black py-2 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </aside>
        )}
      </main>

      <footer className="w-full bg-[#f5ede2] text-gray-600 p-2 text-center">
        <p className="text-sm font-semibold">Made For VIT-AP study resources | v1.0 🔥</p>
        <p className="text-sm font-semibold">Made With ❤️ by Srijoy & Shagnik (1st Year Students)</p>
      </footer>
    </div>
  );
}
