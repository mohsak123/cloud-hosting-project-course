"use client"
import { Dispatch, SetStateAction, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { DOMAIN } from '@/utils/constants'

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>,
  text: string,
  commentId: number
}

const UpdateCommentModal = ({ setOpen, text, commentId }: UpdateCommentModalProps) => {
  const [updateText, setUpdateText] = useState(text)
  const router = useRouter()
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (updateText === "") {
      return toast.info('Please write something')
    }

    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: updateText });
      router.refresh()
      setUpdateText('');
      setOpen(false)
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error)
    }
  }


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='w-11/12 lg:w-3/4 xl:w-2/5 p-3 rounded-lg bg-white'>
        <div className='flex justify-between'>
          <p className='text-xl text-blue-800 font-semibold'>Edit Your Commit</p>
          <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-3xl text-red-500 cursor-pointer mb-5' />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input type='text' placeholder='Edit Commit...'
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            className='rounded-lg text-xl py-2 px-3 w-full bg-white border-[1px] border-gray-400 outline-none'
          />
          <button type='submit' className='bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition'>Edit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCommentModal