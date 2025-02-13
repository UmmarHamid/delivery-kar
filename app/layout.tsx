'use client';

import { useEffect, useState } from 'react';
import { getUser, logout } from '@/lib/appwrite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-900'>
        <nav className='flex-between p-4 bg-white shadow-md'>
          <Link href='/'>Home</Link>
          {user ? (
            <>
              <Link href='/dashboard' className='mr-4'>
                Dashboard
              </Link>
              <button onClick={handleLogout} className='ml-4 btn-secondary'>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href='/auth/login' className='mr-4'>
                Login
              </Link>
              <Link href='/auth/signup'>Signup</Link>
            </>
          )}
        </nav>
        <main className='container'>{children}</main>
      </body>
    </html>
  );
}
