import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try{
        const admin = await request.cookies.get('token')?.value === '1';
        const isLogin = await request.cookies.has('token');
        const data={
            admin:admin,
            isLogin:isLogin
        };
        return NextResponse.json(data,{status:200});
    }catch(error:any){
        return NextResponse.json({message:error.message},{status:500});
    }
}