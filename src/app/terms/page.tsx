"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Please read these terms of service carefully before using ZAxis.
            (This is a summary, not legal advice.)
          </p>
          <div className="bg-card/80 rounded-xl p-8 border border-border/30 shadow-lg max-w-lg mx-auto text-left space-y-4">
            <h2 className="text-xl font-semibold mb-2">
              User Responsibilities
            </h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Use ZAxis for lawful purposes only</li>
              <li>Respect intellectual property and copyright</li>
              <li>Do not misuse or attempt to disrupt the service</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-4">Acceptable Use</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>No spamming, hacking, or abusive behavior</li>
              <li>No reverse engineering or unauthorized access</li>
              <li>Follow all applicable laws and regulations</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2 mt-4">
              Limitation of Liability
            </h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>ZAxis is provided "as is" without warranties</li>
              <li>
                We are not liable for damages from use or inability to use the
                service
              </li>
              <li>We may update these terms at any time</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              For full details, please contact us or review our complete terms
              of service (coming soon).
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
