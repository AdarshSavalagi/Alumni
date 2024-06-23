import { OfficeBearer } from "@/types/OfficeBearers";
import { NextRequest, NextResponse } from "next/server";
import OfficeBearerModel from "@/models/officeBearers";


export async function GET(req: NextRequest) {
    try {
        const officeBearer = await OfficeBearerModel.find();
        const OfficeBearerData: OfficeBearer[] = officeBearer.map((data) => {
            return {
                name: data.name,
                avatar: data.avatar,
                designation: data.designation,
                message: data.message,
            };
        });
        return NextResponse.json(OfficeBearerData, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const { name, avatar, designation, message } = await req.json();
        const officeBearer = new OfficeBearerModel({ name, avatar, designation, message, });
        await officeBearer.save();
        return NextResponse.json(officeBearer, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts POST method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const name = await req.nextUrl.searchParams.get('name');
        if (!name) {
            return NextResponse.json({ message: 'Please provide name' }, { status: 400 });
        }
        const { avatar, designation, message } = await req.json();
        const officeBearer = await OfficeBearerModel.findOneAndUpdate(
            { name },
            { avatar, designation, message },
            { new: true }
        );
        return NextResponse.json({ message: 'office bearer updated successfully' }, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts PUT method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const name = await req.nextUrl.searchParams.get('name');
        if (!name) {
            return NextResponse.json({ message: 'Please provide name' }, { status: 400 });
        }
        const officeBearer = await OfficeBearerModel.findOneAndDelete({ name });
        return NextResponse.json({ message: 'office bearer deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts DELETE method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}