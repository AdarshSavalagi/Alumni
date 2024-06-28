import { AlumniDashboard } from "@/types/Alumni";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dfConfig/dbConfig";
import AlumniModel from "@/models/alumni";
import jwt from 'jsonwebtoken';
import { AlumniVerify } from "@/helpers/AlumniVerify";
import { AdminVerify } from "@/helpers/AdminVerify";

connect();

export async function GET(req: NextRequest) {
    try {
        const alumniList = await AlumniModel.find({ isVerified: true });
        const alumniData: AlumniDashboard[] = alumniList.map(data => ({
            name: data.name,
            batch: data.batch,
            department: data.department,
            photo: data.photo,
            email: data.email,
            phone: data.phone,
            address: data.address,
            company: data.company,
            position: data.position,
            linkedin: data.linkedin,
            rating: data.rating,
            review: data.review,
            isVerified: data.isVerified,
            password: data.password,
            isTestimonial:data.isTestimonial
        }));
        return NextResponse.json(alumniData, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ /api/v1/alumni/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const userToken = req.cookies.get('token')?.value;
        if (!userToken) {
            return NextResponse.json({ message: 'Login first' }, { status: 404 });
        }

        const validate = await AlumniVerify(userToken);
        if (!validate.alumni) {
            return NextResponse.json({ message: 'Alumni not found' }, { status: 404 });
        }

        
        const {
            name, batch, phone, address,
            company, position, photo, linkedin,
            department, rating, review
        } = await req.json();

        const updatedAlumni = await AlumniModel.findByIdAndUpdate(
            { _id: validate.id},
            { name, batch, phone, address, company, position, photo: photo, linkedin, department, rating, review, isVerified: false },
            { new: true }
        );
        if (!updatedAlumni) {
            return NextResponse.json({ message: 'Alumni details not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Alumni details update requested', alumni: updatedAlumni }, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ /api/v1/alumni/route.ts PUT method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        const validate = await AdminVerify(token);
        if (!validate.admin) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        

        const email = req.nextUrl.searchParams.get('email');
        if (!email) {
            return NextResponse.json({ message: 'Please provide an email' }, { status: 400 });
        }


        const deletedAlumni = await AlumniModel.findOneAndDelete({ email });
        if (!deletedAlumni) {
            return NextResponse.json({ message: 'Alumni details not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Alumni deleted successfully', alumni: deletedAlumni }, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ /api/v1/alumni/route.ts DELETE method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
