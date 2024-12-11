'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/app/[lang]/[BN]/component/Loader/Loader';


const HostAdminLoginPage = dynamic(
  () => import('../../../../../../component/HostComponents/Login/login'),
  { ssr: false }
);

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [localeFromUrl, setLocaleFromUrl] = useState<string | null>(null);


  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    setRouter(window.location);
  }, []);

  useEffect(() => {
    if (isClient && router) {
      console.log(router.pathname);

      const localeFromUrl = router.pathname.split('/')[1];
      const locationIdFromUrl = router.pathname.split('/')[2];
      const eventIdFromUrl = router.pathname.split('/')[4];

      if (localeFromUrl) {
        setLocaleFromUrl(localeFromUrl)
      } 
      setLocationId(locationIdFromUrl);
      setEventId(eventIdFromUrl);

      localStorage.setItem('location', locationIdFromUrl);
    }
  }, [isClient, router]); 

  if (!isClient || !locationId || !eventId) {
    return <Loader />;
  }

  localStorage.setItem('location', locationId);
  localStorage.setItem('eventId', eventId)

  return (
    <Suspense fallback={<Loader />}>
      <HostAdminLoginPage params={{ locationId, eventId, localeFromUrl }} />
    </Suspense>
  );
}
