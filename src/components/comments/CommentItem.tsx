'use client'
import { CommentWithUser } from "@/utils/types";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CommentItemProps {
  comment: CommentWithUser,
  userId: number | undefined
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commentDeleteHandler = async() => {
    try {
      if (confirm('you want delete this comment, are you sure?')) {
        const response = await axios.delete(`${DOMAIN}/api/comments/${comment.id}`)
        router.refresh();
        toast.success(response.data.message)
      }
    } catch (error:any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-green-800 uppercase">{comment.user.username}</strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{comment.text}</p>
      {
        userId && userId === comment.userId && (
          <div className="flex items-center justify-end">
            <FaEdit onClick={() => setOpen(true)} className="text-green-600 text-xl cursor-pointer me-3" />
            <FaTrash onClick={commentDeleteHandler} className="text-red-600 text-xl cursor-pointer" />
          </div>
        )
      }
      {open && <UpdateCommentModal setOpen={setOpen} text={comment.text} commentId={comment.id} />}
    </div>
  );
};

export default CommentItem;
