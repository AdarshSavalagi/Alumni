import { connect } from "@/dfConfig/dbConfig";
import jwt from 'jsonwebtoken';
import Alumni from "@/models/alumni";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const token = request.cookies.get('token')?.value || '';
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT secret not configured');
        const decodedToken = jwt.verify(token, secret) as { admin?: boolean };
        
        if (!decodedToken.admin) {
            return NextResponse.json({ message: 'Admin not found' }, { status: 403 });
        }

        const { email,isTestimonial } = await request.json();
        await Alumni.findOneAndUpdate({ email: email }, { isVerified: true,isTestimonial:isTestimonial }, { new: true });
        return NextResponse.json({ message: 'Alumni Verified successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(`Error occurred @/api/v1/admin/verifyAlumni:->${error.message}`);
        // Differentiate between JWT error and other errors
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}