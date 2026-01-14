'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Camera, Home, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/20" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-30">
        <Sparkles className="w-6 h-6 text-accent-light animate-pulse" />
      </div>
      <div className="absolute top-32 right-20 opacity-40">
        <Camera className="w-8 h-8 text-primary-light animate-bounce" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-30">
        <Camera className="w-10 h-10 text-accent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-60 right-10 opacity-40">
        <Camera className="w-5 h-5 text-primary-light animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Large 404 Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20rem] font-bold text-background/20 select-none font-serif">
          404
        </span>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* Camera Icon with Glow */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-background/30 shadow-glow">
              <Camera className="w-16 h-16 text-background" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 bg-accent rounded-full animate-ping" />
              <div className="absolute inset-0 w-6 h-6 bg-accent rounded-full" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-background mb-4 font-serif">
            Oops!
          </h1>
          <p className="text-4xl text-background/90 mb-2">
            This page went off-set
          </p>
          <p className="text-background/80 text-3xl mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for isn&apos;t in our portfolio. Let&apos;s get you back to the spotlight.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              asChild 
              className="bg-background text-primary hover:bg-background/90 shadow-elegant px-8"
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-background"
          />
        </svg>
      </div> */}
    </div>
  );
};

export default NotFound;
