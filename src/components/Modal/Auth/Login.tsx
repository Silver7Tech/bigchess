import Logo from "@/assets/img/logo_large.png";
import { Button, Image, Input } from "@/components/UI/index.ts";
import { useAppState } from "@/providers/StateProvider";
import React from "react";
import { FaGoogle, FaTwitter } from "react-icons/fa";
export const LoginModal: React.FC = () => {
  const {
    actions: { setUserState },
  } = useAppState();
  return (
    <div className="relative w-full h-full bg-white-100 outline-none px-6 py-[15px] rounded-2xl">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center">
          <Image source={Logo} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Input type="email" placeholder="Email address" height="h-12" />
          <Button
            text="Continue"
            bg_color="bg-purple-100"
            height="h-12"
            text_color="text-white-100"
          />
        </div>
        <p className="text-base font-bold mt-6">
          Don't have an account?{" "}
          <span
            className="text-purple-100 cursor-pointer hover:underline"
            onClick={() => setUserState(true)}
          >
            Register now
          </span>
        </p>
        <div className="flex items-center w-full my-[35px]">
          <div className="flex h-[1px] bg-gray-400 w-full"></div>
          <div className="px-2 text-gray-500">OR</div>
          <div className="flex h-[1px] bg-gray-400 w-full"></div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            text="Continue with Google"
            icon={<FaGoogle fill="grey" />}
            height="h-12"
            bg_color="bg-white-100"
            border="border"
            text_color="text-black-100"
            className="inline-flex items-center justify-center"
          />
          <Button
            text="Continue with Twitter"
            icon={<FaTwitter />}
            height="h-12"
            bg_color="bg-blue-100"
            text_color="text-white-100"
            className="inline-flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};
