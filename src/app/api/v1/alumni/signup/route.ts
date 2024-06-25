import { connect } from "@/dfConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Alumni from "@/models/alumni";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



connect();

export async function POST(req:NextRequest){
    try {
        const {email,password} = await req.json();
        if (!email || !password) return NextResponse.json({message:"email and password is required for creating user...."},{status:404});
        const check = await Alumni.findOne({email:email});
        if (check) return NextResponse.json({message:"User already exists"},{status:400});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const alumni = new Alumni({email:email,password:hashedPassword,isVerified:false});
        alumni.save();
        const tokenData={
            email:email
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET!);
        const response = NextResponse.json({message:"User created successfully"},{status:200});
        response.cookies.set('token',token);
        return response;
    } catch (error:any) {
        console.log('Error Occured @ /api/v1/alumni/signup POST:->',error.message);
        return NextResponse.json({message:error.message},{status:500});
    }
}