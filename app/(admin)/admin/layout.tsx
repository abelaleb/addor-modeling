import { redirect } from "next/navigation";
import React from "react";
import ClientAdminLayout from "./client-admin-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole: string = "admin";

  if (userRole !== "admin") {
    redirect("/login");
  }

  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
