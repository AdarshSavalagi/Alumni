import { connect } from "@/dfConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Alumni from "@/models/alumni";
import Management from "@/models/management";
import OfficeBearers from "@/models/officeBearers"; 
import jwt from 'jsonwebtoken';

connect();

export async function GET(req: NextRequest) {

    try {
        const token = await req.cookies.get('token')?.value||'';
        const decodedToken = await jwt.decode(token) as { admin?: boolean };
        const admin = decodedToken?.admin;
        console.log(admin)
        if(!admin) return NextResponse.json({message:'Admin not found'},{status:404});
        const response = await Alumni.aggregate([
            {
                $facet: {
                    verifiedAlumni: [
                        { $match: { isVerified: true } },
                        {
                            $group: {
                                _id: null,
                                averageRating: { $avg: "$rating" },
                                totalVerifiedAlumni: { $sum: 1 }
                            }
                        }
                    ],
                    notVerifiedAlumni: [
                        { $match: { isVerified: false } },
                        { $count: "totalNotVerifiedAlumni" }
                    ]
                }
            }
        ]);

        const managementCount = await Management.countDocuments();
        const officeBearerCount = await OfficeBearers.countDocuments();

        const verifiedAlumni = response.length > 0 && response[0].verifiedAlumni.length > 0 ? response[0].verifiedAlumni[0] : { averageRating: 0, totalVerifiedAlumni: 0 };
        const notVerifiedAlumni = response.length > 0 && response[0].notVerifiedAlumni.length > 0 ? response[0].notVerifiedAlumni[0].totalNotVerifiedAlumni : 0;

        const data = {
            overallRating: verifiedAlumni.averageRating,
            totalVerifiedAlumni: verifiedAlumni.totalVerifiedAlumni,
            totalNotVerifiedAlumni: notVerifiedAlumni,
            techTalks: 0,
            refferals: 0,
            managementCount: managementCount, 
            officeBearerCount: officeBearerCount 
        };

        return NextResponse.json(data, { status: 200 });
        
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}