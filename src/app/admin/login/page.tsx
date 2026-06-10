"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10 flex flex-col items-center">
          <Image
            src="/logo-with-text.png"
            alt="Macstone Space"
            width={180}
            height={45}
            className="h-10 w-auto object-contain mb-3 brightness-110"
          />
          <p className="text-white/50 text-sm">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-accent focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-charcoal text-white text-sm font-medium uppercase tracking-wide hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
