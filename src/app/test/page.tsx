import PatronMasterEditForm from "@/components/PastronMaster/PatronEditForm";

import { GalleryVerticalEnd } from "lucide-react"


export default function RoomPage(){


  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center ">
      <div className="flex w-full flex-col gap-6  p-3">
        <a className="flex items-center gap-2 self-center font-medium ">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Room Reservations
        </a>
        
        <PatronMasterEditForm />
      </div>
    </div>
  )
}
