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
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine which logo to show
  const getLogoSrc = () => {
    if (!mounted) {
      // Show a neutral logo during SSR/hydration
      return "/Llogo.png";
    }

    // Use resolvedTheme for more reliable theme detection
    const currentTheme = resolvedTheme || theme;
    return currentTheme === "dark" ? "/dlogo.png" : "/Llogo.png";
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/20 border-t border-border/50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src={getLogoSrc()}
                  alt="ZAxis Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              Build amazing 3D experiences with our production-ready components.
              Visualize, customize, and export Three.js code instantly.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="https://github.com/Kroszborg" target="_blank">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-primary/10"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="https://x.com/kroszborgg" target="_blank">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-primary/10"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="mailto:abhimanpanwar6@gmail.com">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-primary/10"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            className="space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
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
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            className="space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold">Resources</h4>
            <div className="space-y-3">
              <Link
                href="https://docs.pmnd.rs/react-three-fiber"
                target="_blank"
                className="block text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start"
              >
                React Three Fiber
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
              <Link
                href="https://threejs.org"
                target="_blank"
                className="block text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start"
              >
                Three.js Docs
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            className="space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
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
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground justify-center md:justify-start">
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
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="hover:bg-primary/10"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
