'use server';
import { NextRequest } from "next/server";
import { connect } from "@/dfConfig/dbConfig";
connect();

export const isLoggedin = async(request:NextRequest) => {
    const token = await request.cookies.get('token')?.value || '';
    return token? true:false;
    
};