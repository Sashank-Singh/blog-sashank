import './globals.css'
// Auto-generation system will initialize via API route instead

export const metadata = {
  title: 'Sashank Singh - Digital Perspectives',
  description: 'Insights, opinions, and analysis on technology, innovation, and the future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-cyber-dark text-gray-100">
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <a href="/" className="font-cyber text-2xl font-bold bg-cyber-gradient bg-clip-text text-transparent glow-text">
                  SASHANK.SINGH
                </a>
                <div className="ml-4 w-2 h-2 bg-cyan-400 rounded-full pulse-glow"></div>
              </div>
              <div className="flex items-center space-x-6">
                <a href="https://sashanksingh.com" className="font-cyber text-cyan-400 hover:text-pink-400 transition-all duration-300 hover:glow-text">
                  HOME
                </a>
                <a href="https://sashanksingh.com/#about" className="font-cyber text-cyan-400 hover:text-pink-400 transition-all duration-300 hover:glow-text">
                  ABOUT
                </a>
                <a href="https://sashanksingh.com/#skills" className="font-cyber text-cyan-400 hover:text-pink-400 transition-all duration-300 hover:glow-text">
                  SKILLS
                </a>
                <a href="https://sashanksingh.com/#projects" className="font-cyber text-cyan-400 hover:text-pink-400 transition-all duration-300 hover:glow-text">
                  PROJECTS
                </a>
                <a href="https://sashanksingh.com/#experience" className="font-cyber text-cyan-400 hover:text-pink-400 transition-all duration-300 hover:glow-text">
                  EXPERIENCE
                </a>
                <a href="https://sashanksingh.com/#contact" className="font-cyber text-cyan-400 hover:text-pink-400 transition-all duration-300 hover:glow-text">
                  CONTACT
                </a>
                <a href="/blogs" className="font-cyber text-purple-400 hover:text-pink-400 transition-all duration-300 hover:glow-text border-l border-cyan-400/30 pl-6">
                  BLOG
                </a>
                <div className="font-code text-xs text-gray-500">
                  STATUS: <span className="text-green-400">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Animated background grid */}
        <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none"></div>
        
        {/* Floating particles */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        </div>
        
        <main className="pt-20">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="mt-20 border-t border-cyan-400/20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="font-cyber text-cyan-400 text-lg mb-4">DIGITAL PERSPECTIVES</div>
              <div className="font-code text-sm text-gray-400 mb-4">
                Innovation: <span className="text-green-400">ACTIVE</span> | 
                Content: <span className="text-cyan-400">UNLIMITED</span> | 
                Updates: <span className="text-pink-400">DAILY</span>
              </div>
              <div className="text-gray-500 text-xs">
                Technology & Innovation Blog © 2025 - Present. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 