'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [contact, setContact] = useState('');
  const [packageSize, setPackageSize] = useState('bike');
  const [price, setPrice] = useState(0);

  // Simple pricing logic (distance-based calculation can be added later)
  const calculatePrice = () => {
    setPrice(packageSize === 'bike' ? 50 : 100);
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-30'>
      <h2 className='text-xl font-bold mb-4'>Create a Delivery</h2>

      <input
        type='text'
        placeholder='Pickup Location'
        className='w-full p-2 border rounded mb-2'
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <input
        type='text'
        placeholder='Drop-off Location'
        className='w-full p-2 border rounded mb-2'
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
      />
      <input
        type='text'
        placeholder='Contact Name & Phone'
        className='w-full p-2 border rounded mb-2'
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />

      <label className='block mt-2'>Package Size:</label>
      <select
        className='w-full p-2 border rounded'
        value={packageSize}
        onChange={(e) => {
          setPackageSize(e.target.value);
          calculatePrice();
        }}
      >
        <option value='bike'>Bike (Small Package)</option>
        <option value='car'>Car (Large Package)</option>
      </select>

      <p className='mt-2 text-lg'>Estimated Price: ₹{price}</p>

      <button className='w-full bg-blue-600 text-white py-2 rounded mt-4'>
        Confirm Order
      </button>
    </div>
  );
}
