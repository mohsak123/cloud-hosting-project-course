import { RegisterUserDto } from "@/utils/dtos"
import { registerSchema } from "@/utils/validationSchema"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/utils/db';
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";


/**
*  @method  POST
*  @route   ~/api/users/register
*  @desc    Create New User [(Register) (Sign Up) (انشاء حساب)]
*  @access  public
*/
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RegisterUserDto
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json({ message: "This user already registered" }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(body.password, salt)

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      }
    })

    const cookie = setCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin
    })

    return NextResponse.json(
      { ...newUser, message: "Registered & Authenticated" }, 
      { 
        status: 200,
        headers: { 'Set-Cookie': cookie }
      })

  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}