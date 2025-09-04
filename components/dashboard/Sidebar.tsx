"use client";
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  CreditCardIcon,
  Folders,
  LayoutDashboard,
  Newspaper,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-400 h-full">
      <Command className="bg-secondary rounded-none h-full">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <Link href="/dashboard">Dashboard</Link>
            </CommandItem>
            <CommandItem>
              <Newspaper className="mr-2 h-4 w-4" />
              <Link href="/dashboard/posts">posts</Link>
            </CommandItem>
            <CommandItem>
              {" "}
              <Folders className="mr-2 h-4 w-4" />
              <Link href="#">Folders</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>
                ⌘ <span className="font-bold">P</span>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCardIcon className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>
                ⌘ <span className="font-bold">B</span>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>
                ⌘ <span className="font-bold">S</span>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default Sidebar;
