"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ComProps = {
  uploadPath: string | "/api/upload/esig";
  fileName: string;
  removebgAPI: string;
  onValidate: (arg0: boolean)=> void;
}
//uploadPath = "/api/upload/esig", fileName = "user"

const RemoveBgWithCrop = ({ removebgAPI, uploadPath, fileName, onValidate}: ComProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState(fileName);
  //const [aspectRatio, setAspectRatio] = useState<number | undefined>(4 / 3);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [upload, setUploadSTS] = useState(false);
 

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  console.log(selectedFile)

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImageSrc(reader.result as string);
      setSelectedFile(file);
      setFilename(fileName)
    }
  };

  // Initialize Cropper
  useEffect(() => {
    if (imageSrc && imageRef.current) {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }

      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: aspectRatio,
        viewMode: 1,
        autoCropArea: 1,
      });
    }
  }, [imageSrc, aspectRatio]);

  // Crop Image
  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      if (canvas) {
        setCroppedImage(canvas.toDataURL("image/png"));
        setImageSrc(null)
        toast.success("Image Crop Successfully successfully!");
      }
    }
  };
  //hanlde rotate
  const handleRotate = (angle: number) => {
    if (cropperRef.current) {
      cropperRef.current.rotate(angle);
    }
  };

  // Remove background
  const handleRemoveBg = async () => {
    if (!croppedImage) return toast.error("Please crop the image first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", dataURLtoFile(croppedImage, "cropped-image.png"));
    //"http://10.2.42.79:4001/removebg/"
    try {
      const response = await fetch(removebgAPI, {
        method: "POST",
        body: formData,
        headers: { Accept: "image/png" },
      });

      if (!response.ok) {
        throw new Error("Failed to remove background");
      }

      const blob = await response.blob();
      const processedImageUrl = URL.createObjectURL(blob);
      setOutputImage(processedImageUrl);
      setCroppedImage(null)
      toast.success("Background removed successfully!");
    } catch (error) {
      toast.error("Error processing the image.");
    } finally {
      setLoading(false);
    }
  };

  // Upload Image
  const handleUpload = async () => {
    if (!outputImage) return toast.error("No processed image to upload.");
    setUploading(true);

    try {
      const response = await fetch(outputImage);
      const blob = await response.blob();
      const file = new File([blob], `${filename || "image"}.png`, { type: "image/png" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename.trim());

      const uploadResponse = await fetch(String(uploadPath), { method: "POST", body: formData });
      const data = await uploadResponse.json();

      if (uploadResponse.ok) {
        setUploadSTS(true)
        onValidate(true)
        toast.success("Upload successful!");
      } else {
        toast.error(data.error || "Upload failed.");
      }
    } catch {
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };


  //handle reset

  const ResetBtn = () =>{
    setOutputImage(null)
    setCroppedImage(null)
    setImageSrc(null)
    setSelectedFile(null);
    
  }

  const OnCloseBtn = () =>{
    setOutputImage(null)
    setCroppedImage("")
    setImageSrc(null)
    setSelectedFile(null);
    setIsOpen(false)

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)} variant="default">Upload E-Signature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Crop & Remove Background</DialogTitle>
          <DialogDescription>Upload an image, crop it, and remove the background.</DialogDescription>
        </DialogHeader>

        {/* Scrollable Content (Horizontal Only) */}
        <div className="max-h-[70vh] overflow-x-auto whitespace-nowrap px-2">
          <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            {/* Upload Image */}
            <div className="flex flex-col">
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
            </div>

            {/* Aspect Ratio Selection */}
            <div className="flex flex-col">
              <Label>Select Crop Ratio</Label>
              <Select onValueChange={(value) => setAspectRatio(value === "free" ? undefined : parseFloat(value))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select Aspect Ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="1">1:1 (Square)</SelectItem>
                  <SelectItem value={(4 / 3).toString()}>4:3 (Standard)</SelectItem>
                  <SelectItem value={(16 / 9).toString()}>16:9 (Widescreen)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

            {/* Image to Crop */}
            {imageSrc && (
              <>
               <div>
                  <p className="text-center">Crop Image:</p>
                  <Image ref={imageRef} src={imageSrc} width={300} height={225} alt="To be cropped" className="border rounded shadow-md lg:w-[500px] sm:w-[300px] sm:h-[325px] object-cover" />
                  <div className="flex space-x-2">
                    <Button onClick={handleCrop} className="bg-green-500 text-white w-full">Crop Image</Button>
                    <Button onClick={() => handleRotate(90)} className="bg-yellow-500 text-white w-full">Rotate</Button>
                  </div>
               </div>
              </>
            )}

            {/* Cropped Image Preview */}
            {croppedImage && (
              <>
                <div>
                  <p className="text-center">Cropped Image:</p>
                  <Image src={croppedImage} width={300} height={225} alt="Cropped Preview" className="border rounded shadow-md lg:w-[500px] sm:w-[300px] sm:h-[325px] object-cover" />
                  <Button onClick={handleRemoveBg} disabled={loading} className="bg-blue-500 text-white w-full">
                    {loading ? "Processing..." : "Remove Background"}
                  </Button>
                </div>
              </>
            )}

            {/* Processed Image */}
            {outputImage && (
              <>
                <p className="text-center">Processed Image:</p>
                <Image src={outputImage} width={300} height={225} alt="Processed" className="border rounded shadow-md bg-white lg:w-[500px] sm:w-[300px] sm:h-[325px] object-cover" />

                {/* NEW Upload Button */}
                <Button onClick={handleUpload} disabled={uploading} className="bg-purple-500 text-white w-full">
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>

              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex space-x-2">
            <Button className="w-full " variant="outline" onClick={() => ResetBtn()} disabled={uploading}>
              {uploading ? "Uploading..." : "Reset"}
            </Button>
            {upload &&
              <Button className="w-full" onClick={() => OnCloseBtn()}>Done</Button>
            }
          </div>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Convert DataURL to File
const dataURLtoFile = (dataUrl: string, filename: string) => {
  const [header, data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/png";
  const byteString = atob(data);
  const arrayBuffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }
  return new File([arrayBuffer], filename, { type: mime });
};

export default RemoveBgWithCrop;
