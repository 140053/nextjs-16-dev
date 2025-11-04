"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

const PhotoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState(""); // Custom filename input
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    if (filename.trim()) {
      formData.append("filename", filename.trim());
    }

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
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
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
      <input
        type="text"
        placeholder="Enter filename (optional)"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="p-2 border rounded-lg"
      />
      {preview && <Image src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />}
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
