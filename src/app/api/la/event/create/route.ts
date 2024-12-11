import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import EmailNotificationService from '../../../../../../email-notifications/email-notifications.service';

const emailService = new EmailNotificationService();

// Define schema to validate incoming request body using Zod
const EventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
  location_id: z.string().max(255),
  is_public: z.boolean().default(true),
  image_url: z.string().url().optional(),
  host_email: z.string().email(),
  host_phone: z.string().max(20).optional(),
  host_password: z.string().min(8),  // Minimum 8 characters for host password
});

// Define the POST route for event creation
export async function POST(request: Request) {
  try {
    // Parse the incoming request body to JSON
    const body = await request.json();
    console.log('Received JSON body:', body); // Debugging log

    // Validate the request data using the schema
    const validatedData = EventSchema.parse(body);
    console.log('Validated Data:', validatedData); // Debugging log

    // Destructure host password from validated data
    const { host_password, ...eventData } = validatedData;

    // Hash the host password for security
    const hashedHostPassword = await bcrypt.hash(host_password, 10);

    // Create a new event in the database
    const newEvent = await prisma.event.create({
      data: {
        ...eventData,
        host_password: hashedHostPassword, // Store the hashed host password
      },
    });

    // Send host credentials via email
    await emailService.sendHostCredentials(eventData.host_email, host_password, newEvent.hash_id, newEvent.location_id);

    // Return the created event data as a successful response
    return NextResponse.json({ event: newEvent }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating event:', error.message);

    // If the error is a Zod validation error, return a 400 with the error details
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

