"use client";

import React from "react";

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}
