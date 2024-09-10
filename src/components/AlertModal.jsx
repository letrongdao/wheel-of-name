import React from "react";

export default function AlertModal({ status, message, open, setOpen }) {
  return (
    <div
      onClick={() =>
        setOpen({
          status,
          message,
          open: false,
        })
      }
      className={`fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-gray-950/80 ${
        !open && "hidden"
      } transition-all ease-in-out duration-1000`}
    >
      <div
        className={`${
          status ? "bg-green-600" : "bg-red-700"
        } mx-auto my-[10%] p-8 border border-black w-3/4 rounded-[2em]`}
      >
        <p className="text-[2em] font-black">{message}</p>
      </div>
    </div>
  );
}
