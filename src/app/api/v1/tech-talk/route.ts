import { TechTalk } from "@/types/TechTalk";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {

        const initialTechTalks: TechTalk[] = [
            { id: 1, name: 'Alice', topic: 'React Hooks', date: '2024-07-01' },
            { id: 2, name: 'Bob', topic: 'TypeScript Tips', date: '2024-07-15' },
            { id: 3, name: 'Carol', topic: 'Framer Motion', date: '2024-08-01' },
            // Add more tech talks as needed
        ];
        return NextResponse.json(initialTechTalks, { status: 200 });

    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const newTechTalk = req.body;
        // Save the new tech talk to the database
        return NextResponse.json({message:'your response was saved'}, { status: 201 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts POST method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}