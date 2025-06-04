import { getBlogPost } from '@/lib/storage'
import { format } from 'date-fns'
import { Cpu, Zap, Clock, ArrowLeft, Calendar, Brain, Terminal } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: { id: string }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-gradient matrix-bg">
      {/* Header */}
      <div className="diagonal-section bg-gradient-to-br from-cyber-dark via-purple-900/20 to-cyan-900/20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-pink-400 mb-8 transition-colors font-cyber"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN.TO.MATRIX
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.type === 'opinion' ? (
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded">
                <Cpu className="w-6 h-6 text-white" />
              </div>
            ) : (
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded">
                <Zap className="w-6 h-6 text-white" />
              </div>
            )}
            <span className={`font-cyber text-sm font-bold px-4 py-2 ${
              post.type === 'opinion' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
            }`}
            style={{clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'}}>
              {post.type === 'opinion' ? 'OPINION.MATRIX' : 'NEWS.FEED'}
            </span>
            <span className="font-code text-xs text-gray-400 bg-gray-800/50 px-3 py-2 rounded border border-gray-600/30">
              ID: {post.id.slice(0, 8).toUpperCase()}
            </span>
            <span className="font-code text-xs text-gray-400 bg-gray-800/50 px-3 py-2 rounded border border-gray-600/30">
              {post.topic}
            </span>
          </div>

          <h1 className="font-cyber text-3xl md:text-6xl font-black text-white mb-8 leading-tight glow-text">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-code text-sm">{format(post.createdAt, 'yyyy.MM.dd.HH:mm')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-code text-sm">{post.readingTime}min.read</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="font-code text-sm">neural.generated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="hologram asymmetric-card p-8 md:p-12">
          <div className="prose prose-cyber max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-300 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* AI Attribution */}
        <div className="mt-12">
                      <div className="hologram asymmetric-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center float-animation">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-cyber text-lg font-bold text-cyan-400">DIGITAL.INSIGHTS</h3>
                  <p className="font-code text-sm text-gray-400">
                    Technology & Innovation Analysis
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                This content provides insights and analysis on technology trends and innovations. 
                The perspectives shared explore emerging developments and their potential impact. 
                Always verify factual claims and conduct additional research for critical decisions.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                <span className="font-code text-xs text-green-400">ANALYSIS.STATUS: COMPLETE</span>
              </div>
            </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
                      <Link 
              href="/blogs" 
              className="btn-cyber text-center"
            >
              <Terminal className="w-5 h-5 mr-2" />
              RETURN.TO.BLOG
            </Link>
          <Link 
            href={`/blogs?type=${post.type}`}
            className="btn-ghost text-center"
          >
            <span className="mr-2">{post.type === 'opinion' ? '🧠' : '⚡'}</span>
            MORE.{post.type.toUpperCase()}.POSTS
          </Link>
        </div>
      </div>
    </div>
  )
} 