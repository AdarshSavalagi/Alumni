import { connect } from "@/dfConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import Alumni from "@/models/alumni";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required for login' }, { status: 400 });
        }

        const alumni = await Alumni.findOne({ email });

        if (!alumni) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, alumni.password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        const tokenData = { id:email,admin:false };
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('JWT_SECRET is not defined in the environment variables');
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }

        const token = jwt.sign(tokenData, secret, { expiresIn: '1h' });

        const response = NextResponse.json({ message: 'Logged in successfully' }, { status: 200 });
        response.cookies.set('admin','0',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600
        });
        response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600 });

        return response;
    } catch (error: any) {
        console.error(`Error occurred @ api/v1/alumni/login: ${error.message}`);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
