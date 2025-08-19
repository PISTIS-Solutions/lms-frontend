"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import blogBack from "@/src/assets/blogBack.png";
import NavigationBar from "@/components/side-comp/nav";
import { MdOutlineOpenInNew } from "react-icons/md";
import Footer from "@/components/side-comp/landing/footer";
import blogImg from "@/src/assets/blogImg.png";
import axios from "axios";
import { urls } from "@/utils/config";
import { toast, ToastContainer } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next-nprogress-bar";

interface blogT {
  id: string;
  title: string;
  blog_link: string;
  blog_picture: string;
  created_at: string;
  updated_at: string;
  description: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<blogT[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${urls.blog}`);

      if (response.status === 200) {
        setBlogs(response.data || []);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white">
      <NavigationBar />
      <ToastContainer />
      <div
        style={{ backgroundImage: `url(${blogImg.src})` }}
        className=" h-[50vh] md:h-auto mx-3 md:bg-none bg-cover md:rounded-none rounded-[32px] relative"
      >
        <Image
          src={blogBack}
          alt="landing background"
          priority
          className="w-full hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:absolute static ml-6 my-0 md:my-14 p-3 lg:p-10 left-0 bottom-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-1 lg:py-2 font-medium text-sm md:text-base lg:text-lg">
            Featured Blog
          </div>

          <div className="flex items-center justify-between ">
            <h1 className="lg:text-5xl text-2xl md:text-4xl font-normal py-2 lg:py-4 text-white sm:text-left text-center">
              Stay Informed with Insights, Tips, and the Latest Trends in
              Learning and Development
            </h1>
            {/* <MdOutlineOpenInNew className=" w-14 h-14 text-white" /> */}
          </div>
          <p className="lg:text-base text-xs sm:text-left text-center md:text-sm font-normal max-w-[581px] pb-2 lg:pb-4 text-white">
            Explore our blog for expert advice, industry updates, and
            thought-provoking articles designed to inspire and guide your
            educational journey.Explore our blog for expert advice, industry
            updates, and thought-provoking articles designed to inspire and
            guide your educational journey.
          </p>
        </motion.div>
      </div>
      <div className="mt-5 md:mt-0">
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-xs sm:text-base font-normal text-[#FF1053] inline-block text-center "
          >
            Blog Posts
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-center text-[28px] md:text-[32px] "
          >
            Recent Blog Posts
          </motion.h1>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[300px] rounded-[16px]" />
            ))
          ) : blogs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-10">
              <p className="text-gray-500 text-sm md:text-base">
                No blogs available yet. Create one to get started!
              </p>
            </div>
          ) : (
            blogs.map((blog: blogT) => (
              <div
                onClick={() => router.push(`/blog/${blog.id}`)}
                key={blog.id}
                className="w-full cursor-pointer hover:shadow-md shadow-sm rounded-[16px]"
              >
                <div className="rounded-[16px]">
                  <Image
                    width={100}
                    height={100}
                    alt={blog.title}
                    src={blog.blog_picture!}
                    className="w-full h-[200px] rounded-[16px] object-cover"
                  />
                </div>

                <div className="p-3 flex flex-col gap-1.5">
                  <h2 className="text-main font-semibold text-lg">
                    {blog.title}
                  </h2>
                  <p className="text-[#666666] text-sm line-clamp-2">
                    {blog.description}
                  </p>
                  <div>
                    <p className="text-main text-xs font-medium">
                      {new Date(blog.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
