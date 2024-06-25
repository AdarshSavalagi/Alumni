import { connect } from "@/dfConfig/dbConfig";
import Alumni from "@/models/alumni";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function GET(req: NextRequest) {
    try {
        const response = await Alumni.find({ isVerified: false });
        return NextResponse.json(response, { status: 200 });
    } catch (error:any) {
        console.log('Error occurred @ /api/v1/admin/approve/alumni/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}



