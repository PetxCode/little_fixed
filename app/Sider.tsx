"use client";
import React, { useState } from "react";
import {
  MdCheckBox,
  MdCreateNewFolder,
  MdInbox,
  MdTimeToLeave,
  MdToday,
} from "react-icons/md";

import CreateTodo from "./createButton";
import Link from "next/link";
import Profile from "./Profile";

const Sider = () => {
  const bullet = [
    {
      id: 1,
      name: "pending",
      url: "/",
      icon: <MdTimeToLeave />,
    },
    {
      id: 2,
      name: "completed",
      url: "/complete",
      icon: <MdCheckBox />,
    },
  ];

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="w-[250px] flex flex-col border-r h-screen bg-slate-50 px-4 pt-10">
        <Link href="/setting">
          <Profile />
        </Link>
        <div className="mt-5 flex flex-col gap-4">
          {bullet?.map((el) => {
            return (
              <Link
                href={`${el.url}`}
                className="hover:border border-slate-50 border hover:text-white hover:bg-blue-950 cursor-pointer rounded-md px-2 py-4 duration-300 transition-all capitalize text-[15px] font-semibold flex items-center gap-2"
              >
                <p className="text-[18px] ">{el.icon}</p>
                {el.name}
              </Link>
            );
          })}
        </div>

        <div className="my-5">
          <hr />
        </div>

        <div
          onClick={() => {
            setToggle(true);
          }}
          className="hover:border border-slate-50 border hover:text-white hover:bg-blue-950 cursor-pointer rounded-md px-2 py-4 duration-300 transition-all capitalize text-[15px] font-semibold flex items-center gap-2"
        >
          <p className="text-[18px]">
            <MdCreateNewFolder />
          </p>
          Create todo
        </div>

        <div className="my-5">
          <hr />
        </div>
        <div className="flex-1" />
        <div>logout</div>
      </div>
      <div className="absolute top-0 left-0">
        {toggle && <CreateTodo setToggle={setToggle} />}
      </div>
    </div>
  );
};

export default Sider;
