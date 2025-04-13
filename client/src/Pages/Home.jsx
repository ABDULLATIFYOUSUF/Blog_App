import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { BASE_URI } from "../config";

function Home() {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      console.log("BASE_URI:", BASE_URI);
      const { data } = await axios.get(`${BASE_URI}/api/v1/blog/allBlogs`);
      console.log("Fetched Data:", data);
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 m-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="w-[90%] border-2 border-blue-600 p-4 rounded-2xl">
          <Card
            id={blog._id}
            isUser={localStorage.getItem("user") === blog.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username}
            userImage={blog.user?.image}
            time={new Date(blog.createdAt).toLocaleString()}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
