import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URI } from '../config';

function CreateBlogs() {
  const navigate = useNavigate();
    const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false) // 🔵 Loading state added
   const [preview, setPreview] = useState("/profile.png"); // Default image


   const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const createBlog = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("user");

    if (!image || !title || !description) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("user", id);

    try {
      setLoading(true)
      const { data } = await axios.post(`${BASE_URI}/api/v1/blog/create-blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Blog Created Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to create blog");
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div>
        <form onSubmit={createBlog}>
          <div className='w-[90%] md:w-[40%] flex flex-col items-center mx-auto border border-blue-600 p-4 m-4 gap-4 rounded-2xl shadow-blue-600 shadow-lg'>
            <h1 className='font-bold text-blue-600 text-2xl underline'>Create Your Blog</h1>
            <input
              type="file"
              accept="image/*"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Clickable image */}
            <img
              src={preview}
              alt="User"
              onClick={handleImageClick}
              className="w-44 h-44 rounded-full border-2 border-blue-600 p-2 mx-auto cursor-pointer object-cover"
            />

            <input onChange={(e) => setTitle(e.target.value)} className='w-[90%] border-2 border-blue-600 p-4 rounded-2xl my-4' type="text" placeholder='Enter Title...' />
            <textarea onChange={(e) => setDescription(e.target.value)} className='w-[90%] border-2 border-blue-600 p-4 rounded-2xl my-4' placeholder='Enter description...' />
            <button type='submit' className='w-[90%] bg-blue-600 text-white text-2xl font-bold hover:border-2 hover:border-blue-600 p-4 rounded-2xl my-4'>            {loading ? "Creating..." : "Create"} {/* ✅ Show Loading Text */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlogs;
