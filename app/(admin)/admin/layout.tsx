import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/Header";
// import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = "admin";

  if (userRole !== "admin") {
    redirect("/login");
  }

  return (
    <div>
      {/* <Sidebar /> */}
      <Navbar />
      <main className="flex">
        <div className="hidden md:block h-[100vh]">
          <Sidebar />
        </div>
        <div className="flex-grow p-4">{children}</div>
        {/* <Toaster /> */}
      </main>
    </div>
  );
}
