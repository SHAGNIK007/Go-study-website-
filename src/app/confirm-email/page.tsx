'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

export default function ConfirmEmailPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();
      setEmail(data.session?.user.email ?? '');
    }
    fetchSession();
  }, []);

  const handleResend = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (!email) {
        setErrorMsg('Email not found.');
        setLoading(false);
        return;
      }
    
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      if (error) throw error;
      alert('Password reset email sent! Please check your inbox.');
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
      else setErrorMsg('Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFEDD5] text-[#5B4C3A] font-sans p-6">
      <div className="max-w-md w-full bg-[#FFF5E6] border border-[#D9A679] rounded-lg p-8 text-center shadow-md">
        <Image
          src="/email-sent.svg"
          alt="Email sent"
          width={120}
          height={120}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-2xl font-bold mb-2">Confirm your email</h1>
        <p className="mb-4">
          We have sent a confirmation link to <strong>{email || 'your email'}</strong>.
          Please check your inbox and click the link to verify your account.
        </p>

        {errorMsg && (
          <p className="text-[#D15555] mb-4 bg-[#FFE4C4] p-2 rounded-md border border-[#D9A679]">{errorMsg}</p>
        )}

        <button
          onClick={handleResend}
          disabled={loading}
          className="bg-[#D15555] text-white py-2 px-4 rounded-md hover:bg-[#B44646] transition-all duration-300"
        >
          {loading ? 'Sending email...' : 'Send password reset email'}
        </button>
      </div>
    </div>
  );
}
