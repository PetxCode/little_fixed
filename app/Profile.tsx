import React from "react";
import pix from "@/public/pix.jpeg";
import Image from "next/image";

const Profile = () => {
  return (
    <div>
      <div className="mb-10 flex gap-3 ">
        <Image
          src={pix}
          alt=""
          width={1000}
          height={1000}
          className="w-16 h-16 border-blue-950 border-2 rounded-full bg-slate-100 object-cover"
        />
        <div>
          <p className="text-[14px] font-semibold ">{"params.name"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
