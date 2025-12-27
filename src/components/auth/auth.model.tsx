"use client";
import { z } from "zod";
import React, { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AuthModelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// validation schemas
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atlease 8 character"),
});

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const featureMaps = [
  "Free forever plan available",
  "No credit card required",
  "Setup in 2 minutes",
];
const AuthModel = ({ isOpen, onOpenChange }: AuthModelProps) => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const { signup, login, loading, error } = useAuth();
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setValidationErrors({});

    try {
      const validateData = signupSchema.parse(form);
      const name = `${validateData.firstName} ${validateData.lastName}`;
      const ok = await signup(name, validateData.email, validateData.password);
      if (ok) {
        toast.success("Check your email for activating your account")
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.issues.forEach(issue => {
          errors[issue.path[0] as string] = issue.message
        })
        setValidationErrors(errors)
      }
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setValidationErrors({});
    try {
      const validateData = loginSchema.parse(form);
      const ok = await login(validateData.email, validateData.password);
      if (ok) {
        onOpenChange(false);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.issues.forEach(issue => {
          errors[issue.path[0] as string] = issue.message
        })
        setValidationErrors(errors)
      }
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-background/95 backdrop-blur-xl border-primary/20 p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/*Left side branding and features*/}
          <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-hero relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Link href={"/"}>
                  <div className="flex items-center gap-2 animate-fade-in">
                    <Image
                      src={require("@/assets/logo.png")}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </div>
                </Link>
              </div>
              <div className="space-y-4 -mt-[70px]">
                <h2 className="text-3xl font-bold leading-tight">
                  Automate Everything.
                  <br />
                  <span className="text-primary">Smarter.</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of developers building the future of workflow
                  automation with AI superpowers.
                </p>
              </div>
              <div className="space-y-3">
                {featureMaps.map((text, i) => (
                  <div
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    key={i}
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/*subtle background elements*/}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-glow-pulse opacity-30"></div>
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-neon-blue rounded-full animate-float opacity-20"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-node-glow opacity-25"></div>
          </div>
          {/*Right side auth forms*/}
          <div className="flex flex-col justify-center p-8">
            <div className="w-full max-w-md mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Welcome to FlowX</h3>
                <p className="text-muted-foreground">
                  {activeTab === "signIn"
                    ? "Sign in to your account to continue"
                    : "Create your account to get started"}
                </p>
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                  <TabsTrigger
                    value="signIn"
                    className="data-[state=active]:bg-primary rounded-md data-[state=active]:text-primary-foreground"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-primary rounded-md data-[state=active]:text-primary-foreground"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signIn" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="signin-email"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="signin-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                          }}
                          placeholder="Enter your email address"
                          className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                        {validationErrors.email && (
                          <p className="text-sm text-red-500">
                            {validationErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="signin-password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <Input
                          id="signin-password"
                          type="password"
                          value={form.password}
                          onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                          }}
                          placeholder="Enter your password"
                          className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                        {validationErrors.password && (
                          <p className="text-sm text-red-500">
                            {validationErrors.password}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-primary/20"
                          />
                          <span className="text-muted-foreground">
                            Remember me
                          </span>
                        </label>
                        <button className="text-primary hover:underline">
                          Forgot password?
                        </button>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary"
                        variant={"hero"}
                        disabled={loading}
                      >
                        Sign In
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      className="text-primary hover:underline font-medium"
                      onClick={() => setActiveTab("register")}
                    >
                      Sign up for free
                    </button>
                  </div>
                </TabsContent>
                <TabsContent value="register" className="space-y-4 mt-6">
                  <form onSubmit={handleRegister}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label
                            className="text-sm font-medium"
                            htmlFor="register-fristName"
                          >
                            First Name
                          </Label>
                          <Input
                            id="register-firstName"
                            type="text"
                            value={form.firstName}
                            onChange={(e) =>
                              setForm({ ...form, firstName: e.target.value })
                            }
                            placeholder="John deo"
                            className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                          />
                          {validationErrors.firstName && (
                            <p className="text-sm text-red-500">
                              {validationErrors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label
                            className="text-sm font-medium"
                            htmlFor="register-fristName"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="register-firstName"
                            type="text"
                            value={form.lastName}
                            onChange={(e) =>
                              setForm({ ...form, lastName: e.target.value })
                            }
                            placeholder="John deo"
                            className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                          />
                          {validationErrors.lastName && (
                            <p className="text-sm text-red-500">
                              {validationErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-email"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="register-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                          }}
                          placeholder="Enter your email address"
                          className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                        {validationErrors.email && (
                          <p className="text-sm text-red-500">
                            {validationErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={form.password}
                          onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                          }}
                          placeholder="Enter your password"
                          className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                        <div className="text-sx text-muted-foreground">
                          Must be at least 8 characters with numbers and symbols
                        </div>
                        {validationErrors.password && (
                          <p className="text-sm text-red-500">
                            {validationErrors.password}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-confirmPassword"
                          className="text-sm font-medium"
                        >
                          Confirm Password
                        </Label>
                        <Input
                          id="register-confirmPassword"
                          type="password"
                          value={form.confirmPassword}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              confirmPassword: e.target.value,
                            });
                          }}
                          placeholder="Confirm your password"
                          className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                        {validationErrors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {validationErrors.confirmPassword}
                          </p>
                        )}
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-primary/20"
                        />
                        <span className="text-muted-foreground">
                          I agree to the{" "}
                          <button className="text-primary hover:underline">
                            Terms and Services
                          </button>{" "}
                          and{" "}
                          <button className="text-primary hover:underline">
                            Privacy Policy
                          </button>
                        </span>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary"
                        variant={"hero"}
                        disabled={loading}
                      >
                        Create Account
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                  </form>
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      className="text-primary hover:underline font-medium"
                      onClick={() => setActiveTab("signIn")}
                    >
                      Sign In
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModel;
