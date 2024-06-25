import { connect } from "@/dfConfig/dbConfig";
import Alumni from "@/models/alumni";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
connect();

export async function PUT(req:NextRequest){
    try {
        const token = await req.cookies.get('token')?.value||'';
        const decodedToken = await jwt.decode(token) as { admin?: boolean };
        const admin = decodedToken?.admin;
        if(!admin) return NextResponse.json({message:'Admin not found'},{status:404});
        const {email, name, batch, phone, address, company, position, isTestimonial, photo, linkedin, department, rating, review} = await req.json();
        const updatedAlumni = await Alumni.findOneAndUpdate(
            {email},
            {name, batch, phone, address, company, position, photo, linkedin, department, rating, review,isTestimonial:isTestimonial},
            {new:true}
        );
        
        if(!updatedAlumni) return NextResponse.json({message:'Alumni not found'},{status:404});
        return NextResponse.json({message:'updated successfully'},{status:200});
    } catch (error:any) {
        console.log('error occured @ /api/v1/admin/modify-alumni:PUT:->',error.message);
        return NextResponse.json({message:error.message},{status:500});
    }
}