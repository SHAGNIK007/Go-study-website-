'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) throw error;

      setSuccessMsg('Password updated successfully!');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFEDD5] text-[#5B4C3A] font-sans">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#5B4C3A]">Reset Password</h1>
        <p className="text-sm text-gray-700 mb-6">
          Enter your new password.
        </p>

        {errorMsg && (
          <p className="text-[#D15555] mb-4 text-sm bg-[#FFF5E6] p-2 rounded-md border border-[#D9A679]">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 mb-4 text-sm bg-[#FFF5E6] p-2 rounded-md border border-[#D9A679]">{successMsg}</p>
        )}

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-[#D9A679] rounded-md p-3 w-full mb-4 placeholder-gray-500 bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#D15555] transition-all duration-300"
            required
          />
          <button
            type="submit"
            className="bg-[#D15555] text-white w-full py-2 rounded-md font-semibold hover:bg-[#B44646] transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Back to{' '}
          <Link href="/login" className="text-[#D15555] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}