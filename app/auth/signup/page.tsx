'use client';

import { useState } from 'react';
import { signUp } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(email, password, name);
      alert('Account created! Please log in.');
      router.push('/auth/login');
    } catch (error) {
      alert('Error signing up' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-center min-h-screen'>
      <form onSubmit={handleSignUp} className='card w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Sign Up</h2>
        <input
          type='text'
          placeholder='Full Name'
          className='input mb-2'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
