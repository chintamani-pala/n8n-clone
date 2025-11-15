"use client";
import { BookOpen, CreditCard, Github, Menu, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import AuthModel from "../auth/auth.model";

const navItems = [
  { name: "Features", href: "#features", icons: Zap },
  { name: "Templates", href: "#templates", icons: BookOpen },
  { name: "Pricing", href: "#pricing", icons: CreditCard },
  { name: "Community", href: "#community", icons: Users },
  { name: "GitHub", href: "#github", icons: Github },
];

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-2 animate-fade-in">
              <Image
                src={require("@/assets/logo.png")}
                alt=""
                width={200}
                height={190}
              />
            </div>
          </Link>

          {/*Desktop Navigation*/}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.name}
                className="flex items-center text-sm gap-2 font-medium text-muted-foreground hover:text-primary transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icons className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          {/*Desktop auth buttons*/}
          <div className="hidden md:flex item-center gap-3 animate-fade-in">
            <Button variant="ghost" size="sm" className="hover:text-white!">
              Sign In
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() => setIsAuthOpen(true)}
            >
              Get Started Free
            </Button>
          </div>
          {/*Mobile menu*/}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-background/95 backdrop-blur-xl border-primary/20"
            >
              <div className="flex items-center justify-between px-2 flex-col">
                <Link href={"/"}>
                  <div className="flex items-center gap-2 animate-fade-in">
                    <Image
                      src={require("@/assets/logo.png")}
                      alt=""
                      width={200}
                      height={190}
                    />
                  </div>
                </Link>
                {/*Desktop Navigation*/}
                <nav className="space-y-4 mb-8">
                  {navItems.map((item, index) => (
                    <Link
                      href={item.href}
                      key={item.name}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-sm gap-3 font-medium text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary/50 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icons className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="space-y-3 px-2">
                  <div className="w-full mx-auto flex flex-col gap-y-4 justify-start">
                    <Button
                      variant={"ghost"}
                      size={"lg"}
                      className="w-full justify-start"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant={"hero"}
                      size={"lg"}
                      className="w-full justify-start"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Sign Started Free
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          {/*Auth Model*/}
          <AuthModel isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
