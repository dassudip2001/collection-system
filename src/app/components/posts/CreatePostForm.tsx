"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CategoryModelT } from "../category/CategoryForm";
import axios from "axios";
import Image from "next/image";


export interface CreatePostT {
    id?: number;
    title: string;
    content: string;
    description?: string;
    url?: string;
    public_path?: string;
    is_published?: boolean;
    published_at?: string;
    file?: string;
    userId: string;
    categoryId: number;
    accession_number?: string;
    createdAt?: string;
    updatedAt?: string;
}

// zod validation schema
const postSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title must be at most 255 characters"),
    content: z.string().max(255, "Content must be at most 255 characters"),
    description: z.string().max(255, "Description must be at most 255 characters").optional(),
    url: z.string().optional(),
    public_path: z.string().optional(),
    is_published: z.boolean().optional(),
    published_at: z.string().optional(),
    userId: z.string(),
    file: z.string().optional(),
    categoryId: z.number(),
    accession_number: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})


type CreatePostFormData = z.infer<typeof postSchema>;


export default function CreatePosthtmlForm() {
    const [isCategory, setIsCategory] = useState<CategoryModelT[]>([]);


    // categroty get
    const handleCategory = async () => {
        axios.get(`/api/category`).then((res) => {
            console.log(res.data);

            setIsCategory(res.data);
        })
    }

    useEffect(() => {
        handleCategory();
    }, [])

    // save the post
    const handleSave = async (data: CreatePostFormData) => {
        console.log(data);

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("userId", data.userId);
        formData.append("categoryId", data.categoryId.toString());
        if (data.file && data.file.length > 0) {
            for (let i = 0; i < data.file.length; i++) {
                formData.append("file", data.file[i]);
            }
        }

        try {
            const response = await axios.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

            toast.success("Post created successfully!");
            reset(); // Reset the form after successful submission
        } catch (error) {
            toast.error("Failed to create post.");
            console.error(error);
        }
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            userId: "",
        }
    })
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-semibold">Create A New Post</h2>

                        </div>
                    </div>
                </div>
                {/* create post form */}
                {/* toaster */}
                <ToastContainer />
                <div
                    className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2 border-t-2">
                    <p className="mb-3">All <span className="text-red-500">*</span> fields are required</p>
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className="grid grid-cols-2 sm:grid-cols-2">
                            <div>
                                <div className="mb-6">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Title <span className="text-red-500">*</span>:
                                    </label>
                                    <input type="text" id="title"
                                        {...register("title")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Enter the Title" required />
                                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Category <span className="text-red-500">*</span>:
                                    </label>
                                    <select id="category_id" {...register("categoryId", { valueAsNumber: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option value="" disabled selected>Choose a category</option>
                                        {isCategory.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea id="content"  {...register("content")}
                                        placeholder="Write a brief description about your post"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
                                </div>
                            </div>
                            <div>
                                {/* image */}
                                <div className="flex justify-center items-center m-2">
                                    <div className="w-[90%] sm:w-[50%] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                                        id="dropzone">
                                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50"
                                            id="imageUpload" {...register("file")} multiple />
                                        <div className="text-center">
                                            <Image className="mx-auto h-12 w-12" width={100} height={100}
                                                src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                <label htmlFor="file-upload" className="relative cursor-pointer">
                                                    <span>Drag and drop</span>
                                                    <span className="text-indigo-600"> or browse</span>
                                                    <span>to upload</span>
                                                    <input id="file-upload" name="file-upload" type="file"
                                                        className="sr-only" />
                                                </label>
                                            </h3>
                                            <p className="mt-1 text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
                            <button type="submit"
                                className="text-white space-x-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                Save
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}