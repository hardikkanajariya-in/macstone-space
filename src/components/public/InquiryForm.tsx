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
    "w-full px-4 py-3 bg-transparent border border-border text-sm placeholder:text-muted-light focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {propertyTitle && (
        <p className="text-sm text-muted mb-2">
          Inquiring about: <span className="text-foreground font-medium">{propertyTitle}</span>
        </p>
      )}

      <div className={variant === "compact" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name *"
            className={inputClass}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("phone", { required: "Phone is required" })}
            placeholder="Phone Number *"
            type="tel"
            className={inputClass}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
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
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
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
        className="btn-primary w-full md:w-auto disabled:opacity-50"
      >
        {status === "loading"
          ? "Sending..."
          : variant === "consultation"
            ? "Schedule Consultation"
            : "Submit Inquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>
      )}
    </form>
  );
}
