import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URI } from "../config";

function BlogEdit() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URI}/api/v1/blog/get-blog/${id}`);
        if (data.success) {
          setTitle(data.blog.title);
          setDescription(data.blog.description);
          setImage(data.blog.image); // Set existing image
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBlogDetails();
  }, [id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set image file
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image instanceof File) {
        formData.append("image", image);
      }

      const { data } = await axios.put(`${BASE_URI}/api/v1/blog/update-blog/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Blog Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error updating blog");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={updateBlog}>
        <div className="w-[90%] md:w-[40%] flex flex-col items-center mx-auto border border-blue-600 p-4 m-4 gap-4 rounded-2xl shadow-blue-600 shadow-lg">
          <h1 className="font-bold text-blue-600 text-2xl underline">Update Blog</h1>

          <input
            type="file"
            onChange={handleFileChange}
            className="w-[90%] border-2 border-blue-600 p-4 rounded-2xl my-4"
          />
          {image && !(image instanceof File) && (
            <img src={image} alt="Preview" className="w-20 h-20 rounded-full" />
          )}
          
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[90%] border-2 border-blue-600 p-4 rounded-2xl my-4"
            type="text"
            placeholder="Enter Title..."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[90%] border-2 border-blue-600 p-4 rounded-2xl my-4"
            placeholder="Enter description..."
          />
          <button
            type="submit"
            className="w-[90%] bg-blue-600 text-white text-2xl font-bold hover:border-2 hover:border-blue-600 p-4 rounded-2xl my-4"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogEdit;
