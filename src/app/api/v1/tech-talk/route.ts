import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
import TechTalkModel from '@/models/techtalk';
import { connect as connectDB } from "@/dfConfig/dbConfig";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const techtalks = await TechTalkModel.find({isVerified:true});
        const initialTechTalks = techtalks.map((obj) => ({
            id: obj._id,
            name: obj.name,
            topic: obj.topic,
            email: obj.email,
            date: obj.createdAt.toISOString(),
        }));
        return NextResponse.json(initialTechTalks, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { name, email, topic } = await req.json();
        const techtalk = new TechTalkModel({ name, email, topic });
        await techtalk.save();
        return NextResponse.json({ message: 'Your response was saved' }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    await connectDB();
    try {
        const id = request.nextUrl.searchParams.get('id');
        const { name, email, topic } = await request.json();
        if (!id || !name) return NextResponse.json({ message: 'Invalid ID or name' }, { status: 400 });
        const techtalk = await TechTalkModel.findOneAndUpdate({ _id: id }, { name, email, topic });
        if (!techtalk) return NextResponse.json({ message: 'TechTalk does not exist' }, { status: 401 });
        return NextResponse.json({ message: 'TechTalk updated successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        console.log(`ID: ${id}`);
        
        const techtalk = await TechTalkModel.findByIdAndDelete(id);

        if (!techtalk) {
            return NextResponse.json({ message: 'No object found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Tech Talk deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error occurred @ /api/v1/tech-talk DELETE:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}