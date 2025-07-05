"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl w-full text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We'd love to hear from you! Whether you have a question, feedback,
            or need support, the ZAxis team is here to help.
          </p>
          <div className="bg-card/80 rounded-xl p-8 border border-border/30 shadow-lg max-w-lg mx-auto mb-6">
            <p className="text-muted-foreground mb-2">
              Email us at{" "}
              <a
                href="mailto:hello@zaxis.com"
                className="text-primary underline"
              >
                abhimanpanwar6@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground mb-2">
              We aim to respond within 1-2 business days.
            </p>
            <p className="text-muted-foreground">
              For urgent support, please mention "URGENT" in your subject line.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
