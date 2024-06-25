import { Testimonial } from "@/types/Testimonial";
import { NextRequest, NextResponse } from "next/server";
import Alumni from "@/models/alumni";


export async function GET(req: NextRequest) {
    try {
        const alumnis = await Alumni.find({isTestimonial:true});
        const data:Testimonial[] = alumnis.map((obj)=>{
          return {
            name:obj.name,
            role:obj.position,
            company:obj.company,
            avatar:obj.photo,
            rating:obj.rating,
            text:obj.review
          }
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}