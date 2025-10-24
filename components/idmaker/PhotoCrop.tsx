"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image";


interface PhotoUploadProps {
  uploadPath?: string;
  filenameLabel?: string;
  fileName?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  uploadPath = "/api/upload/user",
  filenameLabel = "Enter filename (optional)",
  fileName = "user",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState(fileName);
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => setFilename(fileName), [fileName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => setImageSrc(reader.result as string);
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (imageSrc && imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
      });
    }
    //return () => cropperRef.current?.destroy();
    return () => {
      cropperRef.current?.destroy();
    };
  }, [imageSrc]);

  const handleCrop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      setCroppedImage(canvas.toDataURL("image/jpeg"));
    }
  };

  const handleSaveCrop = () => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = `${filename || "cropped-image"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Cropped image saved successfully!");
    } else {
      toast.error("No cropped image to save.");
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) return toast.error("Please crop the image first.");
    console.log(file)

    const formData = new FormData();
    formData.append("file", dataURLtoFile(croppedImage, `${filename || "image"}.jpg`));
    if (filename.trim()) formData.append("filename", filename.trim());

    setUploading(true);
    try {
      const response = await fetch(uploadPath, { method: "POST", body: formData });
      const data = await response.json();
      response.ok ? toast.success("Upload successful!") : toast.error(data.error || "Upload failed.");
    } catch {
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardContent>
      <div className="flex flex-col items-center space-y-2 p-2">
        <input type="file" accept="image/*"  onChange={handleFileChange} className="mb-2" />
        <label className="font-medium hidden">{filenameLabel}</label>
        <input
          type="text"
          placeholder="Enter filename (optional)"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="p-2 border rounded-lg hidden"
        />
        {imageSrc && <Image ref={imageRef} src={imageSrc} width={50} height={50} alt="To be cropped" className="w-64 h-64" />}
        <button onClick={handleCrop} className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Crop Image
        </button>
        {croppedImage && <Image src={croppedImage} alt="Cropped Preview" width={250} height={250} className="w-50 h-50 rounded-lg border" />}
        <button onClick={handleSaveCrop} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hidden">
          Save Cropped Image
        </button>
        {croppedImage && (
          <a href={croppedImage} download={`${filename || "cropped-image"}.jpg`} className="px-4 py-2 bg-purple-500 text-white rounded-lg hidden">
            Download Cropped Image
          </a>
        )}
        <button
          onClick={handleUpload}
          disabled={!croppedImage || uploading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          {uploading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>
      </CardContent>
    </Card>
  );
};

const dataURLtoFile = (dataUrl: string, filename: string) => {
  const [header, data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  const byteString = atob(data);
  const arrayBuffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }
  return new File([arrayBuffer], filename, { type: mime });
};

export default PhotoUpload;