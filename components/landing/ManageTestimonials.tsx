"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export const ManageTestimonials = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  return (
    <div
      className=" text-white py-12 md:py-28 md:px-10 space-y-10 overflow-x-hidden flex justify-center flex-col items-center"
      ref={ref}
    >
      <section className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold"
        >
          Manage testimonials in minutes not hours.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-sm md:text-lg text-gray-400 px-6 md:px-0"
        >
          Say goodbye to hours of work—manage testimonials in minutes.
        </motion.p>
      </section>

      <div className="grid grid-cols-4 place-content-center gap-2 md:gap-4 overflow-hidden w-[600px] md:w-[1200px] lg:w-[2000px] h-full">
        <div className="col-span-1 row-span-2 flex items-center justify-center">
          <div className="rounded-lg">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/Signup.png"
              alt="Image 1"
              layout="responsive"
              width={100}
              height={500}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="rounded-lg flex items-end">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/dashboard.png"
              alt="Image 2"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="rounded-lg">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/importTestimonials.png"
              alt="Image 3"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="rounded-lg flex items-start overflow-hidden">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/testimonialsPage.png"
              alt="A preview of the testimonials page"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="rounded-lg flex items-start overflow-hidden">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/wallOfLovePage.png"
              alt="A preview of the testimonials page"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="col-span-2 grid grid-rows-2 gap-2 md:gap-4">
          <div className="col-span-2 row-span-2">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/wallOfLovePage.png"
              alt="Image 5"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
          <div className="row-span-1 col-span-1 rounded-lg">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/reviewPage.png"
              alt="Image 6"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
          <div className="row-span-1 col-span-1 rounded-lg">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/reviewPage.png"
              alt="Image 7"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md object-fill"
            />
          </div>

          <div className="col-span-2 row-span-2 rounded-lg">
            <Image
              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/testimonialsPage.png"
              alt="Image 8"
              layout="responsive"
              width={800}
              height={800}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
