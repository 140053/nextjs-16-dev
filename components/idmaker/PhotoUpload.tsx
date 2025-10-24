/*
Updated PhotoUpload Component
Customizable upload path (via uploadPath prop)
Customizable filename label (via filenameLabel prop)
Allows users to set a filename before uploading
*/
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface PhotoUploadProps {
  uploadPath?: string; // Default is `/api/upload`
  filenameLabel?: string; // Default label for filename input
  fileNamu?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  uploadPath = "/api/upload",
  filenameLabel = "Enter filename (optional)",
  fileNamu = "user",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState(fileNamu); // Set filename from prop
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFilename(fileNamu); // Update filename when prop changes
  }, [fileNamu]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (filename.trim()) {
      formData.append("filename", filename.trim());
    }

    setUploading(true);

    try {
      const response = await fetch(uploadPath, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Upload successful!");
      } else {
        toast.error(data.error || "Upload failed.");
      }
    } catch (error) {
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
      
      <label className="font-medium">{filenameLabel}</label>
      <input
        type="text"
        placeholder="Enter filename (optional)"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="p-2 border rounded-lg hidden"
      />

      {preview && <Image src={preview} alt="Preview" width={150} height={100} className="w-100 h-50 object-cover rounded-lg" />}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default PhotoUpload;
