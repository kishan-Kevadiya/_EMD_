import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, locationId } = await request.json();

    const locationAdmin = await prisma.location_admin.findFirst({
      where: {
        email,
        deleted_at: null,
      },
    });

    if (!locationAdmin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      locationAdmin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = sign(
      {
        id: locationAdmin.id,
        email: locationAdmin.email,
        role: locationAdmin.role,
        locationId: locationAdmin.location,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRY_IN }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
