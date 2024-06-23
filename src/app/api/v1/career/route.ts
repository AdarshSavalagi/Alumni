
import { CareerType } from "@/types/Career";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {

        const fetchedCareerData: CareerType[] = [
            {
                id: 1,
                companyName: 'Example Company A',
                message: 'Nullam id nulla nec nulla pretium dapibus non in tellus.',
                date: 'June 15, 2024',
            },
            {
                id: 2,
                companyName: 'Example Company B',
                message: 'Duis quis magna a nunc vestibulum euismod.',
                date: 'June 18, 2024',
            },
        ];
        return NextResponse.json(fetchedCareerData, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}