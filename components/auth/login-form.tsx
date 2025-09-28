"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../../app/(public)/login/action"; 

export default function LoginForm() {
  return (
    <form action={login} className="flex flex-col w-full max-w-sm space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
}