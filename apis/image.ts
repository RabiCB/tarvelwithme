import { api } from "@/constants"

export const getAllImages=async()=>{
    const res=await fetch(`${api.url}/images`,{
        cache:'no-store'
    })

    if(res.ok){
        return res.json()
    }else{
        console.log('something went wrong')
    }
}