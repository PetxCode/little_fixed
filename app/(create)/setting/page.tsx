import React from "react";
import pix from "@/public/pix.jpeg";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import cloudinary from "@/utils/cloudinary";

const page = async () => {
  const session = await getServerSession(options);

  const id = session?.user?.id;
  const url = "https://little-fixed.vercel.app/api/user/create/user";

  const user = await fetch(`${url}/${id}`, {
    method: "GET",
  });
  const data = await user.json();

  console.log(data);

  const mainUpdate = async (formData: FormData) => {
    "use server";

    const image = formData.get("image") as File;

    const file = await image.arrayBuffer();
    const buffer = new Uint8Array(file);

    if (data.data.avatarID) {
      cloudinary.uploader.destroy(data?.data?.avatarID);

      const { secure_url, public_id }: any = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, (err, res) => {
              if (err) {
                return reject(err);
              } else {
                return resolve(res);
              }
            })
            .end(buffer);
        }
      );

      await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ avatar: secure_url, avatarID: public_id }),
      });
    } else {
      const { secure_url, public_id }: any = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, (err, res) => {
              if (err) {
                return reject(err);
              } else {
                return resolve(res);
              }
            })
            .end(buffer);
        }
      );

      await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ avatar: secure_url, avatarID: public_id }),
      });
    }
  };

  return (
    <div>
      <form action={mainUpdate}>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            src={data?.data?.avatar}
            alt=""
            width={1000}
            height={1000}
            className="w-16 h-16 border-blue-950 border-2 rounded-full bg-slate-100 object-cover"
          />
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpg image/png image/pjeg"
          className="hidden"
        />

        <button type="submit">update</button>
      </form>
      <div>
        <p className="text-[14px] font-semibold ">{session?.user?.name}</p>
      </div>
    </div>
  );
};

export default page;
