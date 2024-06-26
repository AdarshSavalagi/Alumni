import { connect } from "@/dfConfig/dbConfig";
import AlumniModel from "@/models/alumni";
import { AlumniDashboard } from "@/types/Alumni";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const userToken = req.cookies.get('token')?.value;
        if (!userToken) {
            return NextResponse.json({ message: 'Login first' }, { status: 404 });
        }

        const decoded:any = jwt.verify(userToken,process.env.JWT_SECRET!);
        const email = decoded.id;

        if (!email) {
            return NextResponse.json({ message: 'Email not found in token' }, { status: 400 });
        }

        const alumni = await AlumniModel.findOne({ email }).lean() as AlumniDashboard;
        if (!alumni) {
            return NextResponse.json({ message: 'Alumni not found' }, { status: 404 });
        }

        const alumniUser: AlumniDashboard = {
            name: alumni.name || '',
            batch: alumni.batch || 0,
            department: alumni.department || '',
            photo: alumni.photo || '',
            email: alumni.email || '',
            phone: alumni.phone || '',
            address: alumni.address || '',
            company: alumni.company || '',
            position: alumni.position || '',
            linkedin: alumni.linkedin || '',
            rating: alumni.rating || 0,
            review: alumni.review || '',
            isVerified: alumni.isVerified || false,
            password: alumni.password || '',
            isTestimonial: null
        };
        return NextResponse.json({ message: 'Alumni data retrieved successfully', alumni: alumniUser }, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ api/v1/alumni/dashboard GET: ', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
