'use client'
import { verify } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export function verifyToken(token: string): any {
  try {
    return verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    return null
  }
}

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const decodedToken = verifyToken(token)

  if (!decodedToken || decodedToken.role !== 'SA') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

