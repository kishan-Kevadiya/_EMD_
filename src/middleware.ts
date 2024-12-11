import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, locale } = req.nextUrl;

  // If the request is to the root `/`, redirect to `/en`
  if (pathname === '/' && locale !== 'en') {
    const url = req.nextUrl.clone();
    url.pathname = `/en/${process.env.BUISNESS_NAME}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
