/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CategoryModelT } from "../category/CategoryForm";
import axios from "axios";
import FileUpload from "./FileUpload";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface PostModelT {
  id?: number | null;
  title: string;
  content: string;
  category_id: number;
  categoryId?: number;
  public_path?: string;
  is_published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// validate schema
export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),
  content: z
    .string()
    .max(255, "Content must be at most 255 characters")
    .optional(),
  category_id: z.number(),
  public_path: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

export default function CreatePosthtmlForm() {
  // const router = useRouter();
  // const { id } = Router.query;
  // console.log(id);

  const [isCategory, setIsCategory] = useState<CategoryModelT[]>([]);

  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category_id: 0,
      public_path: "",
    },
  });

  // save post
  const savePost = async (data: PostFormData) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content!);
      formData.append("category_id", data.category_id.toString());
      formData.append("public_path", data.public_path!);

      const response = await axios.post("/api/post", formData);
      if (response.data) {
        console.log("Post created");
        toast.success("Post created successfully");
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // categroty get
  const handleCategory = async () => {
    axios.get(`/api/category`).then((res) => {
      console.log(res.data);
      setIsCategory(res.data);
    });
  };

  useEffect(() => {
    handleCategory();
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            {/* <div className="flex"> */}
            <h2 className="text-2xl font-semibold">Create A New Post</h2>
            <p className="mb-3">
              All <span className="text-red-500">*</span> fields are required
            </p>

            {/* </div> */}
          </div>
          {/* toaster */}
          <ToastContainer />
          {/* create post form */}
          <div className="p-4 bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 mt-2 border-t-2">
            <form onSubmit={handleSubmit(savePost)}>
              <div className="grid grid-cols-2 sm:grid-cols-2">
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title <span className="text-red-500">*</span>:
                    </label>
                    <input
                      type="text"
                      id="title"
                      {...register("title")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter the Title"
                      required
                    />
                    {errors.title && (
                      <span className="text-red-500 text-sm">
                        {errors.title.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="category_id"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category <span className="text-red-500">*</span>:
                    </label>
                    <select
                      id="category_id"
                      {...register("category_id", {
                        valueAsNumber: true,
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="" disabled selected>
                        Choose a category
                      </option>
                      {isCategory.map((item) => (
                        <option key={item.id!} value={item.id!.toString()}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id! && (
                      <span className="text-red-500 text-sm">
                        {errors?.category_id.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="content"
                      {...register("content")}
                      placeholder="Write a brief description about your post"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                    {errors.content && (
                      <span className="text-red-500 text-sm">
                        {errors.content.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* image */}
                  <FileUpload
                    onFileSelect={(file) => console.log("Selected file:", file)}
                    onUploadComplete={(url) => {
                      console.log("URL uploaded:", url);
                      reset((prev) => ({ ...prev, public_path: url }));
                    }}
                  />
                </div>
              </div>
              <div className="flex items-end justify-end space-x-2 mb-2">
                <div>
                  <Link
                    href="/posts"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Go Back
                  </Link>
                </div>
                <button
                  type="submit"
                  className="text-white space-x-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
