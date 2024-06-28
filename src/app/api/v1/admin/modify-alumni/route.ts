import { connect } from "@/dfConfig/dbConfig";
import { AdminVerify } from "@/helpers/AdminVerify";
import Alumni from "@/models/alumni";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(req:NextRequest){
    try {
        const token =  req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        const validate = await AdminVerify(token);
        if (!validate.admin) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
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