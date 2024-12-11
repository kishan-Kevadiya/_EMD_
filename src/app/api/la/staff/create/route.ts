import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import EmailNotificationService from '../../../../../../email-notifications/email-notifications.service';

const emailService = new EmailNotificationService();

// Define schema to validate incoming request body using Zod
const StaffSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8), // Minimum 8 characters for staff password
  event_id: z.string().uuid(), // Assuming event_id is a UUID
});

// Define the POST route for staff creation
export async function POST(request: Request) {
  try {
    // Parse the incoming request body to JSON
    const body = await request.json();
    console.log('Received JSON body:', body); 

    const validatedData = StaffSchema.parse(body);
    console.log('Validated Data:', validatedData); 

    const { password, ...staffData } = validatedData;

    const hashedStaffPassword = await bcrypt.hash(password, 10);

    const newStaff = await prisma.staff.create({
        // @ts-expect-error
      data: {
        ...staffData,
        password: hashedStaffPassword,
      },
    });

    const event = await prisma.event.findUnique({
      where: { id: newStaff.event_id },
      select: { hash_id: true, location_id: true },
    });

    if (!event) {
      throw new Error('Associated event not found');
    }

    // Send staff credentials via email
    await emailService.sendStaffCredentials(newStaff.email, password, event.hash_id, event.location_id);

    // Return the created staff data as a successful response
    return NextResponse.json({ staff: newStaff }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating staff:', error.message);

    // If the error is a Zod validation error, return a 400 with the error details
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

