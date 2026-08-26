import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../common";
import RichTextEditor from "./RichTextEditor";
import { postsService, storageService } from "../../api/appwrite";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useFilePreview } from "../../hooks/useFilePreview";
import { createSlug } from "../../utils/slug";

const STATUS_OPTIONS = [
  { value: "active", label: "Public", icon: "ri-eye-line" },
  { value: "inactive", label: "Private", icon: "ri-eye-off-line" },
];

const PostForm = ({ post }) => {
  const { user } = useAuthStatus();
  const navigate = useNavigate();
  const imageInputId = useId();
  const { url: existingImage } = useFilePreview(post?.featuredimage);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const status = watch("status");
  const selectedFile = watch("image")?.[0];
  const [localPreview, setLocalPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setLocalPreview(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setLocalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", createSlug(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const submitHandler = async (data) => {
    const newImageFile = data.image?.[0] ? await storageService.uploadFile(data.image[0]) : null;

    if (post) {
      if (newImageFile) {
        await storageService.deleteFile(post.featuredimage);
      }
      const updated = await postsService.updatePost(post.$id, {
        ...data,
        featuredimage: newImageFile ? newImageFile.$id : post.featuredimage,
      });
      if (updated) navigate(`/post/${updated.$id}`);
      return;
    }

    const created = await postsService.createPost({
      ...data,
      featuredimage: newImageFile ? newImageFile.$id : null,
      userid: user.$id,
    });
    if (created) navigate(`/post/${created.$id}`);
  };

  const previewImage = localPreview || existingImage;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full flex flex-col gap-6">
      <Input
        label="Title"
        placeholder="Give your post a title"
        className="text-base"
        error={errors.title?.message}
        {...register("title", { required: "Title is required" })}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Input
            label="Slug"
            hint={!errors.slug && "Auto-generated from the title — edit it if you want a custom URL"}
            error={errors.slug?.message}
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) => {
              setValue("slug", createSlug(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RichTextEditor label="Content" name="content" control={control} defaultValue={getValues("content")} />
        </div>

        <aside className="flex flex-col gap-5">
          <div>
            <span className="inline-block mb-1.5 text-sm font-medium text-slate-700">
              Featured image <span className="font-normal text-slate-400">(optional)</span>
            </span>
            <label
              htmlFor={imageInputId}
              className="group relative flex w-full aspect-video items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-indigo-400 transition-colors"
            >
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Featured" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors">
                    <span className="text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Change image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 px-4 text-center text-slate-400">
                  <i className="ri-image-add-line text-2xl"></i>
                  <span className="text-sm font-medium text-slate-600">Click to upload</span>
                  <span className="text-xs">PNG, JPG or GIF</span>
                </div>
              )}
              <input
                id={imageInputId}
                type="file"
                className="sr-only"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image")}
              />
            </label>
          </div>

          <div>
            <span className="inline-block mb-1.5 text-sm font-medium text-slate-700">Visibility</span>
            <div className="inline-flex w-full rounded-lg border border-slate-300 bg-slate-50 p-1">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue("status", option.value)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    status === option.value
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <i className={option.icon}></i>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant={post ? "secondary" : "primary"}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : post ? "Update post" : "Publish post"}
          </Button>
        </aside>
      </div>
    </form>
  );
};

export default PostForm;
