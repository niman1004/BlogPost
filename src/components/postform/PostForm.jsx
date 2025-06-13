import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../header/RTE";
import Select from "../Select";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        status: "active",
      },
    });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

  const submit = async (data) => {
    setIsSubmitting(true);
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const dbPost = await appwriteService.createPost({
            ...data,
            userID: userData.$id,
          });

          if (dbPost) {
            navigate(`/`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
  <div className="w-full lg:w-2/3 px-2 mb-4">
    <Input
      label="Title"
      placeholder="Title"
      className="mb-4"
      {...register("title", { required: true })}
    />
    <Input
      label="Slug :"
      placeholder="slug"
      className="mb-4"
      {...register("slug", { required: true })}
      onInput={(e) => {
        setValue("slug", slugTransform(e.currentTarget.value), {
          shouldValidate: true,
        });
      }}
    />

    <RTE
      name="content"
      control={control}
      label="Content"
      defaultValue={getValues("content")}
    />
  </div>

  <div className="w-full lg:w-1/3 px-2">
    <Input
      label="Featured Image"
      type="file"
      className="mb-4"
      accept="image/png , image/jpg , image/jpeg"
      {...register("image", { required: !post })}
    />

    {post && (
      <div className="w-full mb-4">
        <img
          src={appwriteService.getPic(post.featuredImage)}
          alt={post.title}
          className="w-full h-auto object-cover rounded"
        />
      </div>
    )}

    <Select
      options={["active", "inactive"]}
      label="Status"
      className="mb-4"
      {...register("status", { required: true })}
    />

    <Button
      type="submit"
      className="w-full flex items-center justify-center gap-2"
      disabled={isSubmitting}
    >
      {isSubmitting && (
        <svg
          className="animate-spin h-5 w-5 text-blue-950"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {post ? "Update" : isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  </div>
</form>

  );
}
