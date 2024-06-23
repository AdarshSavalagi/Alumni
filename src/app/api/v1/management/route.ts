import Management from "@/models/management";
import { ManagementPerson } from "@/types/Management";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dfConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
    try {
        const managementData = await Management.find();
        const management: ManagementPerson[] = managementData.map((data) => {
            return {
                name: data.name,
                image: data.image,
                designation: data.designation,
                message: data.message,
            };
        });
        return NextResponse.json(management, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/management/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, image, designation, message } = await req.json();
        const management = new Management({name:name,image:image,designation:designation,message:message});
        await management.save();
        return NextResponse.json({ message: 'management details added successfully' }, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/management/route.ts POST method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function PUT(req: NextRequest) {
    try {
        const id = await req.nextUrl.searchParams.get('name');
        if (!id) {
            return NextResponse.json({message:'Please provide id'},{status:400});
        }
        const { name, image, designation, message } = await req.json();
        const management = await Management.findOneAndUpdate(
            { name },
            { image, designation, message },
            { new: true }
        );
        console.log(name,designation,)

        if (!management) {
            return NextResponse.json({ message: 'Management details not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Management details updated successfully' }, { status: 200 });
    } catch (error: any) {
        console.log('error occurred @ /api/v1/management/route.ts PUT method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request:NextRequest){
    try {
        
        const name = await request.nextUrl.searchParams.get('name');
        if (!name) {
            return NextResponse.json({message:'Please provide name'},{status:400});
        }
        const recruitment = await Management.findOneAndDelete({name:name});
        return NextResponse.json({message:'Recruitment deleted successfully!'},{status:200});
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error:error.message},{status:500});
    }
}