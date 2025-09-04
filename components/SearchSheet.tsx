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

const SearchSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen}>
      <SheetTrigger>
        <Search
          onClick={() => {
            setSheetOpen(true);
          }}
        />
      </SheetTrigger>
      <SheetContent side="top" className="h-full">
        <SheetHeader>
          {/* <SheetClose /> */}

          {/* <SheetTitle>xcfg</SheetTitle> */}
          <SheetDescription className="flex items-center border-b pb-2">
            <Search />
            <Input className="border-0 focus-visible:ring-0 shadow-none" />
            <div
              className=" cursor-pointer"
              onClick={() => {
                setSheetOpen(false);
              }}
            >
              <X />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
