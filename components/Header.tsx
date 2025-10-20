"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import SearchSheet from "./SearchSheet";
import MenuSheet from "./MenuSheet";
import Link from "next/link";
import Image from "next/image";
import { UserRound, LogOut, UserCircle2 } from "lucide-react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UserProfile {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [user, setUser] = useState<UserProfile | null>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
      else setUser(null);
    };

    fetchUser();

    // Listen for sign in/out changes
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="px-6 py-2 flex items-center justify-between w-full sticky top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50">
      {/* Left: Search */}
      <div className="cursor-pointer hover:text-tertiary active:text-tertiary">
        <SearchSheet />
      </div>

      {/* Center: Logo */}
      <div className="w-64 h-12 flex items-center justify-center">
        <Link href="/" className="w-full h-full">
          <Image
            src="/images/textonlyblack.png"
            alt="Logo"
            className="object-contain block dark:hidden"
            width={300}
            height={300}
            priority
          />
          {/* Optional dark mode logo */}
          {/* <Image
            src="/images/textonlywhite.png"
            alt="Logo"
            className="object-contain hidden dark:block"
            width={300}
            height={300}
            priority
          /> */}
        </Link>
      </div>

      {/* Right: Auth + Menu */}
      <div className="cursor-pointer flex items-center justify-center gap-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center justify-center rounded-full hover:bg-muted p-1.5 transition-colors focus:outline-none"
                aria-label="User Menu"
              >
                <UserRound
                  className="w-6 h-6 text-foreground hover:text-tertiary transition-colors"
                  strokeWidth={2}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                  <UserCircle2 className="w-4 h-4" />
                  Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-500 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth" className="font-bold hover:text-tertiary">
            Sign in
          </Link>
        )}
        <MenuSheet />
      </div>
    </div>
  );
};

export default Header;
