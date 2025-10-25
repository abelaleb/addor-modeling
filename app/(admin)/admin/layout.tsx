import { redirect } from "next/navigation";
import React from "react";
import ClientAdminLayout from "./client-admin-layout";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "admin") {
    redirect("/unauthorized");
  }

  return <ClientAdminLayout user={user}>{children}</ClientAdminLayout>;
}
