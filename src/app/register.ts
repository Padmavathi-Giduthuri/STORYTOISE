import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/register
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Save to DB with Prisma
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password, // normally hash before saving
      },
    });

    return NextResponse.json({ message: "User registered", user });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
