import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Add protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/api/bookings', '/api/expenses', '/api/rooms'];
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute) {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}