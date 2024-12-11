'use client'
import Loader from '@/app/[BN]/[lang]/component/Loader/Loader';
import { checkTokenValidity } from '@/lib/check-validity';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (checkTokenValidity() === 'LA') {
        setIsClient(true);
      } else {
        const locationId = localStorage.getItem('locationId');
        router.push(`/${locationId}/login`);
      }
    }, []); 

    if (!isClient) return <Loader />;

  return (
    <div className="h-screen flex align-center justify-center text-4xl bg-base-200">
      <div>Welcome to dashboard</div>
    </div>
  )
}

export default page