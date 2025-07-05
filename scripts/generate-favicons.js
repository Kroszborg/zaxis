#!/usr/bin/env node

/**
 * Favicon Generation Script for ZAxis
 *
 * This script helps you generate favicon files from your existing logo.
 * You'll need to manually create these files using an image editor or online tool.
 *
 * Required favicon files:
 * - favicon.ico (32x32)
 * - favicon-16x16.png
 * - favicon-32x32.png
 * - apple-touch-icon.png (180x180)
 * - android-chrome-192x192.png
 * - android-chrome-512x512.png
 * - mstile-150x150.png
 */

const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const requiredFavicons = [
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "mstile-150x150.png",
];

const requiredOGImages = ["og-image.jpg", "og-image.png"];

console.log("🎨 ZAxis Favicon & OG Image Generation Guide\n");

console.log("📁 Checking public directory...");
if (!fs.existsSync(publicDir)) {
  console.log("❌ Public directory not found. Creating...");
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log("\n✅ Required Favicon Files:");
requiredFavicons.forEach((favicon) => {
  const filePath = path.join(publicDir, favicon);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? "✅" : "❌"} ${favicon}`);
});

console.log("\n✅ Required Open Graph Images:");
requiredOGImages.forEach((image) => {
  const filePath = path.join(publicDir, image);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? "✅" : "❌"} ${image}`);
});

console.log("\n🔧 Generation Instructions:");
console.log("1. Use your existing logo (Llogo.png or dlogo.png) as the source");
console.log("2. Create favicon files using one of these methods:");
console.log("   - Online tools: realfavicongenerator.net, favicon.io");
console.log("   - Image editors: Photoshop, GIMP, Figma");
console.log("   - Command line: ImageMagick, Sharp");
console.log(
  "\n3. Create Open Graph images (1200x630px) for social media sharing"
);
console.log("4. Place all files in the public/ directory");

console.log("\n📋 File Specifications:");
console.log("• favicon.ico: 32x32, ICO format");
console.log("• favicon-16x16.png: 16x16, PNG format");
console.log("• favicon-32x32.png: 32x32, PNG format");
console.log("• apple-touch-icon.png: 180x180, PNG format");
console.log("• android-chrome-192x192.png: 192x192, PNG format");
console.log("• android-chrome-512x512.png: 512x512, PNG format");
console.log("• mstile-150x150.png: 150x150, PNG format");
console.log("• og-image.jpg: 1200x630, JPEG format");
console.log("• og-image.png: 1200x630, PNG format");

console.log("\n🎯 Quick Online Tools:");
console.log(
  "• https://realfavicongenerator.net/ - Complete favicon generation"
);
console.log("• https://favicon.io/ - Simple favicon creation");
console.log("• https://www.canva.com/ - Create OG images");
console.log("• https://www.figma.com/ - Design OG images");

console.log("\n✅ Once you have all files, your SEO setup will be complete!");
