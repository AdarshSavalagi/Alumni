
import { NewsDataType } from "@/types/NewsData";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        const newsData: NewsDataType[] = [
            // {
            //     id: 1,
            //     title: 'News 1',
            //     message: 'Message 1',
            //     imageUrl: 'https://via.placeholder.com/150',
            //     date: '2021-08-01',
            // },
        ];
        return NextResponse.json(newsData, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}