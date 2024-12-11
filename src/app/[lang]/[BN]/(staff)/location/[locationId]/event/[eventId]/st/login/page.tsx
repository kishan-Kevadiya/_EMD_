'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Locale } from '../../../../../../../../../../../i18n.config';
import Loader from '@/app/[lang]/[BN]/component/Loader/Loader';

const HostAdminLoginPage = dynamic(
  () => import('../../../../../../../component/StaffComponent/login/login'),
  { ssr: false }
);

export default function Page({
  params: paramsPromise
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const [isClient, setIsClient] = useState(false);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [dict, setDict] = useState<any>(null);
  const [lang, setLang] = useState<Locale | null>(null);
  const [router, setRouter] = useState<any>(null);

  // Unwrap params using React.use() inside a useEffect
  useEffect(() => {
    (async () => {
      const { lang } = await paramsPromise;
      setLang(lang);
    })();
  }, [paramsPromise]);

  useEffect(() => {
    setIsClient(true);
    setRouter(window.location);
  }, []);

  useEffect(() => {
    if (isClient && router) {
      const locationIdFromUrl = router.pathname.split('/')[2];
      const eventIdFromUrl = router.pathname.split('/')[4];

      setLocationId(locationIdFromUrl);
      setEventId(eventIdFromUrl);

      localStorage.setItem('location', locationIdFromUrl || '');
      localStorage.setItem('eventId', eventIdFromUrl || '');
    }
  }, [isClient, router]);

 
  if (!isClient || !locationId || !eventId || !lang ) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <HostAdminLoginPage params={{ locationId, eventId, lang }} />
    </Suspense>
  );
}
