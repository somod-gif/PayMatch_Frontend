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
import { Mail } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    
    // Placeholder - would call backend API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
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
                Reset your password
              </h1>
              <p className="text-slate-600">
                Enter your email to receive reset instructions
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-teal-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Check your email
                </h3>
                <p className="text-slate-600 text-sm">
                  We have sent password reset instructions to your email address.
                </p>
                <Link href="/auth/login" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Back to sign in
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  disabled={isLoading}
                  {...register("email")}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm text-teal-700 hover:text-teal-600 font-medium"
                  >
                    Remember your password? Sign in
                  </Link>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}