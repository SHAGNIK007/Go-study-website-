import { Suspense } from 'react';
import AuthCallbackClient from './AuthCallbackClient';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <AuthCallbackClient />
    </Suspense>
  );
}
