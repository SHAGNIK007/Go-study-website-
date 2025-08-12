'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/hero2.jpg',
      title: 'Immersive Learning',
      description: 'Explore interactive ebooks and audiobooks with synchronized narration.',
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

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, bio')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        console.error('Profile fetch error:', error);
        setUser(user);
        setUsername('');
        setAvatarUrl('/default-avatar.png');
        setBio('');
        return;
      }

      let avatarUrl = '/default-avatar.png';
      if (profile.avatar_url) {
        if (!profile.avatar_url.startsWith('http')) {
          try {
            const filePath = profile.avatar_url.startsWith('avatar/')
              ? profile.avatar_url.replace('avatar/', '')
              : profile.avatar_url;
            const { data } = supabase.storage.from('avatar').getPublicUrl(filePath);
            avatarUrl = data.publicUrl || '/default-avatar.png';
            console.log('Generated Avatar URL:', avatarUrl);
          } catch (storageError) {
            console.error('Storage error:', storageError);
            avatarUrl = '/default-avatar.png';
          }
        } else {
          avatarUrl = profile.avatar_url;
        }
      } else {
        console.warn('avatar_url is undefined or empty in profile data');
      }

      setUser(user);
      setUsername(profile.username || '');
      setAvatarUrl(avatarUrl);
      setBio(profile.bio || '');
    }
    fetchUser();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username, avatar_url: avatarUrl, bio })
        .eq('id', user?.id);

      if (error) throw error;

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      setLoading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('avatar')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('avatar').getPublicUrl(fileName);
        setAvatarUrl(data.publicUrl);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Failed to upload avatar');
      } finally {
        setLoading(false);
      }
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
        <div className="w-full max-w-sm bg-[#FFF5E6] rounded-lg shadow-md border border-[#D9A679] p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#5B4C3A] font-['Press_Start_2P']">
            Edit Profile
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            Customize your profile to make it uniquely yours.
          </p>

          {error && (
            <p className="text-[#D15555] mb-4 text-sm bg-[#FFE4C4] p-2 rounded-md border border-[#D9A679]">
              {error}
            </p>
          )}

          <form onSubmit={handleSave}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#5B4C3A]">
                Avatar
              </label>
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <Image
                    src={avatarUrl || '/default-avatar.png'}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-[#D9A679] shadow-sm transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/default-avatar.png';
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-[#D15555]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <label
                  className="cursor-pointer bg-[#D15555] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#B44646] transition-all duration-300 text-sm"
                >
                  Choose Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    aria-label="Upload avatar"
                  />
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-[#5B4C3A]">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-[#D9A679] rounded-md p-3 w-full placeholder-gray-500 bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
                aria-label="Username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-[#5B4C3A]">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border border-[#D9A679] rounded-md p-3 w-full placeholder-gray-500 bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
                rows={4}
                aria-label="Bio"
              />
            </div>

            <button
              type="submit"
              className="bg-[#D15555] text-white w-full py-2 rounded-md font-semibold hover:bg-[#B44646] transition-all duration-300 disabled:opacity-50"
              disabled={loading}
              aria-label="Save profile changes"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Back to{' '}
            <Link href="/" className="text-[#D15555] hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
