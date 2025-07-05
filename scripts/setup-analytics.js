#!/usr/bin/env node

/**
 * Analytics Setup Script for ZAxis
 *
 * This script helps you set up Google Analytics and Search Console
 * for your ZAxis project.
 */

const fs = require("fs");
const path = require("path");

console.log("📊 ZAxis Analytics Setup Guide\n");

console.log("🎯 Step 1: Google Analytics 4 Setup");
console.log("1. Go to: https://analytics.google.com/");
console.log('2. Click "Start measuring"');
console.log('3. Create account: "ZAxis"');
console.log('4. Create property: "ZAxis Website"');
console.log('5. Choose "Web" platform');
console.log("6. Enter website details:");
console.log('   - Website name: "ZAxis"');
console.log("   - Website URL: https://zaxis.kroszborg.co");
console.log('   - Industry: "Technology"');
console.log('   - Business size: "Small business"');
console.log("7. Get your Measurement ID (G-XXXXXXXXXX)\n");

console.log("🎯 Step 2: Google Search Console Setup");
console.log("1. Go to: https://search.google.com/search-console");
console.log('2. Click "Add property"');
console.log("3. Enter: https://zaxis.kroszborg.co");
console.log('4. Choose "HTML tag" verification method');
console.log("5. Copy the verification code\n");

console.log("🎯 Step 3: Environment Variables");
console.log("Create .env.local file with:");
console.log("");
console.log("NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX");
console.log("NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code");
console.log("");

// Check if .env.local exists
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  console.log("✅ .env.local file already exists");
  const envContent = fs.readFileSync(envPath, "utf8");
  if (envContent.includes("NEXT_PUBLIC_GA_MEASUREMENT_ID")) {
    console.log("✅ Google Analytics ID is configured");
  } else {
    console.log("❌ Google Analytics ID not found in .env.local");
  }
  if (envContent.includes("NEXT_PUBLIC_GOOGLE_VERIFICATION")) {
    console.log("✅ Google Search Console verification is configured");
  } else {
    console.log(
      "❌ Google Search Console verification not found in .env.local"
    );
  }
} else {
  console.log("❌ .env.local file not found");
  console.log("Create it with the variables above\n");
}

console.log("🎯 Step 4: Performance Monitoring");
console.log("After deployment, test these URLs:");
console.log("");
console.log("📊 Performance Tests:");
console.log("- https://pagespeed.web.dev/ (enter your URL)");
console.log("- https://gtmetrix.com/ (enter your URL)");
console.log(
  "- https://search.google.com/test/mobile-friendly (enter your URL)"
);
console.log("");
console.log("🔍 SEO Tests:");
console.log("- https://zaxis.kroszborg.co/sitemap.xml");
console.log("- https://zaxis.kroszborg.co/robots.txt");
console.log("- https://validator.schema.org/ (test structured data)");
console.log("");

console.log("🎯 Step 5: Weekly Monitoring Schedule");
console.log("Monday: Performance Check");
console.log("Tuesday: SEO Check");
console.log("Wednesday: Analytics Review");
console.log("Thursday: Content Check");
console.log("Friday: Technical Check");
console.log("");

console.log("📈 Key Metrics to Track:");
console.log("- Organic traffic growth");
console.log("- Page load speed");
console.log("- Core Web Vitals");
console.log("- Keyword rankings");
console.log("- Bounce rate");
console.log("- Mobile usability");
console.log("");

console.log("🚀 Your ZAxis site will be fully monitored!");
console.log("Check ANALYTICS_SETUP_GUIDE.md for detailed instructions.");
