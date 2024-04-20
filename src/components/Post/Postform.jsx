import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { IoMdPaperPlane } from "react-icons/io";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiImageOn } from "react-icons/ci";
import { useDropzone } from "react-dropzone";

function Postform({ post }) {
  const { getRootProps, getInputProps } = useDropzone();
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState({
    name: "No Image Uploaded",
    size: null,
  });
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

      if (file) {
        service.deleteFile(post.feature_img);
      }

      const dbpost = await service.updatePost(post.$id, {
        ...data,
        feature_img: file ? file.$id : post.feature_img,
        username: usedata.name,
      });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = data.img[0] ? await service.uploadFile(data.img[0]) : null;
      if (file) {
        const fileid = file.$id;

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
        username: usedata.name,
        // Assuming 'usedata' is defined and contains '$id'
      });
      if (dbpost) navigate(`/post/${dbpost.$id}`);
    }
  };
  const img_uploaded = useCallback(() => {
    if (uploaded) {
      toast.success("Image Uploaded Successfully");
    }
  }, [filename, uploaded]);
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      // Trim and convert to lowercase
      let slug = value.trim().toLowerCase();

      // Replace special characters with hyphens
      slug = slug.replace(/[^a-zA-Z0-9\s]+/g, "-");

      // Remove leading and trailing hyphens
      slug = slug.replace(/^\-+|\-+$/g, "");

      // Ensure the slug is no longer than 36 characters
      if (slug.length > 36) {
        slug = slug.substring(0, 36); // Truncate to 36 characters
      }

      // Replace remaining spaces with hyphens
      slug = slug.replace(/\s+/g, "-");

      // Validate the slug to ensure it starts with a valid character
      // (a-z, A-Z, 0-9, period, hyphen, underscore)
      const firstChar = slug.charAt(0);
      if (!/^[a-zA-Z0-9._-]+$/.test(firstChar)) {
        // Replace the first character if it's not valid
        slug = "x" + slug.substring(1); // Replace with 'x' or another valid character
      }

      return slug;
    }

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
    <form onSubmit={handleSubmit(submit)} className="w-full m-2">
      <h1 className="text-3xl font-bold text-blue ">SPREAD YOUR THOUGHTS</h1>
      <ToastContainer autoclose={4000} />
      <div className="flex items-center md:flex-row flex-col w-full  gap-2">
        <div className="flex  flex-col basis-1/2 justify-around h-[100vh]  p-2">
          <div className="shrink">
            <Input
              label="Title"
              placeholder="Enter your title"
              {...register("title", {
                required: true,
              })}
            />
          </div>
          <div className="shrink">
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
          </div>
          <div className="text-left shrink font-semibold  relative  flex justify-center items-center py-6 rounded-lg cursor-pointer border-dashed border-2 border-gray">
            <label
              className=" text-gray flex justify-center space-y-2 items-center cursor-pointer gap-4  "
              htmlFor="img_uploader"
            >
              <CiImageOn className="text-gray cursor-pointer  " size={80} />
              <div className="text-gray bg-slate-300 p-2 rounded-md">
                <h1 className="text-md">Upload Feature Image</h1>
                <p className="text-xs font-light ">
                  JPG,JPEG,GIF,PNG , <span>&#60;</span>5MB
                </p>
                <p
                  id="file-chosen"
                  className="text-blue  text-sm line-clamp-1 "
                >
                  {filename.name}{" "}
                </p>
                <span
                  className={`${
                    filename.size >= 5 ? "text-red-500" : "text-gray"
                  }`}
                >
                  {filename.size}
                </span>
              </div>
            </label>
            <p className="absolute top-0 text-gray text-sm font-light">
              Drag and Drop here
            </p>
            {/* <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div> */}

            <input
              type="file"
              accept="image/*"
              {...register("img")}
              id="img_uploader"
              className="  cursor-pointer w-full bg-slate-300 rounded-xl hidden "
              onChange={(e) => {
                console.log(e.target.files[0]);
                e.target.files[0] ? setUploaded(true) : setUploaded(false);
                const selectedFile = e.target.files[0];
                setFilename({
                  name: selectedFile.name,
                  size: (selectedFile.size / 2 ** 20).toFixed(2) + "MB",
                });
                img_uploaded();
              }}
            />
          </div>

          <div className="flex text-red-200 text-sm font-bold relative">
            {post && (
              <img
                src={
                  post.feature_img
                    ? service.getFile(post.feature_img)
                    : "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt={service.getFile(post.feature_img)}
                className="rounded-3xl aspect-[2/1] object-cover  "
              />
            )}
            {post && (
              <h1 className="absolute  bg-gray rounded-t-xl w-full ">
                {!post.feature_img ? "No Image Uploaded" : ""}
              </h1>
            )}
          </div>
          <div className="shrink">
            <Select
              label="Status"
              options={["active", "inactive"]}
              {...register("status", {
                required: true,
              })}
            />
          </div>
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
