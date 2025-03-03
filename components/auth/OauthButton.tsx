"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import Image from "next/image";

export const OauthButton = () => {
  const oauthLogin = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button
      onClick={oauthLogin}
      variant="secondary"
      className="w-full mt-4 py-3 rounded-3xl flex gap-4 border border-[#D0D1D2] bg-transparent cursor-pointer"
    >
      <Image
        src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/google.png"
        alt="google"
        width={30}
        height={30}
      />
      <p className="text-black">Continue with Google</p>
    </Button>
  );
};
