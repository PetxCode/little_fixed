import { getServerSession } from "next-auth";
import React from "react";
import { options } from "./api/auth/[...nextauth]/options";
import { MdDelete } from "react-icons/md";
import { revalidateTag } from "next/cache";

const page = async () => {
  const session = await getServerSession(options);

  const id = session?.user?.id;
  const url = "https://little-fixed.vercel.app/api/user/create/user";
  const res = await fetch(`${url}/${id}/pending`, {
    method: "GET",
    cache: "no-cache",
    next: {
      tags: ["todo"],
    },
  });
  const data = await res.json();

  const removeTodo = async (formData: FormData) => {
    "use server";
    const todoID = formData.get("todoID");

    const url = `http://localhost:3000/api/user/create/user/${id}/${todoID}`;

    await fetch(url, {
      method: "DELETE",
    });

    revalidateTag("todo");

    console.log(todoID);
    console.log(url);
  };

  console.log("reading: ", data);
  return (
    <div className="w-full">
      <div className="gap-4 grid">
        {data?.data?.map((props: any) => (
          <div key={props._id} className="w-[300px] p-4 border rounded-md ">
            <div className="flex w-full justify-between items-center">
              <p>{props?.title}</p>

              <form action={removeTodo}>
                <input type="hidden" name="todoID" value={props._id} />
                <button type="submit">
                  <MdDelete color="red" className="cursor-pointer" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
