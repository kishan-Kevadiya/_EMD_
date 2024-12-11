import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedSuperAdmin() {
  // Validate environment variables
  const username = process.env.SA_USERNAME;
  const email = process.env.SA_EMAIL;
  const password = process.env.SA_PASSWORD;

  if (!username || !email || !password) {
    throw new Error(
      "Environment variables SA_USERNAME, SA_EMAIL, and SA_PASSWORD are required."
    );
  }

  const superAdminData = [
    {
      username: username, // Now guaranteed to be a string
      email: email, // Now guaranteed to be a string
      password: password,
      is_active: 1,
    },
  ];

  for (const admin of superAdminData) {
    const existingAdmin = await prisma.super_admin.findFirst({
      where: {
        OR: [{ username: admin.username }, { email: admin.email }],
      },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.super_admin.create({
        data: {
          username: admin.username,
          email: admin.email,
          password: hashedPassword,
          is_active: admin.is_active,
        },
      });
      console.log(`Super admin created: ${admin.username}`);
    } else {
      console.log(`Super admin already exists: ${admin.username}`);
    }
  }
}

seedSuperAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
