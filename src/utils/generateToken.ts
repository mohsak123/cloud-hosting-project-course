import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { JWTPayload } from "./types";

// Generate Token
export function generateJWT(payload: JWTPayload): string {

  const privateKey = process.env.JWT_SECRET as string

  const token = jwt.sign(payload, privateKey, {
    expiresIn: "30d"
  })

  return token
}

// Set Cookie with JWT
export function setCookie(jwtPayload:JWTPayload): string {
  const token = generateJWT(jwtPayload);

  const cookie = serialize('jwtToken', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production' // development=http, production=https
  })

  return cookie
}