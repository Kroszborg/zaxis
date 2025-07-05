# ZAxis Analytics & Performance Monitoring Guide

## 📊 Analytics Setup

### 1. Google Analytics 4 (GA4) Setup

#### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create account: "ZAxis"
4. Create property: "ZAxis Website"
5. Choose "Web" as platform
6. Enter website details:
   - Website name: "ZAxis"
   - Website URL: `https://zaxis.kroszborg.co`
   - Industry: "Technology"
   - Business size: "Small business"

#### Step 2: Get Measurement ID
1. After setup, you'll get a Measurement ID like `G-XXXXXXXXXX`
2. Copy this ID - you'll need it for the next step

#### Step 3: Add to Your Project
1. Create `.env.local` file in your project root:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Update your `src/app/layout.tsx` to include Google Analytics:
```tsx
import Script from 'next/script'

// Add this inside your RootLayout component, before closing </head>
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
      `}
    </Script>
  </>
)}
```

### 2. Google Search Console Setup

#### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Enter: `https://zaxis.kroszborg.co`
4. Choose "HTML tag" verification method

#### Step 2: Verify Ownership
1. Copy the verification code (looks like: `<meta name="google-site-verification" content="...">`)
2. Add to your `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

3. Update your `src/app/layout.tsx`:
```tsx
// Add to the verification section
verification: {
  google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  // ... other verifications
},
```

#### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Add: `https://zaxis.kroszborg.co/sitemap.xml`
3. Submit and wait for indexing

### 3. Vercel Analytics (Already Configured)
- ✅ Already set up in your `layout.tsx`
- Provides real-time performance metrics
- No additional setup needed

## 📈 Performance Monitoring

### 1. Core Web Vitals Tracking

#### Google PageSpeed Insights
1. Visit [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter: `https://zaxis.kroszborg.co`
3. Run test for both mobile and desktop
4. Monitor these metrics:
   - **LCP (Largest Contentful Paint)**: < 2.5s
   - **FID (First Input Delay)**: < 100ms
   - **CLS (Cumulative Layout Shift)**: < 0.1

#### GTmetrix
1. Visit [GTmetrix](https://gtmetrix.com/)
2. Enter your URL
3. Get detailed performance report
4. Monitor:
   - Page load time
   - Page size
   - Request count
   - Performance grade (A-F)

### 2. SEO Performance Tracking

#### Google Search Console Reports
Monitor these reports weekly:

1. **Performance Report**
   - Clicks and impressions
   - Average position
   - Click-through rate (CTR)
   - Top queries

2. **Coverage Report**
   - Indexed pages
   - Crawl errors
   - Excluded pages

3. **Mobile Usability**
   - Mobile-friendly issues
   - Page speed issues

#### Google Analytics Reports
Set up these custom reports:

1. **Traffic Sources**
   - Organic search traffic
   - Direct traffic
   - Referral traffic

2. **Page Performance**
   - Most visited pages
   - Bounce rate
   - Time on page

3. **User Behavior**
   - User flow
   - Event tracking
   - Conversion goals

### 3. Real-time Monitoring Tools

#### Free Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema.org Validator](https://validator.schema.org/)

#### Paid Tools (Optional)
- [Ahrefs](https://ahrefs.com/) - Backlink analysis
- [SEMrush](https://semrush.com/) - Keyword research
- [Moz](https://moz.com/) - SEO metrics

## 🎯 Key Performance Indicators (KPIs)

### SEO KPIs to Track Monthly
1. **Organic Traffic**: Monthly organic visitors
2. **Keyword Rankings**: Position for target keywords
3. **Click-Through Rate (CTR)**: From search results
4. **Bounce Rate**: Page engagement
5. **Page Speed**: Core Web Vitals scores
6. **Mobile Usability**: Mobile-friendly score
7. **Index Coverage**: Pages indexed by Google

### Performance KPIs
1. **Page Load Time**: < 3 seconds
2. **Core Web Vitals**: All in green
3. **Mobile Score**: > 90
4. **Accessibility Score**: > 90
5. **Best Practices Score**: > 90

## 📊 Setting Up Custom Dashboards

### Google Analytics Dashboard
1. Go to Google Analytics
2. Create custom dashboard
3. Add these widgets:
   - Real-time users
   - Organic traffic
   - Page views
   - Bounce rate
   - Top pages
   - Traffic sources

### Google Search Console Dashboard
1. Set up email notifications for:
   - Manual actions
   - Mobile usability issues
   - Core Web Vitals issues
   - Coverage errors

## 🔍 Weekly Monitoring Checklist

### Monday: Performance Check
- [ ] Run PageSpeed Insights test
- [ ] Check Core Web Vitals in Search Console
- [ ] Review GTmetrix report
- [ ] Monitor server response times

### Tuesday: SEO Check
- [ ] Review Search Console performance
- [ ] Check for new indexed pages
- [ ] Monitor keyword rankings
- [ ] Review crawl errors

### Wednesday: Analytics Review
- [ ] Check Google Analytics traffic
- [ ] Review user behavior
- [ ] Analyze conversion rates
- [ ] Monitor bounce rates

### Thursday: Content Check
- [ ] Review page performance
- [ ] Check internal linking
- [ ] Update meta descriptions if needed
- [ ] Monitor social media shares

### Friday: Technical Check
- [ ] Verify sitemap is working
- [ ] Check robots.txt
- [ ] Test mobile responsiveness
- [ ] Review security headers

## 🚨 Alert Setup

### Google Search Console Alerts
Set up email notifications for:
- Manual actions
- Mobile usability issues
- Core Web Vitals issues
- Coverage errors

### Google Analytics Alerts
Set up custom alerts for:
- Traffic drops > 20%
- Bounce rate increases > 10%
- Page load time increases > 2s

## 📈 Monthly SEO Report Template

### Executive Summary
- Total organic traffic
- Top performing keywords
- Key improvements made
- Areas for improvement

### Performance Metrics
- Page speed scores
- Core Web Vitals status
- Mobile usability score
- Accessibility score

### SEO Metrics
- Indexed pages count
- Crawl errors
- Manual actions
- Rich snippets performance

### Recommendations
- Technical improvements
- Content opportunities
- Link building opportunities
- Performance optimizations

## 🎯 Quick Start Commands

### Test Your Site Performance
```bash
# Build your project
npm run build

# Start production server
npm start

# Test locally
curl -I http://localhost:3000
```

### Check SEO Files
```bash
# Test sitemap
curl https://zaxis.kroszborg.co/sitemap.xml

# Test robots.txt
curl https://zaxis.kroszborg.co/robots.txt

# Test manifest
curl https://zaxis.kroszborg.co/site.webmanifest
```

## 🔗 Useful Resources

- [Google Analytics Help](https://support.google.com/analytics/)
- [Google Search Console Help](https://support.google.com/webmasters/)
- [PageSpeed Insights Guide](https://developers.google.com/speed/docs/insights/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Next Steps:**
1. Set up Google Analytics 4
2. Configure Google Search Console
3. Set up weekly monitoring schedule
4. Create custom dashboards
5. Set up performance alerts

Your ZAxis site will be fully monitored and optimized for success! 🚀 