"use client";

import Script from "next/script";

interface StructuredDataProps {
  type: "website" | "organization" | "software" | "product";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  return (
    <StructuredData
      type="website"
      data={{
        name: "ZAxis",
        description:
          "Advanced 3D component library for modern web development. Create, customize, and export production-ready Three.js components with real-time visualization.",
        url: "https://zaxis.kroszborg.co",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://zaxis.kroszborg.co/browse?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="organization"
      data={{
        name: "ZAxis",
        url: "https://zaxis.kroszborg.co",
        logo: "https://zaxis.kroszborg.co/Llogo.png",
        sameAs: [
          "https://github.com/kroszborg",
          "https://twitter.com/kroszborg",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "contact@kroszborg.co",
        },
      }}
    />
  );
}

export function SoftwareStructuredData() {
  return (
    <StructuredData
      type="software"
      data={{
        name: "ZAxis 3D Component Library",
        description:
          "Production-ready 3D component library with real-time customization and code generation",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web Browser",
        softwareVersion: "1.0.0",
        author: {
          "@type": "Person",
          name: "kroszborg",
          url: "https://kroszborg.co",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Real-time 3D customization",
          "Instant code generation",
          "TypeScript support",
          "React Three Fiber integration",
          "Production-ready components",
        ],
      }}
    />
  );
}
