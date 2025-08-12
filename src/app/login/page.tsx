'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { FaDiscord } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/hero2.jpg',
      title: 'Immersive Learning',
      description: 'Explore interactive ebooks and audiobooks with synchronized narration and highlighted text.',
    },
    {
      image: '/story3.jpg',
      title: 'Seamless Study Experience',
      description: 'Access a vast library of resources tailored for your academic success.',
    },
    {
      image: '/story1.jpg',
      title: 'Engage and Achieve',
      description: 'Boost your learning with curated notes, lectures, and more.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      router.push('/');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const signInWithProvider = async (provider: 'discord') => {
    setError('');
    setLoading(true);

    const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: redirectUrl },
      });

      if (error) throw error;
    } catch (err: unknown) {
      console.error('OAuth login error:', err);
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong with Discord login');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFEDD5] text-[#5B4C3A] font-sans antialiased">
      <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-12 border-b md:border-b-0 md:border-r border-[#E2B991] overflow-hidden">
        <div className="relative w-full max-w-lg h-[300px] sm:h-[400px] md:h-[500px] rounded-lg shadow-lg overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-semibold text-white animate-slide-up">{slide.title}</h2>
                <p className="text-sm text-white/90 mt-1 animate-slide-up delay-100">{slide.description}</p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#D15555] w-4' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#5B4C3A] font-['Press_Start_2P']">Login to GoStudy</h1>
          <p className="text-sm text-gray-700 mb-6">
            Access lectures, books, and notes at VIT AP. Let’s keep it on top! 🚀
          </p>

          <button
            onClick={() => signInWithProvider('discord')}
            className="flex items-center justify-center w-full border border-[#D9A679] rounded-md py-2 mb-3 bg-[#FFF5E6] text-[#5B4C3A] hover:bg-[#FFE4C4] transition-all duration-300"
            disabled={loading}
          >
            <FaDiscord className="text-[#5865F2] mr-2" /> Continue with Discord
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#D9A679]"></div>
            <span className="px-3 text-gray-600 text-sm">or login with</span>
            <div className="flex-grow border-t border-[#D9A679]"></div>
          </div>

          {error && (
            <p className="text-[#D15555] mb-4 text-sm bg-[#FFF5E6] p-2 rounded-md border border-[#D9A679]">{error}</p>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#D9A679] rounded-md p-3 w-full mb-4 placeholder-gray-500 bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#D9A679] rounded-md p-3 w-full mb-4 placeholder-gray-500 bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
              required
            />

            <button
              type="submit"
              className="bg-[#D15555] text-white w-full py-2 rounded-md font-semibold hover:bg-[#B44646] transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-[#D15555] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
