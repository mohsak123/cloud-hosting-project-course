"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFromProps {
  article: Article
}

const EditArticleFrom = ({article}: EditArticleFromProps) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [loading, setLoading] = useState(false)

  const formSubmitHandler = async(e: React.FormEvent) => {
    e.preventDefault();

    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      setLoading(true)
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {title, description});
      setLoading(false)
      toast.success('article updated');
    } catch (error: any) {
      setLoading(false)
      toast.error(error?.response?.data.message);
      console.log(error)
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="text"
        placeholder="Edit Your Email"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="mb-4 border rounded p-2 text-xl"
        placeholder="Edit Article Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner /> : "Edit"}
      </button>
    </form>
  );
};

export default EditArticleFrom;
