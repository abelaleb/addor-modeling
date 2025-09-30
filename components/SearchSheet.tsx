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

const SearchSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    // controlled: pass onOpenChange so the Sheet can toggle your state
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      {/* asChild lets a custom element act as the trigger */}
      <SheetTrigger asChild>
        <button aria-label="Open search">
          <Search />
        </button>
      </SheetTrigger>

      <SheetContent side="top" className="h-full">
        <SheetHeader>
          <SheetDescription className="flex items-center border-b pb-2">
            <Search className="text-yellow-700" />
            <Input
              className="border-0 focus-visible:ring-0 shadow-none"
              autoFocus
              placeholder="Search..."
            />

            {/* use SheetClose asChild so it closes the sheet automatically */}
            <SheetClose asChild>
              <button
                className="cursor-pointer"
                aria-label="Close search"
              >
                <X className="font-bold hover:text-yellow-700" />
              </button>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
