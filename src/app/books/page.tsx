'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
    title: 'NERDS: A Brief History of the Internet',
    author: 'Stephen Segaller',
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
    title: 'Physics & Philosophy: The Revolution in Modern Science',
    author: 'Werner Heisenberg',
    cover: '/pp.jpg',
    pdf: '/pdfs/physics-philosophy.pdf',
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
    publisher: 'Teach Yourself',
    format: 'PDF',
  },
  {
    id: 4,
    title: 'The C Programming Language',
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
    title: 'Grokking Algorithms: An Illustrated Guide for Programmers and Other Curious People',
    author: 'Aditya Y. Bhargava',
    cover: '/dsa.jpg',
    pdf: '/pdfs/dsa.pdf',
    rating: 4,
    category: 'CSE',
    released: '2017',
    publisher: 'Manning Publications',
    format: 'PDF',
  },
  {
    id: 6,
    title: 'Study Guide to Accompany Sears, Zemansky, Young: University Physics, Seventh Edition',
    author: 'Mark W. Zemansky',
    cover: '/unip.jpg',
    pdf: '/pdfs/uni_physics.pdf',
    rating: 4,
    category: 'Physics',
    released: '2017',
    publisher: 'Addison-Wesley',
    format: 'PDF',
  },
];

const categories = ['Everything', 'Physics', 'Chemistry', 'Maths', 'CSE', 'ECE'];

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Everything');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked') || '[]');
      setBookmarked(savedBookmarks);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarked', JSON.stringify(bookmarked));
    }
  }, [bookmarked]);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev: number[]) =>
      prev.includes(id) ? prev.filter((bid: number) => bid !== id) : [...prev, id]
    );
  };

  const filteredBooks =
    selectedCategory === 'Everything'
      ? books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : books.filter(
          (book) =>
            book.category === selectedCategory &&
            (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.author.toLowerCase().includes(searchTerm.toLowerCase()))
        );

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

        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link}
                href={href}
                className={`px-3 py-1 rounded-md transition-all duration-300 ${
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
            const isActive = pathname === href;
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

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat ? 'bg-[#D15555] text-white border-[#D15555]' : 'bg-[#FFF5E6] text-[#5B4C3A] border-[#D9A679] hover:bg-[#FFE4C4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group border border-[#E2B991]"
              onClick={() => setSelectedBook(book)}
            >
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src={book.cover || '/book-placeholder.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-center mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-xs text-gray-600 text-center">{book.author}</p>
                <p className="text-xs text-center">{'★'.repeat(book.rating)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(book.id);
                  }}
                  className={`mt-2 w-full text-xs px-2 py-1 rounded-md transition-all duration-300 ${
                    bookmarked.includes(book.id)
                      ? 'bg-[#D15555] text-white'
                      : 'bg-[#FFF5E6] text-[#5B4C3A] border border-[#D9A679] hover:bg-[#FFE4C4]'
                  }`}
                >
                  {bookmarked.includes(book.id) ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedBook && (
          <aside className="fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 bg-[#FFF5E6] border-l border-[#D9A679] shadow-lg z-40 p-4 overflow-y-auto transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold line-clamp-2">{selectedBook.title}</h2>
              <button onClick={() => setSelectedBook(null)} className="text-[#5B4C3A] text-lg">✕</button>
            </div>
            <div className="w-full aspect-[2/3] relative mb-4">
              <Image
                src={selectedBook.cover}
                alt={selectedBook.title}
                fill
                className="object-cover rounded-lg shadow-sm"
              />
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
                className="block w-full text-center bg-[#D15555] text-white py-2 rounded-md hover:bg-[#B44646] transition-all duration-300"
              >
                Download PDF
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="block w-full text-center border border-[#D9A679] text-[#5B4C3A] py-2 rounded-md hover:bg-[#FFE4C4] transition-all duration-300"
              >
                Close
              </button>
            </div>
          </aside>
        )}
      </main>

      <footer className="w-full bg-[#F7E6D4] text-[#5B4C3A] p-3 text-center border-t border-[#E2B991] shadow-sm mt-auto">
        <p className="text-sm font-medium">Made For VIT-AP study resources | v1.1</p>
        <p className="text-sm font-medium">Created by Srijoy & Shagnik</p>
      </footer>
    </div>
  );
}