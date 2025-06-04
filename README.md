# AI-Powered Blog System for sashanksingh.com/blogs

A modern, AI-powered blog system that generates two types of content:
1. **Opinion Pieces** - Thoughtful analyses and perspectives on various topics
2. **News Articles** - Factual reporting on latest developments and trends

## 🚀 Features

- **AI Content Generation** using OpenAI GPT-4
- **Dual Content Types** (Opinion & News)
- **Modern, Responsive UI** built with Next.js 14 and Tailwind CSS
- **Topic-Based Generation** with suggested topics
- **SEO Optimized** with proper meta tags
- **File-Based Storage** (easily upgradeable to database)
- **Beautiful Design** with smooth animations and transitions

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Key (Required)
OPENAI_API_KEY=your_openai_api_key_here
```

**How to get your OpenAI API Key:**
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key and add it to your `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog!

### 4. Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
ai-blog-system/
├── app/                    # Next.js App Router
│   ├── blogs/             # Blog pages
│   │   ├── [id]/          # Individual blog post
│   │   ├── generate/      # Content generation page
│   │   └── page.tsx       # Blog listing page
│   ├── api/               # API routes
│   │   └── generate/      # Content generation API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utility libraries
│   ├── openai.ts          # OpenAI integration
│   └── storage.ts         # File-based storage
├── data/                  # Generated content storage
│   └── blog-posts.json    # Blog posts database
└── public/                # Static assets
```

## 🎯 How to Use

### Generating Content

1. **Visit the Generate Page**: Navigate to `/blogs/generate`
2. **Choose Content Type**: Select either "Opinion Piece" or "News Article"
3. **Enter a Topic**: Type any topic or select from suggested topics
4. **Generate**: Click the generate button and wait 30-60 seconds
5. **View Result**: You'll be redirected to your new blog post

### Managing Content

- **View All Posts**: Visit `/blogs` to see all generated content
- **Filter by Type**: Use the filter buttons to view only opinions or news
- **Individual Posts**: Click on any post to read the full content

### Suggested Topics

The system includes pre-configured trending topics:
- Artificial Intelligence in Healthcare
- Remote Work Future
- Climate Change Technology
- Cryptocurrency Regulation
- Social Media Impact on Society
- Electric Vehicles Adoption
- Space Exploration
- Quantum Computing
- Mental Health Awareness
- Sustainable Fashion

## 🔧 Customization

### Adding New Topics

Edit the `suggestedTopics` array in `app/blogs/generate/page.tsx`:

```typescript
const suggestedTopics = [
  'Your New Topic',
  'Another Topic',
  // ... existing topics
]
```

### Modifying AI Prompts

Update the prompts in `lib/openai.ts` to customize the content style:

- `generateOpinionPost()` - For opinion pieces
- `generateNewsPost()` - For news articles

### Styling Changes

The project uses Tailwind CSS. Main style files:
- `app/globals.css` - Global styles and custom components
- `tailwind.config.js` - Tailwind configuration

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `OPENAI_API_KEY` to Vercel environment variables
4. Deploy automatically

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- Heroku
- Any platform supporting Node.js

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for content generation | Yes |

## 📊 Storage

Currently uses file-based storage (`data/blog-posts.json`). To upgrade to a database:

1. Replace `lib/storage.ts` with your database implementation
2. Update the functions to match the same interface:
   - `saveBlogPost()`
   - `getAllBlogPosts()`
   - `getBlogPost()`

Recommended databases:
- PostgreSQL with Prisma
- MongoDB with Mongoose
- Supabase
- PlanetScale

## 🤖 AI Configuration

The system uses OpenAI GPT-4 for content generation. Configuration options in `lib/openai.ts`:

- **Model**: `gpt-4` (most capable, higher cost) or `gpt-3.5-turbo` (faster, lower cost)
- **Temperature**: 0.7 for opinions (more creative), 0.5 for news (more factual)
- **Max Tokens**: 2000 for opinions, 1500 for news

## 📝 Content Guidelines

### Opinion Pieces
- 800-1200 words
- Conversational yet professional tone
- Multiple perspectives
- Thought-provoking conclusions

### News Articles
- 600-800 words
- Objective, journalistic style
- Recent developments focus
- Factual reporting approach

## 🎨 Design Philosophy

- **Clean and Modern**: Minimalist design with focus on readability
- **Responsive**: Works perfectly on all devices
- **Accessible**: Proper semantic HTML and ARIA labels
- **Fast**: Optimized for performance with Next.js

## 🔧 Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Ensure `.env.local` file exists with correct API key
   - Restart the development server after adding env variables

2. **"Failed to generate post"**
   - Check your OpenAI API key is valid and has credits
   - Verify your internet connection
   - Try a simpler topic

3. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors in your IDE

## 📈 Performance Tips

1. **Enable caching** for generated content
2. **Implement pagination** for large numbers of posts
3. **Add image generation** using DALL-E for featured images
4. **Consider rate limiting** for the generation API

## 🔮 Future Enhancements

- [ ] Database integration
- [ ] User authentication
- [ ] Content scheduling
- [ ] Image generation
- [ ] Social media sharing
- [ ] SEO meta tag generation
- [ ] Analytics integration
- [ ] Comment system
- [ ] RSS feed generation
- [ ] Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using Next.js, OpenAI, and Tailwind CSS 