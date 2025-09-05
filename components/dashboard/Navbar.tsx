"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import MenuSheet from "../MenuSheet";
import Image from "next/image";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="px-6 py-2 items-center  flex justify-between w-full">
      <div className="w-64 h-14  ">
        <Link href="/" className="relative">
          <Image
            src={"/img/text only black.png"}
            alt="Logo"
            className=" scale-100 dark:scale-0"
             width={1000}
            height={1000}
          />
          <Image
            src="/img/text only white.png"
            alt="Logo"
            className="absolute top-0 scale-0 dark:scale-100"
             width={1000}
            height={1000}
          />
        </Link>
      </div>
      <div className="cursor-pointer flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTheme(theme == "light" ? "dark" : "light");
          }}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <MenuSheet />
      </div>
    </div>
  );
};

export default Navbar;
