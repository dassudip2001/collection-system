/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest,NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import prisma from "@/config/prismaConfig";
interface CloudinaryUploadResponse {
    public_id: string;
    [key: string]: any;
}


export async function POST(req:NextRequest){
    try {
        const formData=await req.formData();
        const file=formData.get("file") as File;
        if(!file) return NextResponse.json({error:"No file provided"},{status:400});
        const bytes=await file.arrayBuffer();
        const buffer=Buffer.from(bytes);
        const result = await new Promise<CloudinaryUploadResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder: "next-cloudinary-uploads"},
                    (error: any, result: any) => {
                        if(error) reject(error);
                        else resolve(result as CloudinaryUploadResponse);
                    }
                )
                uploadStream.end(buffer)
            }
        )

        await prisma.image.create({
            data:{
                url:result.public_id,
                name:file.name,
                description:"",
                categoryId: formData.get("categoryId") as unknown as number,
                userId: formData.get("userId") as unknown as number,
                // like:0
            }
        })  

        return NextResponse.json(
            {
                publicId: result.public_id
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.error("Error uploading image:",error);
        return NextResponse.json({error:"Failed to upload image"},{status:500});
    }

}
