import { Card, CardContent, CardHeader } from "../ui/card";


interface pageProp {
    title: string;
    titleCol:string;
    message:string;
}

export default function ErrorCard({title, titleCol, message}: pageProp){
    return (

        <div className="bg-muted flex min-h-svh flex-col items-center justify-center ">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Card className=" text-center">
            <CardHeader>
              <h1 className={`text-4xl ${titleCol} `}>{title}</h1>
            </CardHeader>
            <CardContent className="w-full border">
              <div className="text-center text-3xl">
                <p>{message}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}