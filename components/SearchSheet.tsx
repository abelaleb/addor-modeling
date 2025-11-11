"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const SearchSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    // controlled: pass onOpenChange so the Sheet can toggle your state
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      {/* asChild lets a custom element act as the trigger */}
      <SheetTrigger asChild>
        <div aria-label="Open search" className="cursor-pointer">
          <Search />
        </div>  
      </SheetTrigger>

      <SheetContent side="top" className="h-full">
        <SheetHeader className="bg-background/90">
        <VisuallyHidden>
            <SheetTitle>Search Panel</SheetTitle>
          </VisuallyHidden>
          <SheetDescription className="flex items-center border-b ">
            <Search className="text-tertiary" />
             <Input
              className="flex-1 border-0 focus-visible:ring-0 shadow-none bg-transparent text-base md:text-2xl placeholder:text-gray-400"
              autoFocus
              placeholder="Search..."
            />

            {/* use SheetClose asChild so it closes the sheet automatically */}
            <SheetClose asChild>
              <button
                aria-label="Close search"
                className="cursor-pointer p-2 rounded-md hover:bg-muted/50 transition"
              >
                <X className="w-6 h-6 md:w-7 md:h-7 text-tertiary" />
              </button>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
