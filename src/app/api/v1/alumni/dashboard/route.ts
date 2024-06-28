import { connect } from "@/dfConfig/dbConfig";
import { AlumniVerify } from "@/helpers/AlumniVerify";
import AlumniModel from "@/models/alumni";
import { AlumniDashboard } from "@/types/Alumni";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        const validate = await AlumniVerify(token);
        if (!validate.alumni) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });       

        const alumni = await AlumniModel.findById({ _id:validate.id }).lean() as AlumniDashboard;
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
