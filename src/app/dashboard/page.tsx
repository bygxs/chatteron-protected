// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/signin-form');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Welcome to the Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        This is a protected dashboard page.
      </p>
    </div>
  );
}