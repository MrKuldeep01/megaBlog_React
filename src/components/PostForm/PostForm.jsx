import React, { useCallback, useEffect } from "react";
import { Input, Button, SelectBtn, RTE } from "../index";
import appwriteService from "../../appwrite/DB_service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post = null }) => {
  const userData = useSelector((state) => state.auth.userData);
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
        appwriteService.deleteFile(post.featuredImage);
      }
      const Post = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (Post) {
        navigate(`/post/${Post.$id}`);
      }
    } else {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileid = file.$id;
        data.featuredImage = fileid;
        const dbpost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const createSlug = useCallback((value) => {
    if (value && typeof value == "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d]+/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", createSlug(value.title,{shouldValidate:true}));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, createSlug, setValue]);

  return <div></div>;
};

export default PostForm;
