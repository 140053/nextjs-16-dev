"use client"

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

   

type Sid = {
    id: number;
    onProccess: () => void
    };


const AddToPrint = ({id, onProccess}:Sid) => {
    const handleTransfer = async () => {
        try {
        const res = await fetch('/api/db/patron/idprocess/addtoprint', {
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
        toast.error("Failed to transfer data.");
        }
    };

    return (
        <Button variant="outline" onClick={handleTransfer}>Add to Print</Button>
      );
}



export default AddToPrint;