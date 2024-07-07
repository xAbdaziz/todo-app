import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'

async function isTokenValid(token: string, secret: string) {
  try {

    const secretKey = new TextEncoder().encode(secret);
    await jwtVerify(token, secretKey);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const JwtSecret = process.env.JWT_SECRET || ''

  try {
    const isValid = await isTokenValid(token, JwtSecret);

    if (request.nextUrl.pathname === '/login' && isValid) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isValid && request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|register).*)',
  ],
}