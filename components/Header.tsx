"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import SearchSheet from "./SearchSheet";
import MenuSheet from "./MenuSheet";
import Link from "next/link";
import Image from "next/image";
const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="px-6 py-2 flex items-center justify-between w-full">
      <div className="cursor-pointer">
        <SearchSheet />
      </div>
      {/* logo */}
      <div className=" w-64 h-14 flex items-center justify-center ">
        <Link href="/" className="w-full h-full">
          <Image
            src="/Img/textonlyblack.png"
            alt="Logo"
            className="object-contain dark:hidden"
            width={256}
            height={56} 
          />
          <Image
            src="/Img/textonlywhite.png"
            alt="Logo"
            width={256}
            height={56}
            className="object-contain dark:block"
            priority
          />
        </Link>
      </div>

      <div className="cursor-pointer flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
          <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <MenuSheet />
      </div>
    </div>
  );
};

export default Header;
