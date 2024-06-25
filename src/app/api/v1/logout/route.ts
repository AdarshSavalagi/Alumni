import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){
    try {
        const response = NextResponse.json({message:'Log out successfully'},{status:200});
        response.cookies.set('token','');
        return response;
    } catch (error:any) {
        return NextResponse.json({message:'unable log out'},{status:500});
    }
}