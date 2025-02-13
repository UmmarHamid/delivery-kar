'use client';

import { useState } from 'react';
import { login } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (error) {
      alert('Invalid credentials' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-center min-h-screen'>
      <form onSubmit={handleLogin} className='card w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
        <input
          type='email'
          placeholder='Email'
          className='input mb-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='input mb-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' className='btn-primary w-full' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
