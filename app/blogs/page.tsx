import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/storage'
import { format } from 'date-fns'
import { Cpu, Zap, Clock, Brain, Database, Activity } from 'lucide-react'

interface BlogsPageProps {
  searchParams: { type?: 'opinion' | 'news' }
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { type } = searchParams
  const posts = await getAllBlogPosts(type)

  return (
    <div className="min-h-screen bg-dark-gradient matrix-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Asymmetric Layout */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="font-code text-cyan-400 text-sm mb-4 tracking-widest">
                [DIGITAL_BLOG_ACTIVE]
              </div>
              <h1 className="font-cyber text-4xl md:text-6xl font-black text-white mb-6 glow-text">
                BLOG.STREAM
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                {type === 'opinion' 
                  ? 'Deep analysis and perspectives on emerging technologies and trends'
                  : type === 'news'
                  ? 'Latest developments and insights from the digital world'
                  : 'Exploring technology, innovation, and the future of digital society'
                }
              </p>
            </div>
            
            <div className="lg:col-span-1">
              <div className="hologram asymmetric-card p-6 text-center">
                <div className="font-cyber text-2xl text-cyan-400 mb-2">{posts.length}</div>
                <div className="font-code text-xs text-gray-400">Posts Available</div>
                <div className="mt-4 flex justify-center">
                  <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cyber Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link 
              href="/blogs" 
              className={`font-cyber px-6 py-3 transition-all duration-300 ${
                !type 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-400/30' 
                  : 'border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10'
              }`}
              style={{clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'}}
            >
              ALL.POSTS
            </Link>
            <Link 
              href="/blogs?type=opinion" 
              className={`font-cyber px-6 py-3 transition-all duration-300 inline-flex items-center gap-2 ${
                type === 'opinion'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/30' 
                  : 'border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10'
              }`}
              style={{clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'}}
            >
              <Cpu className="w-4 h-4" />
              OPINION.EXE
            </Link>
            <Link 
              href="/blogs?type=news" 
              className={`font-cyber px-6 py-3 transition-all duration-300 inline-flex items-center gap-2 ${
                type === 'news'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-400/30' 
                  : 'border border-purple-400/30 text-purple-400 hover:bg-purple-400/10'
              }`}
              style={{clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'}}
            >
              <Zap className="w-4 h-4" />
              NEWS.STREAM
            </Link>
          </div>

          {/* Update Status */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 hologram px-6 py-3 rounded-lg">
              <Activity className="w-5 h-5 text-green-400 animate-pulse" />
              <span className="font-code text-sm text-gray-300">
                UPDATES: <span className="text-green-400">DAILY</span>
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="hologram asymmetric-card max-w-md mx-auto p-8">
              <Database className="w-16 h-16 text-cyan-400 mx-auto mb-6 pulse-glow" />
              <h3 className="font-cyber text-xl text-white mb-4">CONTENT.LOADING</h3>
              <p className="text-gray-300 mb-6">
                {type 
                  ? `${type.toUpperCase()} content is being prepared...`
                  : 'Content system is initializing. Fresh posts coming soon...'
                }
              </p>
              <div className="font-code text-cyan-400 text-sm">
                STATUS: CONTENT.PENDING
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <article 
                key={post.id} 
                className={`hologram asymmetric-card p-6 hover:scale-105 transition-all duration-500 group ${
                  index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                }`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center gap-3 mb-4">
                  {post.type === 'opinion' ? (
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded">
                      <Cpu className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <span className={`font-cyber text-sm font-bold ${
                      post.type === 'opinion' ? 'text-cyan-400' : 'text-purple-400'
                    }`}>
                      {post.type === 'opinion' ? 'OPINION.MATRIX' : 'NEWS.FEED'}
                    </span>
                    <div className="font-code text-xs text-gray-500">
                      ID: {post.id.slice(0, 8).toUpperCase()}
                    </div>
                  </div>
                </div>
                
                <h2 className="font-cyber text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="font-code">{format(post.createdAt, 'yyyy.MM.dd')}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-code">{post.readingTime}min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-code text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                    {post.topic.substring(0, 20)}...
                  </span>
                  <Link 
                    href={`/blogs/${post.id}`}
                    className="font-cyber text-cyan-400 hover:text-pink-400 transition-colors text-sm group-hover:glow-text"
                  >
                    ACCESS →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 