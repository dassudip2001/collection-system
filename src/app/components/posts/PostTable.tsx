"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PostModelT } from "./CreatePostForm";
import axios from "axios";
import { Pen, Trash2 } from "lucide-react";

export default function PostTable() {
  const [posts, setPosts] = useState<PostModelT[]>([]);

  const fetchPosts = async () => {
    const response = await axios.get("/api/post");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Posts</h2>
              <div>
                <Link
                  href="/posts/create"
                  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Add New Post
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md mt-3 sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>

                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  More
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((pst) => (
                <tr
                  key={pst.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Image
                      className="w-10 h-10 rounded-full"
                      src={pst.public_path || "/default-image-path.jpg"}
                      height={40}
                      width={40}
                      alt={pst.title}
                    /> */}
                    <div className="ps-3">
                      <div className="text-base font-semibold">{pst.title}</div>
                      {/* <div className="font-normal text-gray-500">
                      neil.sims@flowbite.com
                      </div> */}
                    </div>
                  </th>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"> */}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(pst.createdAt as Date))}
                      {/* </div> */}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {pst.is_published ? (
                        <div className="h-2.5 w-2.5 rounded-full text-green-600 me-2 flex items-center justify-center">
                          Published
                        </div>
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full text-red-600 me-2 flex items-center justify-center">
                          NotPublished
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center">
                    <Link
                      href={`/posts/edit/${pst.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                    >
                      <Pen />
                    </Link>
                    <button
                      // onClick={() => handleDelete(cat.id as number)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {/* <tr>
                                <td colspan="5" className="text-center py-4 bg-white">No Record Found</td>
                            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
