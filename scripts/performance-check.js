#!/usr/bin/env node

/**
 * Performance Monitoring Script for ZAxis
 *
 * This script helps you monitor your site's performance
 * and SEO health after deployment.
 */

const https = require("https");
const http = require("http");

const SITE_URL = "https://zaxis.kroszborg.co";

console.log("🚀 ZAxis Performance Monitoring\n");

// Function to check if a URL is accessible
function checkUrl(url, description) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;

    client
      .get(url, (res) => {
        const status = res.statusCode;
        const isSuccess = status >= 200 && status < 400;

        console.log(`${isSuccess ? "✅" : "❌"} ${description}`);
        console.log(`   URL: ${url}`);
        console.log(`   Status: ${status}`);

        if (isSuccess) {
          console.log(`   ✅ Working correctly\n`);
        } else {
          console.log(`   ❌ Needs attention\n`);
        }

        resolve({ url, status, isSuccess });
      })
      .on("error", (err) => {
        console.log(`❌ ${description}`);
        console.log(`   URL: ${url}`);
        console.log(`   Error: ${err.message}\n`);
        resolve({ url, status: 0, isSuccess: false });
      });
  });
}

async function runChecks() {
  console.log("🔍 Checking SEO Files...\n");

  await checkUrl(`${SITE_URL}/sitemap.xml`, "Sitemap");
  await checkUrl(`${SITE_URL}/robots.txt`, "Robots.txt");
  await checkUrl(`${SITE_URL}/site.webmanifest`, "Web App Manifest");
  await checkUrl(`${SITE_URL}/favicon.ico`, "Favicon");

  console.log("📊 Performance Testing Tools:");
  console.log("");
  console.log("🌐 Google PageSpeed Insights:");
  console.log(
    `   https://pagespeed.web.dev/?url=${encodeURIComponent(SITE_URL)}`
  );
  console.log("");
  console.log("⚡ GTmetrix:");
  console.log(
    `   https://gtmetrix.com/analyze.html?url=${encodeURIComponent(SITE_URL)}`
  );
  console.log("");
  console.log("📱 Mobile-Friendly Test:");
  console.log(
    `   https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(
      SITE_URL
    )}`
  );
  console.log("");
  console.log("🔍 SEO Validators:");
  console.log("   https://validator.schema.org/");
  console.log("   https://search.google.com/structured-data/testing-tool");
  console.log("");

  console.log("📈 Analytics Setup Status:");
  console.log("");
  console.log("Google Analytics 4:");
  console.log("   https://analytics.google.com/");
  console.log("");
  console.log("Google Search Console:");
  console.log("   https://search.google.com/search-console");
  console.log("");

  console.log("🎯 Weekly Monitoring Checklist:");
  console.log("");
  console.log("Monday: Performance Check");
  console.log("   - Run PageSpeed Insights");
  console.log("   - Check Core Web Vitals");
  console.log("   - Review GTmetrix report");
  console.log("");
  console.log("Tuesday: SEO Check");
  console.log("   - Review Search Console");
  console.log("   - Check keyword rankings");
  console.log("   - Monitor crawl errors");
  console.log("");
  console.log("Wednesday: Analytics Review");
  console.log("   - Check Google Analytics");
  console.log("   - Review user behavior");
  console.log("   - Analyze traffic sources");
  console.log("");
  console.log("Thursday: Content Check");
  console.log("   - Review page performance");
  console.log("   - Check internal linking");
  console.log("   - Update meta descriptions");
  console.log("");
  console.log("Friday: Technical Check");
  console.log("   - Verify sitemap");
  console.log("   - Test mobile responsiveness");
  console.log("   - Check security headers");
  console.log("");

  console.log("🚀 Your ZAxis site is ready for monitoring!");
  console.log("Check ANALYTICS_SETUP_GUIDE.md for detailed instructions.");
}

runChecks().catch(console.error);
