"use client"
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
    const Activepage=usePathname()
   
  return (
    <div className="flex flex-col transition-all flex-1 min-w-[28%] list-none max-w-screen-xl min-h-screen justify-start items-center pt-[10%]  overflow-hidden gap-8  max-md:hidden">
      <li className= {`cursor-pointer font-serif text-lg ${Activepage==="/" && 'text-green-400'}`}>Home</li>
      <li className= {`cursor-pointer font-serif text-lg ${Activepage==="/contact" && 'text-green-400'}`}>Contact Me</li>
      <li className={`cursor-pointer font-serif text-lg ${Activepage==="/portfolio" && 'text-green-400'}`}>Portfolio</li>
      <li className={`cursor-pointer font-serif text-lg ${Activepage==="/about" && 'text-green-400'}`}>About</li>
    </div>
  );
};

export default Sidebar;
