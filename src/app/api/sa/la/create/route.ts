import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import EmailNotificationService from '../../../../../../email-notifications/email-notifications.service';

const prisma = new PrismaClient();
const emailService = new EmailNotificationService();

const LocationAdminSchema = z.object({
  location: z.number().int().positive(),
  location_Add: z.string().max(255),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().min(8).max(255),
  created_by: z.number().int().positive(),
  is_active: z.number().int().min(0).max(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body) {
      console.error('Request body is empty or null');
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.log('Received body:', body);

    const validatedData = LocationAdminSchema.parse(body);
    console.log('Validated data:', validatedData);

    const { location, location_Add, name, email, password, created_by, is_active } = validatedData;

    // Check if the super_admin exists
    const superAdmin = await prisma.super_admin.findUnique({
      where: { id: created_by },
    });

    if (!superAdmin) {
      console.error('Invalid super admin ID:', created_by);
      return NextResponse.json({ error: 'Invalid super admin ID' }, { status: 400 });
    }

    // Check if email already exists (excluding soft-deleted records)
    const existingAdminByEmail = await prisma.location_admin.findFirst({
      where: {
        email,
        deleted_at: null,
      },
    });

    if (existingAdminByEmail) {
      console.error('Email already in use:', email);
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Check if location_Add already exists
    const existingAdminByLocationAdd = await prisma.location_admin.findUnique({
      where: { location_Add },
    });

    if (existingAdminByLocationAdd) {
      console.error('Location address already in use:', location_Add);
      return NextResponse.json({ error: 'Location address already in use' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the location admin
    const newLocationAdmin = await prisma.location_admin.create({
      data: {
        location,
        location_Add,
        name,
        email,
        password: hashedPassword,
        created_by,
        is_active,
        role: 'LA',
      },
    });

    const locationId = await prisma.location_admin.findFirst({
      where :{
        id: newLocationAdmin.id,
        deleted_at: null,
      },
      select : {
        hash_id : true
      }
    })

    const loginUrl = `${process.env.APP_DOMAIN}/location/${locationId?.hash_id}/login`;

    // Send email with credentials
    try {
      await emailService.sendLocationAdminCredentials(email, name, password, loginUrl);
      console.log('Credentials email sent successfully');
    } catch (emailError) {
      console.error('Error sending credentials email:', emailError);
      // We're still returning the created admin data, but with a warning
      return NextResponse.json({
        ...newLocationAdmin,
        warning: 'Admin created successfully, but there was an error sending the credentials email.'
      }, { status: 201 });
    }

    // Remove sensitive information from the response
    const { password: _, ...locationAdminWithoutPassword } = newLocationAdmin;

    return NextResponse.json(locationAdminWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating location admin:', error);
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

