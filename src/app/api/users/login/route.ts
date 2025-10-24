import { LoginUserDto } from "@/utils/dtos"
import { loginSchema } from "@/utils/validationSchema"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/utils/db';
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
*  @method  POST
*  @route   ~/api/users/login
*  @desc    Login User [(Log In) (Sign In) (تسحيل الدخول)]
*  @access  public
*/
export async function POST(request: NextRequest) {

  try {
    const body = await request.json() as LoginUserDto
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json({ message: "invalid email or password" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "invalid email or password" }, { status: 400 })
    }

    const cookie = setCookie({
      id:user.id,
      username:user.username,
      isAdmin:user.isAdmin
    })

    return NextResponse.json(
      { message: "Authenticated" },
      { 
        status: 200,
        headers: { 'Set-Cookie': cookie }
      }
    )

  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}