import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleComponents } from "@/lib/components-data";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Sparkles,
  ArrowUp,
  ExternalLink,
  Code,
  Palette,
  Download,
  Star,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/20 border-t border-border/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">ZAxis</h3>
                <p className="text-sm text-muted-foreground">3D Components</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Build amazing 3D experiences with our production-ready components.
              Visualize, customize, and export Three.js code instantly.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/10"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/10"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/10"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:hello@zaxis.com">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/10"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Product</h4>
            <div className="space-y-3">
              <Link
                href="/browse"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Components
              </Link>
              <Link
                href="/viewer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Live Demo
              </Link>
              <Link
                href="/docs"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/examples"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Examples
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Resources</h4>
            <div className="space-y-3">
              <Link
                href="https://docs.pmnd.rs/react-three-fiber"
                target="_blank"
                className="block text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                React Three Fiber
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
              <Link
                href="https://threejs.org"
                target="_blank"
                className="block text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                Three.js Docs
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
              <Link
                href="/tutorials"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Tutorials
              </Link>
              <Link
                href="/blog"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Company</h4>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 ZAxis Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>
                by{" "}
                <a
                  href="https://kroszborg.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Kroszborg
                </a>
                </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="bg-primary/5 border-primary/20 text-primary"
              >
                v1.0.0
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="hover:bg-primary/10"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
