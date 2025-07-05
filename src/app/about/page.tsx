"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function AboutPage() {
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
            About ZAxis
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            <strong>ZAxis</strong> is a next-generation platform for 3D web
            components. Our mission is to empower developers and designers to
            build stunning, interactive 3D experiences with ease. We believe 3D
            should be accessible, performant, and beautiful for everyone.
          </p>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a web where 3D is as easy to use as 2D. ZAxis provides
              production-ready, customizable 3D components that integrate
              seamlessly into any project, from startups to enterprises.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              What Makes Us Unique?
            </h2>
            <ul className="text-muted-foreground list-disc list-inside space-y-2 text-left mx-auto max-w-md">
              <li>Beautiful, production-ready 3D components</li>
              <li>Instant code export for Three.js and React Three Fiber</li>
              <li>Real-time customization and live preview</li>
              <li>Modern, accessible UI and developer experience</li>
              <li>Open, community-driven roadmap</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <ul className="text-muted-foreground list-disc list-inside space-y-2 text-left mx-auto max-w-md">
              <li>
                <strong>Innovation:</strong> We push the boundaries of what's
                possible on the web.
              </li>
              <li>
                <strong>Accessibility:</strong> 3D for everyone, regardless of
                skill level.
              </li>
              <li>
                <strong>Quality:</strong> Every component is crafted for
                performance and beauty.
              </li>
              <li>
                <strong>Community:</strong> We listen, learn, and grow together.
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
