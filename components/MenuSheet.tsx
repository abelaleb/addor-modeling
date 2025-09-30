import { menus } from "../utils/constants/menus";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
const MenuSheet = () => {
  const [open,setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side="bottom" className="h-full">
        <SheetClose />
        <SheetHeader className="h-full">
          {/* <SheetTitle>huh</SheetTitle> */}
          <SheetDescription className="h-full">
            <div className="h-full flex justify-center text-lg items-center flex-col gap-y-5">
              {menus.map((menu: MenuProps, index: number) => {
                return (
                  <div key={index}>
                    <Link href={menu.path} onClick={()=> setOpen(false)}>{menu.name.toUpperCase()}</Link>
                  </div>
                );
              })}
            </div>
          </SheetDescription>
          {/* <SheetClose /> */}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
