"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
          <SheetDescription className="flex items-center border-b ">
            <Search className="text-tertiary" />
            <Input
              className="border-0 focus-visible:ring-0 shadow-none text-[12rem] p-2"
              autoFocus
              placeholder="Search..."
            />

            {/* use SheetClose asChild so it closes the sheet automatically */}
            <SheetClose asChild>
              <div
                className="cursor-pointer border-2 border-black"
                aria-label="Close search"
              >
                <X className="hover:text-tertiary" />
              </div>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
