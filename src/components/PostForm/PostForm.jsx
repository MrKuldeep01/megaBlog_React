import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Button, SelectBtn, RTE } from "../index";
import appwriteService from "../../appwrite/DB_service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const submitHandler = async (data) => {
    if (post) {
      const file = (await data.image[0])
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredimage);
      }
      const Post = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });
      if (Post) {
        navigate(`/post/${Post.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileid = file.$id;
        data.featuredimage = fileid;
        data.userid = userData.$id;

        const dbpost = await appwriteService.createPost({
          ...data,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  // regEx that is provided by video :  .replace(/^[a-zA-Z\d]+/g, "-");

  const createSlug = useCallback((value) => {
    if (value && typeof value == "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[\sW]+/g, "-")
        .substring(0, 12);
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", createSlug(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, createSlug, setValue]);

  // -------------------------

  const [postImage, setPostImgae] = useState(null);
  if (post) {
    appwriteService
      .getFilePreview(parseInt(post["featuredimage"]))
      .then((url) => {
        if (url) {
          setPostImgae(url.href);
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ----------
console.log("postform render");
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex-col flex-wrap sm:flex items-center sm:items-start justify-center gap:2 sm:gap-1 relative"
    >
      <div className="top w-full flex items-center ">
        <div className="w-full block sm:inline-block sm:w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            readOnly
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", createSlug(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <div className="w-full sm:w-1/3 px-2 ">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={postImage || ""}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <SelectBtn
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
        </div>
      </div>
      <div className="editor w-full block">
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <Button
        type="submit"
        bgColor={!post ? "bg-black" : "bg-green-500"}
        className="w-full my-4 duration-200 hover:scale-[1.01]"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
};
export default PostForm;
