import Homepage from "@/Components/Homepage";
import Sidebar from "@/Components/Sidebar";
import { getAllImages } from "@/apis/image";
import { Suspense } from "react";


export default async function Home() {
  const data = await getAllImages();

  const [images]=await Promise.all([data])

 

  return (
    <div className="flex">
     <Sidebar/>
     <Suspense fallback={<p>ccccccccccccccccccccccccccccccccccccccc</p>}>
     <Homepage data={images } />
     </Suspense>
     
      
    </div>
  );
}
