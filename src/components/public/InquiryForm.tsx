"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface InquiryFormProps {
  type?: string;
  propertyId?: string;
  propertyTitle?: string;
  variant?: "default" | "compact" | "consultation";
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function InquiryForm({
  type = "general",
  propertyId,
  propertyTitle,
  variant = "default",
  className = "",
}: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type, propertyId }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="font-display text-2xl mb-3">Thank You</p>
        <p className="text-muted text-sm">
          We&apos;ve received your inquiry and will respond within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3.5 bg-surface/40 border border-border/80 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:bg-surface/80 rounded-lg transition-all duration-350 outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5 ${className}`}>
      {propertyTitle && (
        <p className="text-sm text-muted mb-3">
          Inquiring about: <span className="text-accent font-medium">{propertyTitle}</span>
        </p>
      )}

      <div className={variant === "compact" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name *"
            className={inputClass}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("phone", { required: "Phone is required" })}
            placeholder="Phone Number *"
            type="tel"
            className={inputClass}
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          placeholder="Email Address *"
          type="email"
          className={inputClass}
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>

      {variant !== "compact" && (
        <div>
          <textarea
            {...register("message")}
            placeholder={
              variant === "consultation"
                ? "Tell us about your requirements, budget, and timeline..."
                : "Your message (optional)"
            }
            rows={variant === "consultation" ? 5 : 3}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-accent w-full md:w-auto font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading"
          ? "Sending..."
          : variant === "consultation"
            ? "Schedule Consultation"
            : "Submit Inquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 mt-2">Something went wrong. Please try again or call us directly.</p>
      )}
    </form>
  );
}
