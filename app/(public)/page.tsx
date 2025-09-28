"use client";
// import { useTheme } from "next-themes";
import { menus } from "@/utils/constants/menus";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      {/* <div className="relative w-full flex-1 overflow-hidden">
        <Image
          src="/Img/placeholder-img.png"
          alt="a model getting her picture taken by a photographer"
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={100}
        />

        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source
            src="/Videos/photographer-doing-a-photoshoot-to-model-21407.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold text-[1.4rem]">Top Talents</h1>
        </div>
      </div> */}

      <div className="md:flex-row flex flex-col items-center w-full gap-4 text-[1.3rem] font-medium justify-center flex-wrap text-nowrap py-6 shrink-0 bg-background/70 backdrop-blur-md">
        {menus.map((menu, index) => (
          <Link key={index} href={menu.path}>
            {menu.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </main>
  );
}
