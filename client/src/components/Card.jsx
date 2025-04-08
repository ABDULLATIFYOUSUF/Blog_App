import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BASE_URI} from "../config/index"
import toast from 'react-hot-toast'

function Card({
    title,
  description,
  image,
  username,
  userImage,
  time,
  id,
  isUser
})
{
  const navigate  = useNavigate()
  const handleEdit = () => {
    navigate(`/blog_edit/${id}`)
  }
  const handleDelete = async () => {
    try {
      const {data} = await axios.delete(`${BASE_URI}/api/v1/blog/delete-blog/${id}`)
      if(data.success){
        toast.success("deleted successfully")
        window.location.reload()
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div>
      <div className='flex justify-between items-center'>
      <div className="flex items-center gap-4 m-2">
    <img
      className="w-10 h-10 rounded-full"
      src={userImage}
      alt=""
    />
    <h1>{username}</h1>
  </div>
  {isUser && <div className='flex gap-4'>
  <button onClick={handleEdit} className='bg-green-700 p-3 rounded-2xl text-white font-bold'>Edit</button>
  <button onClick={handleDelete} className='bg-red-700 p-3 rounded-2xl text-white font-bold'>Delete</button>
</div>}
      </div>
  <p className='m-2'>{time}</p>
  <div className="flex flex-col items-center gap-2">
  <img className="md:w-[20%] md:h-[20%] border-2 border-blue-600 rounded-2xl" src={image} alt="" />
  <h1 className="font-bold text-2xl">{title}</h1>
  <p>{description}</p>
  </div></div>
  )
}

export default Card