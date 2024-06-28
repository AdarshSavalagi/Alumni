import { connect } from "@/dfConfig/dbConfig";
import { AdminVerify } from "@/helpers/AdminVerify";
import Alumni from "@/models/alumni";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        const validate = await AdminVerify(token);
        if (!validate.admin) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        const response = await Alumni.find({ isVerified: false });
        return NextResponse.json(response, { status: 200 });
    } catch (error:any) {
        console.log('Error occurred @ /api/v1/admin/approve/alumni/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        const validate = await AdminVerify(token);
        if (!validate.admin) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
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



