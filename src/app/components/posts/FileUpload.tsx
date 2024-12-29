import React, { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  onUploadComplete?: (url: string) => void;
}

const FileUpload = ({ onFileSelect, onUploadComplete }: FileUploadProps) => {
  const [preview, setPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/image-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onUploadComplete?.(response.data.publicId);
      console.log("Back", response.data.publicId);

      return response.data.url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be smaller than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelect?.(file);

    try {
      await uploadFile(file);
    } catch (error) {
      console.log(error);

      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`w-[90%] sm:w-[60%] relative border-2 ${
          isDragging ? "border-indigo-600" : "border-gray-300"
        } border-dashed rounded-lg p-6`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          accept="image/png,image/jpeg,image/gif"
          disabled={isUploading}
        />
        {!preview ? (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-image-up mx-auto"
            >
              <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
              <path d="m14 19.5 3-3 3 3" />
              <path d="M17 22v-5.5" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                </>
              )}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        ) : (
          <div className="relative w-full aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
