"use client";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type Sid = {
  id: number;
  onProccess: () => void
};

export default function ProccessRequest({ id, onProccess }: Sid) {
  const handleTransfer = async () => {
    try {
      const res = await fetch('/api/db/patron/idprocess/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success("Add to Processed ID Successfully");
        onProccess()
        
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to transfer data.");
      }
    } catch (error) {
      console.error("Error transferring data:", error);
      toast.error("Failed to transfer data.");
    }
  };

  return (
    <Button variant="outline" onClick={handleTransfer}>Add to Processed</Button>
  );
}
