/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest,NextResponse } from "next/server";
import prisma from "@/config/prismaConfig";


// create a new category
export async function POST(req:NextRequest){
    try {
        const body=await req.formData();
        const name=body.get("name") as string;
        const description=body.get("description") as string;
        if(!name) return NextResponse.json({error:"Name is required"},{status:400});
        const category=await prisma.category.create({
            data:{
                name,
                description
            }
        })
        return NextResponse.json(category,{status:201});
    } catch (error) {
        console.error("Error creating category:",error);
        return NextResponse.json({error:"Failed to create category"},{status:500});
    }
}

// update a category
export async function PUT(req:NextRequest){
    try {
        const body=await req.formData();
        const id=body.get("id") as string;
        const name=body.get("name") as string;
        const description=body.get("description") as string;
        if(!id) return NextResponse.json({error:"Id is required"},{status:400});
        const category=await prisma.category.update({
            where:{id:parseInt(id)},
            data:{name,description}
        })
        return NextResponse.json(category,{status:200});
    } catch (error) {
     console.log("Error updating category:",error);
        return NextResponse.json({error:"Failed to update category"},{status:500});
    }
}

// delete a category
export async function DELETE(req:NextRequest){
    try {
        const body=await req.formData();
        const id=body.get("id") as string;
        if(!id) return NextResponse.json({error:"Id is required"},{status:400});
        const category=await prisma.category.delete({
            where:{id:parseInt(id)}
        })
        return NextResponse.json(category,{status:200});
    } catch (error) {
        console.error("Error deleting category:",error);
        return NextResponse.json({error:"Failed to delete category"},{status:500});
    }
}

