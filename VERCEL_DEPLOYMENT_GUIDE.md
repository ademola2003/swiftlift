# Vercel Deployment Guide - SwiftLift Moving

## ✅ **Pre-Deployment Checklist Complete**

All code has been:
- ✅ Committed to Git
- ✅ Pushed to GitHub (ademola2003/swiftlift)
- ✅ Built successfully
- ✅ Analytics installed and configured
- ✅ Ready for deployment

---

## 🚀 **Deploy to Vercel (2 Minutes)**

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: [https://vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select `ademola2003/swiftlift` from your repositories
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected) ✓
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
cd C:\Users\ea198\swiftlift
vercel

# Follow prompts:
# - Link to existing project? No (first time) or Yes (subsequent)
# - Project name: swiftlift
# - Deploy? Yes
```

---

## 🌐 **Your Live URLs**

After deployment, you'll get:

**Production URL**:
```
https://swiftlift.vercel.app
OR
https://swiftlift-[hash].vercel.app
```

**Custom Domain** (if you have one):
```
https://swiftliftmoving.com
```

**All Tool Pages Live**:
- https://swiftlift.vercel.app/
- https://swiftlift.vercel.app/tools/moving-cost-calculator
- https://swiftlift.vercel.app/tools/moving-truck-size
- https://swiftlift.vercel.app/tools/apartment-estimator
- https://swiftlift.vercel.app/tools/timeline-planner

---

## 📊 **Analytics & Monitoring**

### Vercel Analytics
After deployment, view analytics at:
```
https://vercel.com/[your-username]/swiftlift/analytics
```

**What You'll See**:
- 📈 Page views per route
- 👥 Unique visitors
- 🌍 Geographic data
- 📱 Device types (mobile/desktop)
- 🔗 Top pages
- 📊 Traffic sources

**Top Pages to Monitor**:
1. `/` - Homepage
2. `/tools/moving-cost-calculator`
3. `/tools/moving-truck-size`
4. `/tools/apartment-estimator`
5. `/tools/timeline-planner`

### Speed Insights
View performance data at:
```
https://vercel.com/[your-username]/swiftlift/speed-insights
```

**Metrics Tracked**:
- ⚡ First Contentful Paint (FCP)
- 🎯 Largest Contentful Paint (LCP)
- 📏 Cumulative Layout Shift (CLS)
- ⏱️ First Input Delay (FID)
- 🚀 Time to First Byte (TTFB)

**Expected Scores**:
- Performance: 90-100
- Accessibility: 95-100
- Best Practices: 90-100
- SEO: 95-100

---

## ⚙️ **Post-Deployment Configuration**

### 1. Set Up Custom Domain (Optional)

**In Vercel Dashboard**:
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter: `swiftliftmoving.com`
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic, ~5 mins)

**DNS Records to Add** (at your domain registrar):
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2. Environment Variables (If Needed)

If you need to add secrets:
1. Go to Project Settings → Environment Variables
2. Add variables:
   - `FORMSPREE_API_KEY` (if using)
   - `GOOGLE_ANALYTICS_ID` (if adding GA)
   - Any other API keys

### 3. Configure Formspree

**Update Form IDs in Your Code**:

Sign up at [Formspree.io](https://formspree.io), create forms, then update:

1. `src/components/Calculator.tsx`
   - Line ~190: Replace `YOUR_FORM_ID`

2. `src/components/TruckCalculator.tsx`
   - Line ~152: Replace `YOUR_FORM_ID`

3. `src/components/ApartmentEstimator.tsx`
   - Find form action, replace `YOUR_FORM_ID`

4. `src/components/TimelinePlanner.tsx`
   - Find form action, replace `YOUR_FORM_ID`

After updating:
```bash
git add .
git commit -m "Update Formspree form IDs"
git push
```

Vercel auto-redeploys! ✓

---

## 📱 **Test Your Live Site**

### Homepage
1. Visit your Vercel URL
2. Scroll to "Free Moving Tools" section
3. Click each tool card

### Tool Pages
1. Test all 4 calculators
2. Fill out forms
3. Test click-to-call buttons
4. Check mobile responsiveness

### Analytics
1. Visit your site
2. Navigate between pages
3. Wait ~5 minutes
4. Check Vercel Analytics dashboard

---

## 🔍 **SEO Setup**

### 1. Google Search Console
```
1. Go to: https://search.google.com/search-console
2. Add property: swiftlift.vercel.app (or your domain)
3. Verify ownership via DNS or HTML tag
4. Submit sitemap: https://swiftlift.vercel.app/sitemap.xml
```

### 2. Google My Business
Link your tools in GMB posts:
```
"Plan your move with our free tools:"
- Moving Cost Calculator
- Truck Size Guide
- Apartment Estimator
- Timeline Planner

[Link to your Vercel site]
```

### 3. Create Sitemap (Optional)

Add to `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://swiftlift.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://swiftlift.vercel.app/tools/moving-cost-calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://swiftlift.vercel.app/tools/moving-truck-size</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://swiftlift.vercel.app/tools/apartment-estimator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://swiftlift.vercel.app/tools/timeline-planner</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 🎯 **Marketing Checklist**

After deployment:

### Immediate Actions:
- [ ] Test all pages and forms
- [ ] Update Formspree form IDs
- [ ] Add Google Search Console
- [ ] Share on social media
- [ ] Update email signature with URL

### Week 1:
- [ ] Monitor analytics daily
- [ ] Check form submissions
- [ ] Create Google Ads campaigns
- [ ] Add to GMB posts
- [ ] Update business cards

### Week 2-4:
- [ ] A/B test tool layouts
- [ ] Monitor top-performing tools
- [ ] Optimize based on analytics
- [ ] Create blog posts linking to tools
- [ ] Email newsletter about free tools

---

## 🔧 **Continuous Deployment**

**Automatic Deployments**:
Every time you push to `main` branch:
1. Vercel detects the push
2. Automatically builds
3. Automatically deploys
4. Live in ~2 minutes

**Manual Deployment**:
```bash
cd C:\Users\ea198\swiftlift
vercel --prod
```

---

## 📊 **Success Metrics to Track**

### Analytics (Vercel Dashboard):
- Daily unique visitors
- Page views per tool
- Bounce rate
- Average session duration
- Top traffic sources

### Business Metrics:
- Form submissions per day
- Phone calls (track separately)
- Conversion rate (visitors → leads)
- Cost per lead (if running ads)
- Lead quality

### SEO Metrics:
- Google Search Console impressions
- Click-through rate (CTR)
- Average position
- Keyword rankings

---

## 🎉 **You're Ready to Deploy!**

### Quick Deployment Steps:

1. **Go to Vercel**: https://vercel.com
2. **Import Project**: ademola2003/swiftlift
3. **Click Deploy**: Wait 2 minutes
4. **Test Site**: Visit your live URL
5. **Monitor**: Check analytics

### After Deployment:
- Update Formspree form IDs
- Test all tools
- Share your URL
- Start driving traffic!

---

## 📞 **Need Help?**

**Vercel Documentation**:
- https://vercel.com/docs

**Analytics Guide**:
- https://vercel.com/docs/analytics

**Custom Domains**:
- https://vercel.com/docs/custom-domains

---

**Your SwiftLift Moving website is ready to generate leads 24/7!** 🚀

Built with Next.js, deployed on Vercel, tracked with Analytics.
