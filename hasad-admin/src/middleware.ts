import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from './lib/session'

const publicRoutes = ['/signin', '/']
const protectedRoutes = ['/dashboard', '/profile', '/signout', '/settings']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.id && !session?.access_token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.id &&
    session?.access_token &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}