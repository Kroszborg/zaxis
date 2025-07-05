"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your privacy is important to us. This summary explains how ZAxis
            collects, uses, and protects your information. (This is a preview,
            not legal advice.)
          </p>
          <div className="bg-card/80 rounded-xl p-8 border border-border/30 shadow-lg max-w-lg mx-auto text-left space-y-4">
            <h2 className="text-xl font-semibold mb-2">What We Collect</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Basic account and contact information</li>
              <li>Usage data (pages visited, features used)</li>
              <li>Technical data (browser, device, IP address)</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-4">How We Use Data</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>To provide and improve our services</li>
              <li>To communicate with you about updates and support</li>
              <li>To analyze usage and enhance user experience</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-4">Your Rights</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>You can request access to or deletion of your data</li>
              <li>You can opt out of marketing communications</li>
              <li>We do not sell your personal data</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              For full details, please contact us or review our complete privacy
              policy (coming soon).
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
