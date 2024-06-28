import { connect } from "@/dfConfig/dbConfig";
import AdminModel from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request:NextRequest){
    try {
        const {username, password} = await request.json();
        const admin = await AdminModel.findOne({username:username});
        if(!admin) return NextResponse.json({message: 'Invalid username '},{status:404});
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) return NextResponse.json({message: 'Invalid password'},{status:404});
        const payload = {
            admin:true,
            id:admin._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: 3600});
        admin.token = token;
        admin.tokenExpire = Date.now() + 3600 * 1000;
        await admin.save();
        const response = NextResponse.json({message: 'Log in successfully'},{status:200});
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600
        });
        response.cookies.set('admin','1',{
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