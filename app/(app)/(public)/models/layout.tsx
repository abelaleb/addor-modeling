"use client";
import MenuSheet from "@/components/MenuSheet";
import SearchSheet from "@/components/SearchSheet";
import { FloatingNav } from "@/components/ui/floating-navbar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <div>
      <div className="w-full flex justify-center gap-4 py-4">
        <Link
          href="/models/women"
          className={`link font-medium px-5 py-1 ${
            pathName.startsWith("/models/women")
              ? " border-foreground border-2"
              : ""
          }`}
        >
          Women
        </Link>

        <Link
          href="/models/men"
          className={`link font-medium px-5 py-1 ${
            pathName.startsWith("/models/men")
              ? " border-foreground border-2"
              : ""
          }`}
        >
          Men
        </Link>
      </div>
      {/* <FloatingNav className="px-4 z-10">
        <div className="cursor-pointer">
          <SearchSheet />
        </div>
        <div className="flex gap-3 cursor-pointer ">
          <div>
            <Link href="/models/women">Women</Link>
          </div>
          <div>
            <Link href="/models/men">Men</Link>
          </div>
        </div>
        <div className="cursor-pointer">
          <MenuSheet />
        </div>
      </FloatingNav> */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
