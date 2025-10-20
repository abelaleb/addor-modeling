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

  // Check admin role
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleData?.role !== "admin") {
    redirect("/unauthorized");
  }

  return <ClientAdminLayout user={user}>{children}</ClientAdminLayout>;
}
