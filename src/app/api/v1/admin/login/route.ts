import { connect } from "@/dfConfig/dbConfig";
import AdminModel from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connect();


export async function POST(request:NextRequest){
    try {
        const {username, password} = await request.json();
        const admin = await AdminModel.findOne({name:username});
        if(!admin) return NextResponse.json({message: 'Invalid username or password'},{status:400});
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) return NextResponse.json({message: 'Invalid username or password'},{status:400});
        const payload = {
            admin:{
                id: admin._id
            }
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: 3600});
        const response = NextResponse.json({message: 'Log in successfully'},{status:200});
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600
        });
        return response;
    } catch (error:any) {
        console.log('Error Log in :', error.message);
        return NextResponse.json({message: 'Error Log in'},{status:500})
    }
}