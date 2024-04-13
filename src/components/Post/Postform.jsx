import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { IoMdPaperPlane } from "react-icons/io";

function Postform({ post }) {
  const [uploaded, setUploaded] = useState(false);
  console.log(post);
  const navigate = useNavigate();
  const usedata = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.img[0] ? await service.uploadFile(data.img[0]) : null;
      console.log(file);
      console.log(post.feature_img);
      if (file) {
        service.deleteFile(post.feature_img);
      }

      const dbpost = await service.updatePost(post.$id, {
        ...data,
        feature_img: file ? file.$id : post.feature_img,
      });
      console.log(dbpost);
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = data.img[0] ? await service.uploadFile(data.img[0]) : null;
      if (file) {
        const fileid = file.$id;
        console.log(data);
        data.feautureImg = fileid;
      } else {
        data.feautureImg = "";
      }
      const dbpost = await service.createPosts(data.slug, {
        title: data.title,
        content: data.content,
        feature_img: data.feautureImg,
        status: data.status,
        userId: usedata.$id,
        // Assuming 'usedata' is defined and contains '$id'
      });
      if (dbpost) navigate(`/post/${dbpost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex items-center md:flex-row flex-col w-full ">
        <div className="flex flex-col basis-1/2 gap-[5vw] m-4 ">
          <Input
            label="Title"
            placeholder="Enter your title"
            {...register("title", {
              required: true,
            })}
          />
          <Input
            label="Slug"
            placeholder="Enter your slug"
            {...register("slug", {
              required: true,
            })}
            readOnly={true}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value));
              shouldValidate: true;
            }}
          />
          <div className="text-left font-semibold">
            <label className=" text-gray">Upload Feature Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("img")}
              className="  cursor-pointer w-full bg-slate-300 rounded-xl "
            />
          </div>
          {post && (
            <img
              src={service.getFile(post.feature_img)}
              alt={post.title}
              className="rounded-3xl"
            />
          )}
          <Select
            label="Status"
            options={["active", "inactive"]}
            {...register("status", {
              required: true,
            })}
          />
        </div>

        <div className=" basis-1/2 m-4 ">
          <RTE
            label="Content"
            placeholder="Enter your content"
            control={control}
            name="content"
            defaultValue={getValues("content")}
          />
        </div>
      </div>
      <Button type="submit">
        {post ? (
          <span className="flex items-center gap-4">
            Update Post <MdOutlineTipsAndUpdates />{" "}
          </span>
        ) : (
          <span className="flex items-center gap-4">
            Create Post <IoMdPaperPlane />
          </span>
        )}
      </Button>
    </form>
  );
}

export default Postform;
