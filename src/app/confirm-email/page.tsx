'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function ConfirmEmail() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResendConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });

      if (error) throw error;

      setMessage('Confirmation email sent! Please check your inbox (and spam folder).');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while sending the confirmation email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFEDD5] text-[#5B4C3A] font-sans antialiased justify-center items-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#5B4C3A] font-['Press_Start_2P']">
          Confirm Your Email
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          Please enter your email to resend the confirmation link and access GoStudy.
        </p>

        {message && (
          <p className="text-green-600 mb-4 text-sm bg-[#FFF5E6] p-2 rounded-md border border-[#D9A679]">
            {message}
          </p>
        )}
        {error && (
          <p className="text-[#D15555] mb-4 text-sm bg-[#FFF5E6] p-2 rounded-md border border-[#D9A679]">
            {error}
          </p>
        )}

        <form onSubmit={handleResendConfirmation}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#D9A679] rounded-md p-3 w-full mb-4 placeholder-gray-500 bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
            required
          />

          <button
            type="submit"
            className="bg-[#D15555] text-white w-full py-2 rounded-md font-semibold hover:bg-[#B44646] transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Confirmation Email'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already confirmed?{' '}
          <Link href="/login" className="text-[#D15555] hover:underline">
            Log in
          </Link>
        </p>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Need an account?{' '}
          <Link href="/signup" className="text-[#D15555] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}