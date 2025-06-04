import Link from 'next/link'
import { ArrowRight, Cpu, Brain, Zap, Terminal, Eye, Rss } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-gradient relative overflow-hidden">
      {/* Hero Section with Asymmetric Layout */}
      <div className="relative">
        <div className="diagonal-section bg-gradient-to-br from-cyber-dark via-purple-900/20 to-cyan-900/20 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              {/* Left side - Main content */}
              <div className="lg:col-span-2 slide-in-left">
                <div className="font-code text-cyan-400 text-sm mb-4 tracking-widest">
                  [DIGITAL_PERSPECTIVES_ACTIVE]
                </div>
                <h1 className="font-cyber text-4xl md:text-7xl font-black mb-6 leading-tight">
                  <span className="text-white">TECH</span>
                  <br />
                  <span className="bg-cyber-gradient bg-clip-text text-transparent glow-text">
                    INSIGHTS
                  </span>
                  <br />
                  <span className="text-cyan-400">BLOG</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                  Explore cutting-edge perspectives on technology, innovation, and the digital future. 
                  Fresh insights and analysis on the trends shaping our world.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/blogs" className="btn-cyber inline-flex items-center gap-3 justify-center">
                    <Terminal className="w-5 h-5" />
                    EXPLORE BLOG
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <div className="btn-ghost inline-flex items-center gap-3 justify-center cursor-default">
                    <Eye className="w-5 h-5" />
                    LATEST INSIGHTS
                  </div>
                </div>
              </div>

              {/* Right side - Floating AI Brain */}
              <div className="lg:col-span-1 slide-in-right">
                <div className="relative float-animation">
                  <div className="w-64 h-64 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-30 pulse-glow"></div>
                    <div className="relative w-full h-full hologram rounded-full flex items-center justify-center asymmetric-card">
                      <Brain className="w-24 h-24 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Asymmetric Cards */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="font-code text-pink-400 text-sm mb-4 tracking-widest">
              [CONTENT_CATEGORIES]
            </div>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold text-white mb-6">
              CONTENT STREAMS
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Opinion Matrix Card */}
            <div className="hologram asymmetric-card p-8 hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-cyber text-xl font-bold text-cyan-400">OPINION.MATRIX</h3>
                  <div className="font-code text-xs text-gray-400">Deep Analysis Protocol</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Deep analysis and thoughtful perspectives on emerging technologies and trends. 
                Comprehensive insights with multi-dimensional reasoning.
              </p>
              <Link href="/blogs?type=opinion" className="font-cyber text-cyan-400 hover:text-pink-400 transition-colors group-hover:glow-text">
                READ_OPINIONS →
              </Link>
            </div>

            {/* News Feed Card */}
            <div className="hologram asymmetric-card p-8 hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-cyber text-xl font-bold text-purple-400">NEWS.FEED</h3>
                  <div className="font-code text-xs text-gray-400">Real-time Data Stream</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Real-time news synthesis and analysis from global information sources. 
                Latest developments and trend insights updated regularly.
              </p>
              <Link href="/blogs?type=news" className="font-cyber text-purple-400 hover:text-pink-400 transition-colors group-hover:glow-text">
                READ_NEWS →
              </Link>
            </div>

            {/* Auto-Generate Card */}
            <div className="hologram asymmetric-card p-8 hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg">
                  <Rss className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-cyber text-xl font-bold text-pink-400">AUTO.GENESIS</h3>
                  <div className="font-code text-xs text-gray-400">Autonomous Creation</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Continuous content creation and publication system. Fresh perspectives 
                delivered regularly without interruption. Always evolving.
              </p>
              <div className="font-cyber text-gray-500 cursor-not-allowed">
                AUTO_UPDATES.ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="font-cyber text-3xl font-bold text-cyan-400 mb-2 group-hover:glow-text transition-all">
                ∞
              </div>
              <div className="font-code text-gray-400 text-sm">Posts Generated</div>
            </div>
            <div className="group">
              <div className="font-cyber text-3xl font-bold text-purple-400 mb-2 group-hover:glow-text transition-all">
                24/7
              </div>
              <div className="font-code text-gray-400 text-sm">Neural Activity</div>
            </div>
            <div className="group">
              <div className="font-cyber text-3xl font-bold text-pink-400 mb-2 group-hover:glow-text transition-all">
                0.001ms
              </div>
              <div className="font-code text-gray-400 text-sm">Response Time</div>
            </div>
            <div className="group">
              <div className="font-cyber text-3xl font-bold text-green-400 mb-2 group-hover:glow-text transition-all">
                100%
              </div>
              <div className="font-code text-gray-400 text-sm">Autonomous</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 