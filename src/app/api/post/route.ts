import prisma from "@/config/prismaConfig";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Post request");

  // current user
  const loginUser = await currentUser();
  // check if user is logged in
  if (!loginUser)
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });

  // get the form data
  const formData = await req.formData();

  console.log("Form data", formData);

  // get the file from the form data
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category_id = formData.get("category_id") as string;
  const public_path = formData.get("public_path") as string;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      categoryId: parseInt(category_id),
      public_path,
      accession_number: `${loginUser.firstName}-${Math.floor(
        Math.random() * 10000
      )}`,
      userId: loginUser.id as string,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}

// get all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
