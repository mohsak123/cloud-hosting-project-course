"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      setLoading(true)
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      setTitle('');
      setDescription('')
      setLoading(false)
      toast.success('New article added')
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
        placeholder="Enter Your Email"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="mb-4 border rounded p-2 text-xl"
        placeholder="Enter Article Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner /> : "Add"}
      </button>
    </form>
  );
};

export default AddArticleForm;
