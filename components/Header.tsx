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
    <div className="px-6 py-2 flex items-center justify-between w-full sticky top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50">
      <div className="cursor-pointer">
        <SearchSheet />
      </div>
      {/* logo */}
      <div className=" w-64 h-12 flex items-center justify-center ">
        <Link href="/" className="w-full h-full">
          <Image
            src="/images/textonlyblack.png"
            alt="Logo"
            className="object-contain block dark:hidden"
            width={300}
            height={300} 
          />
          <Image
            src="/images/textonlywhite.png"
            alt="Logo"
            width={300}
            height={300}
            className="object-contain hidden dark:block"
            priority
          />
        </Link>
      </div>

      <div className="cursor-pointer flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="relative border-none hover:text-yellow-700"
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
