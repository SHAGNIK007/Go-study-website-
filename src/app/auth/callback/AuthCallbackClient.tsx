'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleAuth() {
      const error = searchParams.get('error');
      if (error) {
        console.error('Auth error:', error);
        router.push(`/login?error=${encodeURIComponent(error)}`);
        return;
      }

      const code = searchParams.get('code');
      const type = searchParams.get('type');

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          console.error('Code exchange error:', exchangeError.message);
          router.push(`/login?error=${encodeURIComponent(exchangeError.message)}`);
          return;
        }
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error('Session error:', sessionError?.message);
        router.push('/login?error=Authentication%20failed');
        return;
      }

      const user = session.user;

      if (type === 'recovery') {
        router.push('/reset-password');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        const avatarList = [
          '/avatars/img1.jpg',
          '/avatars/img2.jpg',
          '/avatars/img3.jpg',
          '/avatars/img4.jpg',
        ];
        const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

        await supabase.from('profiles').insert({
          id: user.id,
          email: user.email ?? '',
          username: user.email?.split('@')[0] || 'User',
          avatar_url: randomAvatar,
          bio: '',
        });
      }

      const isDiscordLogin = user.app_metadata?.provider === 'discord';

      router.push(isDiscordLogin ? '/' : '/confirm-email');
    }

    handleAuth().finally(() => setLoading(false));
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFEDD5] text-[#5B4C3A]">
        <p className="text-sm">Processing authentication...</p>
      </div>
    );
  }

  return null;
}
