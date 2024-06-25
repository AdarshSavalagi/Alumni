import { connect } from "@/dfConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import DepartmentModel from '@/models/department'
import { DepartmentType } from "@/types/Department";

connect();

// TODO: authentication


export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
        const department = new DepartmentModel({ name: name });
        await department.save();
        return NextResponse.json({ message: 'department added successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const departments = await DepartmentModel.find({});
        const data: DepartmentType[] = departments.map((obj => {
            return {
                id: obj._id,
                name: obj.name
            }
        }));
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.messaage }, { status: 500 });
    }
}

export async function DELETE(request:NextRequest){
    try {
        const id = await request.nextUrl.searchParams.get('id');
        if(!id)return NextResponse.json({message:'Invalid id '},{status:400});
        const department = await DepartmentModel.findOneAndDelete({_id:id});
        if(!department)return NextResponse.json({message:'No department found delete'},{status:401});
        return NextResponse.json({message:'Department Deleted successfully '},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}

export async function PUT(request:NextRequest){
    try {
        const id = await request.nextUrl.searchParams.get('id');
        const {name}=await request.json();
        if (!id || !name) {
            return NextResponse.json({message:'invalid id or name'},{status:400});
        }
        const department = await DepartmentModel.updateOne({_id:id},{name:name});
        if (!department) {
            return NextResponse.json({message:'Department not found'},{status:404});
        }
        return NextResponse.json({message:'Department Edited successfully'},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}