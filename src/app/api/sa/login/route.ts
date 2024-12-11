import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import prisma from '@/lib/prisma'; // Adjust path based on your project structure

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt for email:', email, password);

    const superAdmin = await prisma.super_admin.findUnique({
      where: { email },
    });

    console.log('superAdmin', superAdmin)

    if (!superAdmin) {
      console.log('Super admin not found');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
    console.log('isPasswordValid', isPasswordValid)
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Super Admin Details:', {
      id: superAdmin.id,
      email: superAdmin.email,
      role: superAdmin.role,
    });

    if (!superAdmin.id || !superAdmin.email || !superAdmin.role) {
      throw new Error('Invalid payload: Missing required fields');
    }

    const token = sign(
      { id: superAdmin.id, email: superAdmin.email, role: superAdmin.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRY_IN }
    );

    console.log('Login successful');

    return NextResponse.json({ token, msg: 'login success!' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
