import { Alumni } from "@/types/Alumni";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dfConfig/dbConfig";
import AlumniModel from "@/models/alumni";

connect();

export async function GET(req: NextRequest) {
    try {
        const alumniList = await AlumniModel.find();
        const alumniData: Alumni[] = alumniList.map(data => ({
            name: data.name,
            batch: data.batch,
            department: data.department,
            photo: data.image // Assuming 'photo' in response is mapped to 'image' in the model
        }));
        return NextResponse.json(alumniData, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ /api/v1/alumni/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const {
            name, batch, email, phone, address,
            company, position, image, linkedin,
            department, rating, review
        } = await req.json();

        const newAlumni = new AlumniModel({
            name, batch, email, phone, address,
            company, position, image, linkedin,
            department, rating, review,
            isVerified: false
        });

        await newAlumni.save();
        return NextResponse.json({ message: 'Alumni details added successfully' }, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ /api/v1/alumni/route.ts POST method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email');
        if (!email) {
            return NextResponse.json({ message: 'Please provide an email' }, { status: 400 });
        }

        const {
            name, batch, phone, address,
            company, position, image, linkedin,
            department, rating, review
        } = await req.json();

        const updatedAlumni = await AlumniModel.findOneAndUpdate(
            { email },
            { name, batch, phone, address, company, position, image, linkedin, department, rating, review },
            { new: true }
        );

        if (!updatedAlumni) {
            return NextResponse.json({ message: 'Alumni details not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Alumni details updated successfully', alumni: updatedAlumni }, { status: 200 });
    } catch (error: any) {
        console.log('Error occurred @ /api/v1/alumni/route.ts PUT method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
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
