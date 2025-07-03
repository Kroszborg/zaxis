"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Home, Library, Search, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Browse", href: "/browse", icon: Library },
  { name: "Viewer", href: "/viewer", icon: Box },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src={theme === "dark" ? "/dlogo.png" : "/llogo.png"}
                alt="ZAxis Logo"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "hover:bg-muted/80 hover:text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="md:hidden">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>

            <div className="bg-muted/50 rounded-lg p-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
