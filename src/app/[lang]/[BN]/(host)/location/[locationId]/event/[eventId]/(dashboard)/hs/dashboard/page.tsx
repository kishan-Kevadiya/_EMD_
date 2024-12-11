'use client'
import Loader from '@/app/[lang]/component/Loader/Loader';
import { checkTokenValidity } from '@/lib/check-validity';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (checkTokenValidity() === 'HS') {
        setIsClient(true);
      } else {
        const locationId = localStorage.getItem('locationId');
        const eventId = localStorage.getItem('eventId');
        router.push(`/location/${locationId}/event/${eventId}/login`);
      }
    }, []); 

    if (!isClient) return <Loader />;
  return (
    <div className='h-screen flex align-center justify-center text-4xl bg-base-200'>
        <div>Host Dashboard</div>
    </div>
  )
}

export default page