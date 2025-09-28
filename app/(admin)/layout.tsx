"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="flex">
        <Sidebar />
        <div className="flex-grow p-4">{children}</div>
      </main>
    </div>
  );
}
