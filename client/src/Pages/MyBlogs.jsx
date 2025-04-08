import React, { useEffect, useState } from 'react'
import {BASE_URI} from "../config/index"
import axios from 'axios'
import UserBlog from "../components/UserBlog.jsx"

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("user");
      const { data } = await axios.get(
        `${BASE_URI}/api/v1/blog/getUserBlog/${id}`
      );
      if (data?.success) {
        setBlogs(data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  },[]);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <UserBlog
                id={blog?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                userImage={blog?.user?.image}
                time={new Date(blog?.createdAt).toLocaleString()}
              />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-blue-600 my-10 text-center underline decoration-double">You have not created a blog</h1>
      )}
    </div>
  );
}

export default MyBlogs