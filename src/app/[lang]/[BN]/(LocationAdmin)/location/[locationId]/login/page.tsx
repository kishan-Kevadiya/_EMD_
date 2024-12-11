'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/app/[lang]/[BN]/component/Loader/Loader';
import Header from '@/app/[lang]/[BN]/component/header/header';

const LocationAdminLoginPage = dynamic(
  () => import('../../../../component/LocationAdminComponents/login/Login'),
  { ssr: false }
);

interface PageProps {
  params: Promise<{ locationId: string; lang: string }>;
}

export default function Page({ params }: PageProps) {
  const [locationData, setLocationData] = useState<{ locationId: string; lang: string } | null>(null);

  // Unwrap params and update the state
  useEffect(() => {
    params.then((data) => {
      setLocationData(data);
    });
  }, [params]);

  // Once locationData is set, handle side effects
  useEffect(() => {
    if (locationData && typeof window !== 'undefined') {
      localStorage.setItem('locationId', locationData.locationId);
    }
  }, [locationData]);

  if (!locationData) {
    return <Loader />;
  }

  const { locationId, lang } = locationData;

  return (
    <Suspense fallback={<Loader />}>
      {/* <Header /> */}
      {/* @ts-ignore */}
      <LocationAdminLoginPage locationId={locationId} lang={lang} />
    </Suspense>
  );
}
