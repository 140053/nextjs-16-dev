import { Button } from "../ui/button";


type ComProps ={
    id: number
    
}
export default function UpdateEntry({id}:ComProps){
    return(
        <>
            <Button>Edit{id}</Button>
        </>
    )
}