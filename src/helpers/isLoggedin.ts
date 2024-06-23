import { NextRequest } from "next/server";
import { connect } from "@/dfConfig/dbConfig";
import { verify } from "jsonwebtoken";
connect();

export const isLoggedin = async(request:NextRequest) => {
    const token = await request.cookies.get('token')?.value || '';
    if(!token) return false;
    const decoded = verify(token , process.env.JWT_SECRET!);
    if(!decoded) return false;
    console.log('decoded:', decoded);
    return true;
};