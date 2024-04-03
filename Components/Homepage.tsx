"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdDownload } from "react-icons/md";
interface Iprops {
  currentItems: {
    _id: number;
    title: string;
    image: string;
  }[];
}
interface dataprops {
  data: {
    _id: number;
    title: string;
    image: string;
  }[];
}

function Items({ currentItems }: Iprops) {
  const handleDownloadImage = (imageUrl: string) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        // Set the download attribute and filename
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        
        link.click();

     
        link?.parentNode?.removeChild(link);

        
      
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 w-full p-4">
      {currentItems &&
        currentItems.map((item) => (
          <div className="group/item relative cursor-pointer " key={item?._id}>
            <img
              alt={`image of ${item?.title}`}
              src={item?.image ?? " "}
              className="rounded-md object-cover w-full aspect-auto h-[300px]"
            />

            <div className="absolute right-2 bottom-8 group/edit invisible group-hover/item:visible  ease-in-out transition">
              <button className="  inline-flex items-center   px-2">
                {" "}
                <MdDownload
                  onClick={() => handleDownloadImage(item?.image)}
                  size={32}
                  className="mr-1 text-gray-700"
                />{" "}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

const Homepage = ({ data }: dataprops) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / 8);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 8) % data.length;

    setItemOffset(newOffset);
    window.scrollTo(0,0)
  };
  return (
    <div className="flex flex-col w-full relative ">
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="flex h-6 text-lg absolute bottom-[-30px] w-full  gap-8 justify-center items-center mb-4 "
        breakLabel="..."
        
        nextLabel={<GrNext size={18} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        activeClassName="bg-green-400 text-white h-6 w-6 flex items-center  justify-center  rounded-md"
        previousLabel={<GrPrevious size={18} />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Homepage;
