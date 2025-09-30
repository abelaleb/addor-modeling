"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
const HeroVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
   const [scrollY, setScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    // Parallax and fade effects based on scroll
    const opacity = Math.max(0, 1 - scrollY / 800);
    const transform = `translateY(${scrollY * 0.5}px)`;
  return (
    <div className="relative w-[100vw] flex-1 overflow-hidden h-[100vh]">
      <Image
        src="/images/placeholder-img.png"
        alt="a model getting her picture taken by a photographer"
        fill
        priority
        className="w-full h-full object-cover"
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
          src="/videos/photographer-doing-a-photoshoot-to-model-21407.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-[1.4rem]">Top Talents</h1>
      </div> */}
      <div 
        className="relative z-10 h-full flex items-center justify-center text-center"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-wide">
            ADDOR.
          </h1> */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide max-w-2xl mx-auto">
            Discover exceptional talent. Create iconic moments. Define the future of fashion.
          </p>
          
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-medium tracking-wide"
            >
              Discover Models
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-medium tracking-wide"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Showreel
            </Button>
          </div> */}
        </div>
      </div>

    </div>
  );
};

export default HeroVideo;
