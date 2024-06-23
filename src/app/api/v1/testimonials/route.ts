import { Testimonial } from "@/types/Testimonial";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        const OfficeBearerData: Testimonial[] = [
            {
                name: 'Name 1',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
               text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              }, {
                name: 'Name 2',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              }, {
                name: 'Name 3',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              }, {
                name: 'Name 4',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              }, {
                name: 'Name 5',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              }, {
                name: 'Name 6',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              }, {
                name: 'Name 7',
                role: "student",
                avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
                rating: 3
              },];
        return NextResponse.json(OfficeBearerData, { status: 200 });
    } catch (error: any) {
        console.log('error occured @ /api/v1/tech-talk/route.ts GET method:->', error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}