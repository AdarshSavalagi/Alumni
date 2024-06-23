import { Alumni } from "@/types/Alumni";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const students: Alumni[] = [
            {"name": "John Doe", "batch": 2021, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
            {"name": "Jane Doe", "batch": 2020, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Sam Smith", "batch": 2019, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Sue Johnson", "batch": 2021, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Bob Brown", "batch": 2020, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
            {"name": "Alice Williams", "batch": 2019, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Charlie Davis", "batch": 2021, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Diana Miller", "batch": 2020, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Eve Wilson", "batch": 2019, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
            {"name": "Frank Moore", "batch": 2021, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "George Taylor", "batch": 2020, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Helen Anderson", "batch": 2019, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Igor Thomas", "batch": 2021, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
            {"name": "Jack Jackson", "batch": 2020, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Kim White", "batch": 2019, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Luke Harris", "batch": 2021, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Mia Martin", "batch": 2020, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
            {"name": "Nick Thompson", "batch": 2019, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Olivia Garcia", "batch": 2021, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
            {"name": "Paul Martinez", "batch": 2020, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"}
          ]
        return NextResponse.json(students, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}