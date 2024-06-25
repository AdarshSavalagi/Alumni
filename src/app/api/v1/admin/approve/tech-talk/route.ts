import { connect } from "@/dfConfig/dbConfig";
import TechTalk from "@/models/techtalk";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { TechTalk as TechTalkType } from "@/types/TechTalk";
connect();


export async function GET(req: NextRequest) {
    try {
        const response = await TechTalk.find({ isVerified: false });
        const data:TechTalkType[] = response.map((obj)=>{
            return {
                id:obj._id,
                name:obj.name,
                topic:obj.topic,
                email:obj.email,
                date:obj.date
            }
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error:any) {
        console.log('Error occurred @ /api/v1/admin/approve/alumni/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT secret not configured');
        const decodedToken = jwt.verify(token, secret) as { admin?: boolean };
        
        if (!decodedToken.admin) {
            return NextResponse.json({ message: 'Admin not found' }, { status: 403 });
        }

        const { name, email, topic, date } = await request.json();
        const techtalk = new TechTalk({ name:name, email:email, topic:topic,date:date,isVerified:true });
        
        await techtalk.save();
        return NextResponse.json({ message: 'Your response was saved' }, { status: 200 });
    } catch (error: any) {
        console.error(`Error occurred @/api/v1/admin/verifyAlumni:->${error.message}`);

        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

