'use client';
import Image from 'next/image';
import { useState } from 'react';
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

export default function RemoveBg() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch("http://10.2.42.79:4001/remove-bg/", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'image/png',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      setOutputImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Upload E-Signature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add E-Signature</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</Label>
          <Input 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handleFileChange} 
          />
          
          {previewImage && (
            <div className="mt-2">
              <p className="text-center text-sm text-gray-700">Selected Image:</p>
              <Image width={250} height={250} src={previewImage} alt="Preview" className="mt-2 border rounded shadow-md" />
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Upload & Remove Background'}
          </Button>

          {outputImage && (
            <div className="mt-4">
              <p className="text-center">Processed Image:</p>
              <Image width={250} height={250} src={outputImage} alt="Processed" className="mt-2 border rounded shadow-md bg-white" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
