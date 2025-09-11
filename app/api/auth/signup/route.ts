// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userName, email, password } = await request.json()

    // Validate input
    if (!userName || !email || !password) {
      return NextResponse.json(
        { message: "userName, email, and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        userName,
        email,
        hashedPassword
      }
    })

    // Return success (without password)
    return NextResponse.json(
      { 
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.userName,
          email: user.email,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}