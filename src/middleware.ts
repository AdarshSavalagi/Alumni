import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
    matcher: [
        // admin path
        '/api/v1/admin/approve/alumni',
        '/api/v1/admin/approve/tech-talk',
        '/api/v1/admin',
        '/api/v1/admin/modify-alumni',
        '/api/v1/admin/approve/alumni',
        '/api/v1/admin',
        '/admin',

        // alumni path
        '/dashboard',
        '/api/v1/alumni/dashboard',

        // logged in person 
        '/api/v1/logout',

        // public path
        '/login',
        '/admin/login',
        '/api/v1/alumni/login',
        '/signup',
        '/api/v1/admin/login',

    ],
}

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value!;
    const path = request.nextUrl.pathname;

    if (path === '/api/v1/logout') {
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('token');
        
        return response;
    }
    const isAdminPath = path === '/admin' || path === '/api/v1/admin/modify-alumni' || path === '/api/v1/admin' || path === '/api/v1/admin/approve/alumni' || path === '/api/v1/admin/approve/tech-talk';
    const isAlumniPath = path === '/dashboard' || path === '/api/v1/alumni/dashboard';
    const isPublicPath = path === '/login' || path === '/admin/login' || path === '/signup' || path === '/api/v1/admin/login' || path === '/api/v1/alumni/login';
    const isAdmin = request.cookies.get('admin')?.value === '1';
    const isAlumni = request.cookies.get('admin')?.value === '0';
    
    if (isAlumniPath && !token || isAlumniPath && !isAlumni) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (isAdminPath && !token || isAdminPath && !isAdmin) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (isPublicPath && token) {
        const isAdmin = request.cookies.get('admin')?.value;

        if (isAdmin == '1') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}
