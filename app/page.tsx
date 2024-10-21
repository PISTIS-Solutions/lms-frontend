// "use client";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { useEffect, useState } from "react";
// import { Loader2Icon } from "lucide-react";
// import useStudentsStore from "@/store/fetch-students-landing";
// import { ToastContainer } from "react-toastify";
// // import user from "@/public/assets/avatar.jpg";

// export default function Home() {
//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 2,
//       slidesToSlide: 1,
//     },
//     tablet: {
//       breakpoint: { max: 800, min: 464 },
//       items: 1,
//       slidesToSlide: 1,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       slidesToSlide: 1,
//     },
//   };

//   const { students, fetchStudents, loading } = useStudentsStore();

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // console.log(students.course_details, "stu")

//   return (
//     <main className="relative">
//       <ToastContainer/>
//       <div>
//         <NavigationBar />
//       </div>
//       <section className="flex items-center bg-hero-back bg-no-repeat bg-cover md:py-0 py-10 h-screen px-5 md:px-10">
//         <div className="">
//           <h1 className="text-7xl leading-snug text-white md:block hidden font-semibold mt-5 mb-10">
//             Empower Minds;
//             <br />
//             Ignite Futures
//           </h1>
//           <h1 className="text-5xl text-center md:hidden block text-white font-semibold mb-10">
//             Empower Minds; Ignite Futures
//           </h1>
//           <p className="text-sm md:hidden block text-center md:text-left text-white">
//             Comprehensive curriculum designed to equip students with the latest
//             technological skills
//           </p>
//           <p className="md:text-2xl text-sm md:block hidden text-center md:text-left text-white">
//             Comprehensive curriculum designed to equip students <br />
//             with the latest technological skills
//           </p>
//           <Link href="/pricing">
//             <Button className="bg-sub w-full md:w-1/2 text-black hover:text-white text-sm md:text-xl font-medium py-[25px] px-[40px] mt-20">
//               Start Learning
//             </Button>
//           </Link>
//         </div>
//       </section>
//       <section className=" flex items-center px-5 md:px-6 lg:px-10 justify-between bg-mid-back h-[117px] bg-no-repeat bg-cover">
//         <div className="flex w-full md:justify-evenly justify-center divide-x-[4px]">
//           <p className="text-white text-xs md:text-lg lg:text-2xl font-medium pr-4 md:pr-20 lg:pr-36">
//             {loading
//               ? "20+ Students"
//               : students?.number_of_students + " students"}
//           </p>
//           <p className="text-white text-xs md:text-lg lg:text-2xl font-medium px-4 md:px-20 lg:px-36">
//             Expert Mentors
//           </p>
//           <p className="text-white text-xs md:text-lg lg:text-2xl font-medium pl-4 md:pl-20 lg:pl-36">
//             {loading
//               ? "20+ courses"
//               : students?.number_of_courses + " courses"}
//           </p>
//         </div>
//       </section>
//       <section className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 lg:px-10 px-5 mx-2 items-center place-content-center justify-around my-14">
//         <LandingCard
//           image={cap}
//           headText="Smooth learning experience"
//           bodyText="Leveraging on technology to optimize the learning process  for students"
//         />
//         <LandingCard
//           image={user}
//           headText="Experienced mentors"
//           bodyText="Bridging the gap between theory and practical application, providing real-world insights to learners"
//         />
//         <LandingCard
//           image={book}
//           headText="Relevant course content"
//           bodyText="To ensure maximum benefit, we curated course content that is both relevant and engaging"
//         />
//       </section>
//       <section className="bg-[#FBFBFF] flex lg:flex-row flex-col-reverse relative justify-center lg:justify-between py-5 px-5 md:px-6 lg:px-10 items-center">
//         <Image
//           src={cir}
//           alt=""
//           className="absolute hidden md:block bottom-0 left-16"
//           priority
//         />
//         <Image
//           src={cir2}
//           alt=""
//           className="absolute hidden md:block top-0 left-0"
//           priority
//         />
//         <Image
//           src={girl}
//           alt="girl"
//           priority
//           className="z-10 md:w-auto w-1/2 max-w-[568px] h-auto"
//         />
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="lg:text-2xl md:text-xl text-sm text-[#727272] text-center lg:text-left relative">
//             LEARNING EXPERIENCE
//           </p>
//           <p className="lg:text-5xl text-xl md:text-2xl text-center font-semibold leading-snug py-4 relative lg:text-left">
//             A One-of-a-Kind <br />
//             <span className="text-[#33CC99]">Experience</span> Customized <br />
//             Just For You
//           </p>
//           <p className="lg:text-2xl text-sm md:text-lg max-w-[639px] relative text-center lg:text-left">
//             Access to a mentor that provides individualized attention, tailoring
//             their teaching style to your specific learning needs, strengths, and
//             weaknesses.
//           </p>
//         </motion.div>
//       </section>
//       <section className="bg-white relative lg:flex-row flex-col flex justify-center lg:justify-between py-5 px-5 md:px-6 lg:px-10 items-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="lg:text-2xl md:text-xl text-sm text-[#727272] text-center lg:text-left relative">
//             EASY INTERFACE
//           </p>
//           <p className="lg:text-5xl text-xl z-10 md:text-2xl text-center font-semibold leading-snug py-4 relative lg:text-left">
//             Easy To Use Online <br />
//             Learning Platform To <br />
//             <span className="text-main">Elevate</span> Your Skills
//           </p>
//           <p className="lg:text-2xl z-10 text-sm md:text-lg max-w-[639px] relative text-center lg:text-left">
//             Access to a mentor that provides individualized attention, tailoring
//             their teaching style to your specific learning needs, strengths, and
//             weaknesses.
//           </p>
//         </motion.div>
//         <Image
//           src={circle}
//           alt=""
//           className="absolute hidden md:block top-0 right-0"
//           priority
//         />
//         <Image
//           src={circle2}
//           alt=""
//           className="absolute hidden md:block bottom-0 right-16"
//           priority
//         />
//         <Image
//           src={boy}
//           className="z-10 md:w-auto w-1/2 max-w-[568px] h-auto"
//           alt="boy"
//           priority
//         />
//       </section>
//       <section className="bg-[#FAFAFD] ">
//         <div className="py-7">
//           <p className="text-[#7d7d7d] z-10 text-xs sm:text-lg md:text-2xl font-medium text-center px-[40px]">
//             TESTIMONIALS
//           </p>
//           <h1 className="md:text-4xl z-20 sm:text-xl text-lg  text-center font-bold">
//             What Our Students Say
//           </h1>
//         </div>
//         <div className=" px-5 relative">
//           <Carousel
//             containerClass="py-7"
//             className=""
//             responsive={responsive}
//             infinite={true}
//             autoPlay={true}
//             showDots={true}
//             swipeable={true}
//             autoPlaySpeed={3000}
//             removeArrowOnDeviceType={["desktop"]}
//           >
//             <TestimonialCard
//               avatar={tochukwu}
//               name="Tochukwu Odeme"
//               quote="Pistis provides you a unique personal experience on your path to becoming a cloud DevOps engineer. This program offers one-on-one mentorship sessions and various practical applications, covering all potential scenarios you may encounter when applying your skills to cloud-related challenges. Highly recommended for anyone serious about advancing in this field."
//             />
//             <TestimonialCard
//               avatar={olayinka}
//               name="Olayinka Olaiya"
//               quote="My experience with the DevOps training at Pistis Tech Academy has been outstanding. The comprehensive and practical modules, responsive instructors, and supportive community have significantly enhanced my skills and enriched my learning experience. I highly recommend this training to anyone passionate about gaining DevOps skills or advancing their knowledge, regardless of prior tech experience. Students are trained step-by-step from basic to advanced stages, making it suitable for everyone. Engage actively, utilize the community, and manage your time effectively to get the most out of this excellent program."
//             />
//             <TestimonialCard
//               avatar={oyedokun}
//               name="Oyedokun Damilare"
//               quote="The decision of learning from pistis-tech has been the very best for me. They make complicated software skills  so simple because of their expertise. Available to help are skilled mentors, resourceful materials and in depth critical thinking projects that will expose you to the field of your course. I can guarantee you that learning software skills from pistis-tech will make your hand so strong in any of the fields you pick."
//             />
//             <TestimonialCard
//               avatar={user}
//               name="Abayomi Omiwale"
//               quote="The timely help from the mentors has really made my learning easy and effective."
//             />
//             <TestimonialCard
//               avatar={tolulope}
//               name="Tolulope"
//               quote="A hub of well seasoned mentors, flexible learning, prompt response to issues. Pistis is a place where you can learn irrespective of what your schedule looks like."
//             />
//           </Carousel>
//         </div>
//       </section>
//       <section className="py-20 px-5 md:px-6 lg:px-10 bg-[#FDFBFB]">
//         <h1 className="mb-5 text-xl md:text-2xl lg:text-4xl text-center font-bold">
//           Our Popular courses
//         </h1>

//         <div className=" w-full flex justify-center">
//           <div className="grid grid-cols-1 md:grid-cols-2 relative lg:grid-cols-3 justify-items-center lg:w-[65vw] w-full gap-[16px]">
//             {loading ? (
//               <span className="flex text-center justify-center items-center w-full lg:text-xl font-semibold absolute text-main">
//                 <Loader2Icon className="animate-spin" />
//                 Loading...
//               </span>
//             ) : students?.course_details &&
//               students?.course_details.length > 0 ? (
//               students?.course_details
//                 .slice(0, 7)
//                 .map((course: any, index: number) => {
//                   return (
//                     <Coursecard
//                       key={course.id}
//                       id={course.id}
//                       index={index}
//                       image={course.course_image_url}
//                       header={course.title}
//                       moduleCount={course.module_count}
//                     />
//                   );
//                 })
//             ) : (
//               <p className="text-center lg:text-xl font-semibold absolute text-main text-sm">
//                 No course available yet!
//               </p>
//             )}
//             {/* <Coursecard
//               image={cicd}
//               header="CI/CD"
//               title="Continous Intergration and Development"
//               modules={2}
//             />
//             <Coursecard
//               image={dns}
//               header="Domain Name System"
//               title=""
//               modules={2}
//             />
//             <Coursecard image={docker} header="Docker" title="" modules={2} />
//             <Coursecard
//               image={git}
//               header="GIT"
//               title="Distributed version control system"
//               modules={2}
//             />
//             <Coursecard
//               image={gitops}
//               header="GITOPS"
//               title="Building a strong operational framework"
//               modules={2}
//             /> */}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <div className="lg:w-[65vw] w-full flex justify-end">
//           <Link href="/pricing">
//               <Button className="py-[18px] px-[20px] mt-8 hover:text-white bg-sub text-black text-lg md:text-2xl">
//                 Find Out More
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//       <footer className="mt-5 px-5 md:px-10 py-20 flex justify-center items-center">
//         <div className="bg-footer-back max-w-[1280px] flex flex-col justify-center items-center p-10 h-[571px]">
//           <h1 className="md:text-5xl text-xl sm:text-2xl font-semibold text-white text-center">
//             Sign Up Now To Start Learning
//           </h1>
//           <p className="md:text-2xl text-xs sm:text-base text-center text-white py-5">
//             Embark on a voyage of discovery, expand your horizons, and enrich
//             your mind by joining our community of eager learners. The doors to a
//             world of knowledge are swinging wide open, and it's time for you to
//             step through
//           </p>
//           <Link href="/pricing">
//             <Button className="bg-sub text-black px-16 hover:text-white font-semibold">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </footer>
//     </main>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import landingBck from "@/public/assets/landingBck.png";
import book from "@/public/assets/book.png";
import star from "@/public/assets/star.png";
import rocket from "@/public/assets/rocket.png";
import gram from "@/public/assets/gram.png";
import boy from "@/public/assets/boy.png";
import { tochukwu, olayinka, oyedokun, tolulope, avatar } from "./index";
import cube from "@/public/assets/cube.png";
import print from "@/public/assets/print.png";
import game from "@/public/assets/game.png";
import guy from "@/public/assets/guy.png";

import { MdOutlineLaunch } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Carousel from "@/components/side-comp/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CiCircleMinus } from "react-icons/ci";

import BeginnerCard from "@/components/side-comp/price/BeginnerCard";
import IntermediateCard from "@/components/side-comp/price/IntermediateCard";
import AdvanceCard from "@/components/side-comp/price/AdvancedCard";
import Footer from "@/components/side-comp/landing/footer";
import NavigationBar from "@/components/side-comp/nav";
import { motion } from "framer-motion";

const HomePage = () => {
  //carousel
  const [currentIndex, setCurrentIndex] = useState<any>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const images = [
    {
      name: "Tochukwu Odeme",
      quote:
        "Pistis provides you a unique personal experience on your path to becoming a cloud DevOps engineer. This program offers one-on-one mentorship sessions and various practical applications, covering all potential scenarios you may encounter when applying your skills to cloud-related challenges. Highly recommended for anyone serious about advancing in this field.",
      image: tochukwu,
    },

    {
      name: "Olayinka Olaiya",
      quote:
        "My experience with the DevOps training at Pistis Tech Academy has been outstanding. The comprehensive and practical modules, responsive instructors, and supportive community have significantly enhanced my skills and enriched my learning experience. I highly recommend this training to anyone passionate about gaining DevOps skills or advancing their knowledge, regardless of prior tech experience. Students are trained step-by-step from basic to advanced stages, making it suitable for everyone. Engage actively, utilize the community, and manage your time effectively to get the most out of this excellent program.",
      image: olayinka,
    },

    {
      name: "Oyedokun Damilare",
      quote:
        "The decision of learning from pistis-tech has been the very best for me. They make complicated software skills  so simple because of their expertise. Available to help are skilled mentors, resourceful materials and in depth critical thinking projects that will expose you to the field of your course. I can guarantee you that learning software skills from pistis-tech will make your hand so strong in any of the fields you pick.",
      image: oyedokun,
    },

    {
      name: "Abayomi Omiwale",
      quote:
        "The timely help from the mentors has really made my learning easy and effective.",
      image: avatar,
    },

    {
      name: "Tolulope",
      quote:
        "A hub of well seasoned mentors, flexible learning, prompt response to issues. Pistis is a place where you can learn irrespective of what your schedule looks like.",
      image: tolulope,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex: number) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const cardData = [
    {
      icon: book,
      head: "Hands-On Learning",
      p: "Engage in real-world projects that replicate industry challenges, building essential DevOps skills. These practical exercises prepare you to solve complex problems and implement cutting-edge solutions.",
    },
    {
      icon: star,
      head: "Expert Mentors",
      p: "Receive personalized guidance from experienced DevOps professionals who have spent years mastering their craft. Their insights will help you navigate your learning journey and achieve your goals.",
    },
    {
      icon: rocket,
      head: "Career Support",
      p: "Benefit from dedicated career coaching, including resume reviews and interview preparation tailored to the DevOps field. Our job placement assistance will connect you with top employers.",
    },
    {
      icon: gram,
      head: "Flexible Learning Paths",
      p: "Choose from a wide range of courses, bootcamps, and self-paced modules tailored to your learning style. Whether you're a beginner or an advanced learner, you'll progress at your own pace and convenience.",
    },
  ];

  const learnData = [
    {
      image: cube,
      head: "Peer-to-Peer Learning",
      para: "Join study groups and collaborate with fellow learners to deepen your DevOps understanding. This interactive environment fosters knowledge sharing and makes challenges more enjoyable.",
    },
    {
      image: print,
      head: "Mentorship Access",
      para: "Receive personalized feedback and guidance from experienced mentors dedicated to your success. They’ll help you navigate topics and achieve your learning goals.",
    },
    {
      image: game,
      head: "Gamified Learning",
      para: "Earn badges, rewards, and recognition as you progress, adding fun to your journey. This gamified approach keeps you engaged while celebrating your achievements!",
    },
  ];
  //faq
  // const FAQ = true;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOpenFAQ = (index: any) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const faqs = [
    {
      ques: "What is DevOps, and why is it important?",
      ans: "Ans 1",
    },
    {
      ques: "Do I need programming experience to take a DevOps course?",
      ans: "Ans 2",
    },
    {
      ques: "What tools and technologies will I learn in these DevOps courses?",
      ans: "Our DevOps courses cover a wide range of tools such as Docker, Kubernetes, Jenkins, Ansible, Terraform, Git, and CI/CD pipelines. The tools you learn depend on the specific course you choose.",
    },
    {
      ques: "Are your DevOps courses hands-on?",
      ans: "Ans 4",
    },
    {
      ques: "What career opportunities can I pursue after completing a DevOps course?",
      ans: "Ans 5",
    },
    {
      ques: "How long does it take to complete a DevOps course?",
      ans: "Ans 6",
    },
    {
      ques: "Will I get a certification after completing a DevOps course?",
      ans: "Ans 7",
    },
    {
      ques: "What if I have questions or need help during the course?",
      ans: "Ans 8 ",
    },
  ];

  return (
    <div className="bg-white">
      <NavigationBar />
      <div className=" mx-14 relative">
        <Image
          src={landingBck}
          alt="landing background"
          priority
          className="w-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute ml-6 my-14 p-10 left-0 top-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-2 font-medium text-lg">
            🚀 Automate and Innovate
          </div>

          <h1 className="text-5xl font-normal py-4 text-white">
            Become a <br />{" "}
            <span className="font-medium text-6xl relative underline-custom">
              DevOps Engineer
            </span>{" "}
            <br /> Faster Than You Think
          </h1>
          <p className="text-base font-normal max-w-[581px] pb-4 text-white">
            Learn from top industry experts, work on real-world projects, and
            join a supportive community.Learn from top industry experts, work on
            real-world projects, and join a supportive community.Learn from top
            industry experts, work on real-world projects, and join a supportive
            community.
          </p>
          <button className="bg-main rounded-[8px] hover:text-main hover:border hover:border-main transition-all ease-in duration-150 hover:bg-white font-medium text-base py-4 px-6 text-white flex items-center justify-between gap-2 cursoe-pointeer">
            Start Your Learning Journey Today{" "}
            <MdOutlineLaunch className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
      <div className="bg-white p-20 ">
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-base font-normal text-[#FF1053] inline-block text-center "
          >
            Key Benefits
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-[32px] "
          >
            Why Choose Our DevOps Program?
          </motion.h1>
        </div>
        <div className="grid grid-cols-2 gap-8 my-10">
          {cardData.map((data, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                key={index}
                className="rounded-[10px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex p-6 gap-x-6 items-center"
              >
                <Image alt="icon" src={data.icon} />
                <div>
                  <p className="text-main font-semibold text-2xl">
                    {data.head}
                  </p>
                  <p className="text-[#666666] font-normal text-base font-sf-pro-display pt-2">
                    {data.p}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className=" overflow-x-hidden flex items-center justify-between gap-x-20 p-20 bg-main bg-curve bg-bottom bg-contain bg-no-repeat">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
        >
          <Image alt="boy" src={boy} />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="max-w-[550px]"
        >
          <p className="bg-transparent border border-white rounded-[6px] py-2 px-4 text-base font-medium inline-block text-white">
            Optimize Software Delivery
          </p>
          <h1 className="font-medium text-5xl my-5 text-white">
            <span className="font-semibold relative underline-custom">
              Master the Future
            </span>{" "}
            of IT with DevOps
          </h1>
          <p className="text-base mb-5 text-white font-sf-pro-display">
            Join the next generation of DevOps engineers and acquire the
            expertise to revolutionize how businesses build, test, and deploy
            software. Whether you're just starting out or looking to advance
            your skills, our program will equip you with the tools to automate
            processes, enhance efficiency, and lead in a fast-paced, high-demand
            field.
          </p>
          <div className="flex flex-wrap gap-3">
            <p className="font-medium text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Transform Your DevOps Skills
            </p>
            <p className="font-medium text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Boost Your Career in Tech
            </p>
            <p className="font-medium text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Hands-On DevOps Training
            </p>
            <p className="font-medium text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Master CI/CD and Cloud
            </p>
            <p className="font-medium text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Learn from DevOps Experts
            </p>
            <p className="font-medium text-sm text-white rounded-[6px] bg-[#FFFFFF29] inline-block py-2 px-4">
              Real-World DevOps Projects
            </p>
          </div>
        </motion.div>
      </div>
      <div className="bg-white flex overflow-x-hidden items-center gap-x-20 justify-between p-20 ">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="max-w-[45%]"
        >
          <h1 className="text-main font-medium text-5xl ">
            Real Stories, Real Success
          </h1>
          <p className="text-base max-w-[472px] py-4 font font-sf-pro-display">
            See how our DevOps program has transformed careers and empowered
            professionals to achieve their goals.
          </p>
          <div className="flex items-center my-4 gap-x-8">
            <button
              className=" w-14 disabled:text-[#BDBDBD] text-main h-14 rounded-full bg-white flex justify-center items-center cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.1)]"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowLeft />
            </button>
            <button
              className=" w-14 h-14 rounded-full text-main disabled:text-[#BDBDBD] bg-white flex justify-center items-center cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.1)]"
              onClick={handleNext}
              disabled={currentIndex === 4}
            >
              <ArrowRight />
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="max-w-[48%] relative"
        >
          <Carousel
            images={images[currentIndex].image}
            name={images[currentIndex].name}
            quote={images[currentIndex].quote}
            currentIndex={currentIndex}
          />
        </motion.div>
      </div>
      <div className="p-[0_5rem_5rem_5rem] bg-white">
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-base font-normal text-[#FF1053] inline-block text-center "
          >
            Learning Experience
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-[32px] "
          >
            Enhance Your Learning Experience
          </motion.h1>
        </div>
        <div className="flex items-center justify-between gap-8 my-10">
          {learnData.map((learn, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                key={index}
                className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between rounded-[16px] py-8 px-6"
              >
                <div className="flex flex-col gap-y-2">
                  <p className="text-main font-medium text-2xl">{learn.head}</p>
                  <p className="font-normal text base font-sf-pro-display">
                    {learn.para}
                  </p>
                </div>
                <Image alt="card-img" className="p-4" src={learn.image} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="bg-white p-[0_5rem_5rem_5rem]">
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-base font-normal text-[#FF1053] inline-block text-center "
          >
            Pricing and Enrollment
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-[32px] "
          >
            Flexible Pricing for Everyone
          </motion.h1>
        </div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5 }}
          className="flex overflow-x-hidden flex-wrap items-center justify-between gap-6 my-10"
        >
          <BeginnerCard />
          <IntermediateCard />
          <AdvanceCard />
        </motion.div>
      </div>
      <div className="bg-white p-[0_5rem_5rem_5rem]">
        <div className="flex flex-col items-center gap-y-2">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="rounded-[6px] py-2 px-6 bg-[#FF105314] text-base font-normal text-[#FF1053] inline-block text-center "
          >
            FAQ
          </motion.p>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.7 }}
            className="text-main font-semibold text-[32px] "
          >
            Frequently Asked Questions
          </motion.h1>
        </div>
        <div className="flex flex-col justify-center items-center py-5">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 100 }}
              transition={{ duration: 0.5 }}
              key={index}
              onClick={() => handleOpenFAQ(index)}
              className={`cursor-pointer ${
                selectedIndex === index
                  ? "bg-[#FAFAFA] shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                  : "border border-[#9F9F9F] bg-white"
              } rounded-[10px] my-4 w-3/5 transition-all duration-300`}
            >
              <div className="flex items-center justify-between p-5">
                <p
                  className={`${
                    selectedIndex === index ? "text-main" : "text-[#9F9F9F]"
                  } text-lg font-semibold transition-colors duration-300`}
                >
                  {faq.ques}
                </p>
                {selectedIndex === index ? (
                  <CiCircleMinus className="w-6 h-6 transition-transform duration-300" />
                ) : (
                  <CiCirclePlus className="w-6 h-6 transition-transform duration-300" />
                )}
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-scroll ${
                  selectedIndex === index
                    ? "max-h-[500px] opacity-100 py-5"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#484848] p-5 font-normal text-base font-sf-pro-display">
                  {faq.ans}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-[#000066] flex justify-center items-center h-[788px]  ">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" rounded-[40px] flex items-center justify-between bg-[#000066] p-20 relative max-w-[1200px] shadow-[0_0_160px_0_rgba(0,0,0,0.4)]"
        >
          <div className="flex flex-col w-1/2 gap-10 mr-10">
            <h1 className="text-white font-medium text-5xl">
              Ready to Start Your DevOps Journey?
            </h1>
            <p className="text-base font-normal text-white">
              Join our vibrant community of aspiring engineers and embark on a
              transformative journey to unlock the skills needed for success in
              the ever-evolving world of DevOps. Together, we’ll equip you with
              the knowledge and practical experience to thrive in a dynamic
              industry!
            </p>
            <button className="rounded-[8px] bg-sub w-1/2 py-3 font-sf-pro-display cursor-pointer text-white font-medium text-base ">
              Enroll Today
            </button>
          </div>
          <Image
            className="absolute right-0 max-h-[689px] max-w-[618px]"
            alt="guy"
            src={guy}
          />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
