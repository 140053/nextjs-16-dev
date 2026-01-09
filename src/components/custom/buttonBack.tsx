"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function ButtonBack(){
    const router = useRouter();

    const goBack = () => {
        router.back();
    }
    return(
        <Button
            variant="outline"
            onClick={goBack}
        >
            Back
        </Button>
    )
}