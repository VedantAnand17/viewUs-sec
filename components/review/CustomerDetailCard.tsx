"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import useReviewPageStore from "@/store/useReviewPageStore";
import { ReviewForm } from "@/types";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
  image: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Please upload an image file."
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Only .jpg or .png files are accepted."
    ),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  jobTitle: z.string().optional().or(z.literal("")),
});

export const CustomerDetailCard = ({
  reviewForm,
}: {
  reviewForm: ReviewForm;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTopShadowVisible, setIsTopShadowVisible] = useState(false);
  const [isBottomShadowVisible, setIsBottomShadowVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      image: undefined,
      email: "",
      company: "",
      jobTitle: "",
    },
  });

  const {
    setReviewButton,
    setDetailsButton,
    detailsButton,
    setCustomerDetails,
    customerDetails,
  } = useReviewPageStore();

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setIsTopShadowVisible(scrollTop > 0);
      setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (customerDetails.image) {
      const imageUrl = URL.createObjectURL(customerDetails.image);
      setSelectedImage(imageUrl);
    }
    form.reset({
      firstName: customerDetails.firstName || "",
      lastName: customerDetails.lastName || "",
      image: customerDetails.image || undefined,
      email: customerDetails.email || "",
      company: customerDetails.company || "",
      jobTitle: customerDetails.jobTitle || "",
    });

    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [customerDetails, form]);

  const isFormValid =
    (reviewForm.details && reviewForm.details.userFirstName
      ? !!form.watch("firstName" as const)
      : true) &&
    (reviewForm.details && reviewForm.details.userLastName
      ? !!form.watch("lastName" as const)
      : true) &&
    (reviewForm.details && reviewForm.details.userEmail
      ? !!form.watch("email" as const)
      : true) &&
    (reviewForm.details && reviewForm.details.userJobTitle
      ? !!form.watch("jobTitle" as const)
      : true) &&
    (reviewForm.details && reviewForm.details.userCompany
      ? !!form.watch("company" as const)
      : true);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const normalizedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle,
      image: data.image,
    };
    setCustomerDetails(normalizedData);
    {
      reviewForm.details
        ? reviewForm.details.testimonialTextType
          ? setReviewButton("Text")
          : setReviewButton("Video")
        : setReviewButton("Video");
    }

    setDetailsButton(!detailsButton);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      form.setValue("image", file, { shouldValidate: true });
    }
  };
  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <Card className="relative w-[550px] mt-10 md:mt-0 px-[2%] h-[90vh] border-none shadow-none font-satoshi flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-left text-[#33313B] text-3xl md:text-[36px] font-[500]">
          Tell us about yourself
        </CardTitle>
        <CardDescription className="text-[#222222] font-[400] text-sm md:text-[16px] leading-[24px]">
          This information may be displayed with your testimonial.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative text-[14px] h-[60vh] md:h-[67vh] lg:h-[63vh] overflow-y-auto scrollbar-hidden">
        <div
          className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10 transition-opacity duration-300 ${
            isTopShadowVisible ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={contentRef}
          className="h-full overflow-y-auto scrollbar-hidden pr-4"
          onScroll={handleScroll}
        >
          <Form {...form}>
            <form
              id="personalInfoForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-[25px] md:space-y-[25px] mt-3 z-50"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Add a photo{" "}
                      {reviewForm.details && reviewForm.details.userPhoto && (
                        <span className="text-red-500">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-[64px] h-[64px] rounded-full overflow-hidden bg-[#E9F8FF] flex items-center justify-center">
                          {selectedImage ? (
                            <Image
                              src={selectedImage}
                              alt="Selected Image"
                              layout="fill"
                              objectFit="cover"
                            />
                          ) : (
                            <Image
                              src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/profile.png"
                              alt="Profile"
                              width={28}
                              height={28}
                            />
                          )}
                        </div>

                        <div className="flex flex-col">
                          <Button
                            variant="outline"
                            onClick={handleUploadClick}
                            className="rounded-3xl border-gray-400"
                          >
                            {selectedImage ? "Upload Again" : "Upload photo"}
                          </Button>

                          <input
                            ref={fileInputRef}
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name
                      {reviewForm.details &&
                        reviewForm.details.userFirstName && (
                          <span className="text-red-500">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Udit"
                        {...field}
                        className="h-[48px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name
                      {reviewForm.details &&
                        reviewForm.details.userLastName && (
                          <span className="text-red-500">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kapoor"
                        {...field}
                        className="h-[48px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Enter your email
                      {reviewForm.details && reviewForm.details.userEmail && (
                        <span className="text-red-500">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="uditkapoor060@gmail.com"
                        {...field}
                        className="h-[48px]"
                      />
                    </FormControl>
                    <div className="text-xs pt-0 font-light">
                      Your email will not be shared publically
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company
                      {reviewForm.details && reviewForm.details.userCompany ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ViewUs"
                        {...field}
                        className="h-[48px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Title
                      {reviewForm.details && reviewForm.details.userJobTitle ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Developer"
                        {...field}
                        className="h-[48px] z-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div
          className={`absolute hidden md:block bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10 transition-opacity duration-300 ${
            isBottomShadowVisible ? "opacity-100" : "opacity-0 hidden"
          }`}
        />
      </CardContent>
      <CardFooter className="flex justify-end items-center md:pb-0 md:pt-6 px-10">
        <Button
          form="personalInfoForm"
          type="submit"
          variant="form"
          disabled={!isFormValid}
          className={`w-3/12 py-5 px-4 text-xs md:text-[14px] ${
            !isFormValid ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};
