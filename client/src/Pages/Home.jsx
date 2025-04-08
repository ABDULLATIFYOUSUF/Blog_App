import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URI } from "../config/index";
import Card from "../components/Card";

function Home() {
  const [blogs, setBlogs] = useState();
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URI}/api/v1/blog/allBlogs`);
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  });
  return (
    <>
      <div className="flex flex-col items-center gap-4 m-4">
        {blogs &&
          blogs.map((blog) => (
            <div key={blog._id} className="w-[90%] border-2 border-blue-600 p-4 rounded-2xl">
              <Card
                id={blog?._id}
                isUser={localStorage.getItem("user") === blog.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                userImage={blog?.user?.image}
                time={new Date(blog.createdAt).toLocaleString()}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
