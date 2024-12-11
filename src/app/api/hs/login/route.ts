import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';


export async function POST(request: Request) {
  try {
    const { email, password, eventId } = await request.json();
        console.log('eventId', email)
    const event = await prisma.event.findFirst({
      where: { host_email : email},
      select: { id: true, host_email: true, host_password: true,  },
    });

    console.log('event', event)

    if (!event || event.host_email !== email) {
      console.log('first')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, event.host_password);
    console.log('isPasswordValid', isPasswordValid)
    if (!isPasswordValid) {
      console.log('second')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
// ADD ROLE IN db CURRENT STATE IS STATICCALY******************************************
    const token = jwt.sign(
      { id: event.id, email: event.host_email, role: 'HS'},//***** */
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRY_IN }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

