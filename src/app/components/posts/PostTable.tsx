"use client";
import Image from "next/image";
import Link from "next/link";

export default function PostTable() {
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
                  Created By
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    className="w-10 h-10 rounded-full"
                    src=""
                    height={40}
                    width={40}
                    alt=""
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold"></div>
                    <div className="font-normal text-gray-500">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4"></td>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center"></div>
                </td>
                <td className="px-6 py-4">
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href="{{ route('posts.show', $pst->id) }}"
                  >
                    Edit
                  </a>
                </td>
              </tr>
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
