"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { APP_NAME } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/Toast";

const registerSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const { register: registerUser, isLoading } = useAuth();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      await registerUser({
        businessName: data.businessName,
        email: data.email,
        password: data.password,
        phone: data.phone || undefined,
      });
      addToast({
        type: "success",
        title: "Account created!",
        message: "Welcome to PayMatch. You are now logged in.",
      });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      addToast({
        type: "error",
        title: "Registration failed",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-12 px-4">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/images/logo.png"
                    alt={APP_NAME}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-2xl text-teal-700">{APP_NAME}</span>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Create your account
              </h1>
              <p className="text-slate-600">
                Get started with PayMatch for free
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700">{error}</p>
                </div>
              )}

              <Input
                label="Business name"
                type="text"
                placeholder="Acme Business Ltd"
                error={errors.businessName?.message}
                disabled={isLoading}
                {...register("businessName")}
              />

              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                disabled={isLoading}
                {...register("email")}
              />

              <Input
                label="Phone (optional)"
                type="tel"
                placeholder="+2348012345678"
                error={errors.phone?.message}
                disabled={isLoading}
                {...register("phone")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                disabled={isLoading}
                {...register("password")}
              />

              <Input
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                disabled={isLoading}
                {...register("confirmPassword")}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-teal-700 hover:text-teal-600 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}