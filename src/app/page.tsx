'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

interface UserProfile {
  username: string;
  avatar_url: string;
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        let avatarUrl = '/default-avatar.png';
        if (profile?.avatar_url) {
          if (!profile.avatar_url.startsWith('http')) {
            const filePath = profile.avatar_url.replace('avatar/', '');
            const { data } = supabase.storage.from('avatar').getPublicUrl(filePath);
            avatarUrl = data.publicUrl || '/default-avatar.png';
          } else {
            avatarUrl = profile.avatar_url;
          }
        }

        setUser({
          username: profile?.username || 'User',
          avatar_url: avatarUrl,
        });
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    let filtered = resourcesData.filter((item) => item.subject === selectedCategory);
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setResources(filtered);
  }, [selectedCategory, searchTerm]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFEDD5] text-black font-sans antialiased">
   
      <header className="w-full px-4 md:px-8 py-3 flex justify-between items-center border-b border-[#E2B991] bg-[#F7E6D4] shadow-sm">
 
        <Link
          href="/"
          className="text-lg font-semibold text-[#D15555] hover:text-[#B44646] transition-colors duration-300"style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          GOSTUDY.COM
        </Link>

        
        <nav className="hidden md:flex space-x-6 text-md font-medium">
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
              className="border border-[#D9A679] bg-[#FFF5E6] rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            />
          </div>


          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2"
              >
                <div className="relative w-10 h-10 rounded-full cursor-pointer border border-[#D9A679] bg-[#FFF5E6] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-md font-bold text-[#5B4C3A] hidden md:block">{user.username}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-[#FFF5E6] border border-[#D9A679] rounded-md shadow-md w-40 z-10 overflow-hidden">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[#5B4C3A] hover:bg-[#FFE4C4] transition-colors duration-200"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#5B4C3A] hover:bg-[#FFE4C4] transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                href="/login"
                className="px-3 py-1 bg-[#FFF5E6] border border-[#D9A679] text-sm text-[#5B4C3A] rounded-md hover:bg-[#FFE4C4] transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1 bg-[#D15555] text-sm text-white rounded-md hover:bg-[#B44646] transition-all duration-300"
              >
                Signup
              </Link>
            </div>
          )}

 
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
            return (
              <Link
                key={link}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-sm hover:bg-[#FFE4C4] transition-colors duration-300 rounded-md"
              >
                {link}
              </Link>
            );
          })}
          {!user && (
            <>
              <Link href="/login" className="block px-3 py-2 text-sm hover:bg-[#FFE4C4] transition-colors duration-300 rounded-md">
                Login
              </Link>
              <Link href="/signup" className="block px-3 py-2 bg-[#D15555] text-sm text-white hover:bg-[#B44646] transition-colors duration-300 rounded-md">
                Signup
              </Link>
            </>
          )}
          {user && (
            <>
              <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-[#FFE4C4] transition-colors duration-300 rounded-md">
                Edit Profile
              </Link>
              <button onClick={handleLogout} className="block w-full px-3 py-2 text-sm hover:bg-[#FFE4C4] transition-colors duration-300 rounded-md text-left">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

 
      <main className="flex-1 container mx-auto p-4 md:p-6">
      
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border rounded-full text-md cursor-pointer font-medium transition-all duration-300 ${
                selectedCategory === cat ? 'bg-[#D15555] text-white border-[#D15555]' : 'bg-[#FFF5E6] text-[#5B4C3A] border-[#D9A679] hover:bg-[#FFE4C4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group border border-[#E2B991]"
              onClick={() => router.push(`/lectures/${encodeURIComponent(item.title)}`)}
            >
              <div className="relative w-full h-32 md:h-40">
                <Image
                  src={item.thumbnail || '/video-placeholder.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-center mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 text-center line-clamp-2">{item.description}</p>
                <span className="absolute bottom-2 right-2 text-xs text-[#5B4C3A] bg-[#FFF5E6] px-1.5 py-0.5 rounded-full border border-[#D9A679]">
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

  
      <footer className="w-full bg-[#F7E6D4] text-[#5B4C3A] p-3 text-center border-t border-[#E2B991] shadow-sm mt-auto">
        <p className="text-sm font-medium">Made For VIT-AP study resources | v1.1</p>
        <p className="text-sm font-medium">Made With ❤️ by Srijoy & Shagnik (1st Year Students)</p>
      </footer>
    </div>
  );
}