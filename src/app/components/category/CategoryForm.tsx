"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Pen, Plus, Trash2 } from "lucide-react";
// Category model type
export interface CategoryModelT {
  id?: number | null;
  name: string;
  slug?: string;
  description?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// validate schema
const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),

  description: z
    .string()
    .max(255, "Description must be at most 255 characters")
    .optional(),
  userId: z.string(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryForm() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<CategoryModelT | null>(null);
  const [category, setCategory] = useState<CategoryModelT[]>([]);
  // const [loading,isLoading]=useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      userId: "",
    },
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    setCategoryData(null);
    reset();
    toggleModal();
  };

  const handleEdit = (category: CategoryModelT) => {
    setIsEditMode(true);
    setCategoryData(category);
    reset(category);
    toggleModal();
  };

  //   delete category
  const handleDelete = async (id: number) => {
    try {
      const formData = new FormData();
      formData.append("id", id.toString());
      const response = await axios.delete("/api/category", { data: formData });
      if (response.data) {
        console.log("category deleted");
        toast("Category deleted successfully");
        fetchCategory();
      }
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  // fetch all categories form the prisma api
  const fetchCategory = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategory(data);
  };
  //   useEffect for fetching the categories
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSave = async (data: CategoryFormData) => {
    try {
      const formdata = new FormData();
      formdata.append("name", data.name);
      if (data.description) {
        formdata.append("description", data.description);
      }

      if (isEditMode && categoryData?.id) {
        // update category
        formdata.append("id", categoryData.id.toString());
        const response = await axios.put("/api/category", formdata);
        if (response.data) {
          console.log("category updated");
          toast("Category updated successfully");
          fetchCategory();
        }
      } else {
        const response = await axios.post("/api/category", formdata);
        console.log(response.data);
        toast("Category saved successfully");
        fetchCategory();
      }
      toggleModal();
    } catch (error) {
      console.log("Error saving category:", error);
    }
  };

  return (
    <div>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-gray-100 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4 text-gray-900">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Category</h2>
                <div className="flex">
                  <button
                    onClick={handleAddNew}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <div className="flex space-x-4">
                      <Plus /> Add New
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* toaster */}
          <ToastContainer />
          <div className="relative overflow-x-auto shadow-md mt-3 sm:rounded-lg bg-slate-100 ">
            <div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      More
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((cat) => (
                    <tr key={cat.id} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(cat.createdAt as Date))}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                        >
                          <Pen />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id as number)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-full">
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="p-6">
                <h2 className="text-xl font-medium">
                  {isEditMode ? "Edit Category" : "Add New Category"}
                </h2>
                <div className="mt-4">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter category name"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Enter description (optional)"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
