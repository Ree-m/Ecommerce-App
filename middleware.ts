import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

async function fetchAUser(userId:string|undefined) {
    const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`,
      {
        cache: 'no-cache',
      }
    )
    const data = await response.json();
    return data;
  }

export async function middleware(req:any) {
  // const session = await getSession({ req });
  const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

  const userId:string|undefined = session?.sub
  const userData =await fetchAUser(userId)


  // an array of protected routes
  const protectedRoutes = ['/contact', '/profile']; 

  // Check if the requested URL is in the list of protected routes
  if (protectedRoutes.includes(req.nextUrl.pathname) && !session) {
    const loginUrl = '/auth/login';
    const absoluteURL = new URL(loginUrl, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Protect admin routes (routes starting with /admin)
  if (req.nextUrl.pathname.startsWith('/admin') && (!session ||userData[0].role !== 'admin')) {
    const loginUrl = '/auth/login';
    const absoluteURL = new URL(loginUrl, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Allow access to other routes
  return NextResponse.next();
}

