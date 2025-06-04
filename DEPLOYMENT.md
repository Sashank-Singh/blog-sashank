# 🚀 Deployment Guide for sashanksingh.com Blog

## Option 1: Vercel (Recommended)

### Step 1: Deploy to Vercel
```bash
# Login to Vercel (you're doing this now)
npx vercel login

# Deploy the project
npx vercel

# For production deployment
npx vercel --prod
```

### Step 2: Configure Environment Variables
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `NODE_ENV` = production

### Step 3: Custom Domain Setup

#### Option A: Subdomain (Recommended)
1. In Vercel dashboard: Settings > Domains
2. Add domain: `blog.sashanksingh.com`
3. Vercel will provide DNS instructions
4. In your InfinityFree/domain DNS settings:
   - Add CNAME record: `blog` → `cname.vercel-dns.com`

#### Option B: Full Domain Migration
1. Change nameservers to Vercel's
2. Import your entire domain to Vercel
3. Set up redirects from main site to blog

## Option 2: Railway

### Setup
```bash
npm install -g @railway/cli
railway login
railway new
railway link
railway variables set OPENAI_API_KEY=your_key_here
railway deploy
```

### Domain Setup
1. Railway dashboard > Settings > Domains
2. Add custom domain: `blog.sashanksingh.com`
3. Configure DNS as instructed

## Option 3: Render

### Setup
1. Connect GitHub repo to Render
2. Select "Web Service"
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add environment variable: `OPENAI_API_KEY`

### Domain Setup
1. Render dashboard > Settings > Custom Domains
2. Add `blog.sashanksingh.com`
3. Configure DNS

## Option 4: Netlify

### Setup
```bash
npm install -g netlify-cli
netlify login
netlify deploy
netlify deploy --prod
```

### Domain Setup
1. Netlify dashboard > Domain settings
2. Add custom domain
3. Configure DNS

## 🌐 DNS Configuration

### For Subdomain Approach (blog.sashanksingh.com)
**Add to your current DNS (InfinityFree or domain registrar):**

```
Type: CNAME
Name: blog
Value: cname.vercel-dns.com (or hosting provider's CNAME)
TTL: 300
```

### For Full Domain Migration
**Change nameservers at your registrar to:**
- Vercel: Use custom nameservers provided
- Railway: Use provided DNS settings
- Render: Use provided nameservers

## 🔧 Environment Variables Needed

```env
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
```

## 🎯 Recommended Setup

1. **Use Vercel** (best Next.js support)
2. **Set up blog.sashanksingh.com** (subdomain)
3. **Keep main site on InfinityFree**
4. **Add redirect** from main site to blog

## 📝 Post-Deployment Checklist

- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic)
- [ ] Test automation system (daily posts)
- [ ] Test trending topics API
- [ ] Verify content generation works

## 🚨 Important Notes

1. **Automation runs automatically** - no manual commands needed
2. **Posts generate daily at midnight** (server timezone)
3. **Real-time topics refresh every 6 hours**
4. **All endpoints work without API keys** except content generation
5. **GitHub API used for trending topics** (no rate limits for this use)

## 💰 Pricing

- **Vercel**: Free tier (sufficient for your needs)
- **Railway**: $5/month after free tier
- **Render**: Free tier available
- **Netlify**: Free tier available

**Recommendation**: Start with Vercel free tier, upgrade only if needed. 