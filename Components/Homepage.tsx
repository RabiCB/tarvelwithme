"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdDownload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
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

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      show={props?.open}
      size="lg"
      onHide={props?.close}
      onEscapeKeyDown={props?.close}
      className="rounded-lg"
      contentClassName="rounded-lg"
     
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div
        onClick={props?.close}
        className="h-10 w-10  absolute cursor-pointer  right-[-60px] max-md:right-[-0px] "
      >
        <IoMdClose size={32}  color="white" className="z-50 " />
      </div>

      <div className="w-full  min-h-[400px]  rounded-full">
        <img src={props?.img} className="w-full min-h-[400px] object-contain max-md:object-cover" />
      </div>
    </Modal>
  );
}
function Items({ currentItems }: Iprops) {
  const handleDownloadImage = (imageUrl: string) => {
    fetch(imageUrl,{
      referrerPolicy: "unsafe-url" ,
    })
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

  const [selected, setSelectedimg] = useState<string>("");
  const [openmodal, setOpenmodal] = useState(false);

  return (
    <>
      {selected && openmodal && (
        <MyVerticallyCenteredModal
          open={openmodal}
          close={() => setOpenmodal(false)}
          img={selected}
        />
      )}
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 w-full p-4 max-sm:grid-cols-1">
        {currentItems &&
          currentItems.map((item) => (
            <div
             
              className="group/item relative"
              key={item?._id}
            >
              <img
               onClick={() => {
                setSelectedimg(item?.image);
                setOpenmodal(true);
              }}
                alt={`image of ${item?.title}`}
                src={item?.image ?? " "}
                className="rounded-md object-cover w-full h-[280px]"
              />

              <div  onClick={() => handleDownloadImage(item?.image)} className="absolute right-2 bottom-2 z-50 group-hover/item:block hidden ease-in-out transition">
                <button  className="inline-flex items-center px-2">
                  <MdDownload
                   
                    size={32}
                    className="mr-1 text-gray-700"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
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
    window.scrollTo(0, 0);
  };
  return (
    <div className="flex flex-col w-full relative  min-h-screen">
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="flex h-6 text-lg absolute  bottom-[-30px] w-full  gap-8 justify-center items-center mb-4 "
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
