import { NextResponse } from 'next/server'

// Cache for trends to avoid excessive API calls
let cachedTrends: string[] = []
let lastFetch: number = 0
const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 hours

// Rotating trending topics based on current tech themes
const ROTATING_TRENDING_TOPICS = [
  // Week 1 - AI & Machine Learning
  ['GPT-5 Development Progress', 'Claude AI Model Improvements', 'Open Source AI Models', 'AI Safety Research', 'Machine Learning Optimization'],
  
  // Week 2 - Quantum & Computing  
  ['Quantum Computing Breakthroughs', 'Quantum Internet Development', 'Quantum Cryptography Advances', 'Superconducting Qubits', 'Quantum Error Correction'],
  
  // Week 3 - Space & Energy
  ['SpaceX Starship Updates', 'Mars Mission Planning', 'Solar Panel Efficiency', 'Fusion Energy Progress', 'Battery Technology'],
  
  // Week 4 - Bio & Health Tech
  ['CRISPR Gene Editing', 'mRNA Vaccine Technology', 'Longevity Research', 'Brain-Computer Interfaces', 'Synthetic Biology'],
  
  // Week 5 - Crypto & Blockchain
  ['Ethereum 2.0 Updates', 'Bitcoin Lightning Network', 'DeFi Protocol Innovation', 'NFT Technology Evolution', 'Web3 Infrastructure'],
  
  // Week 6 - Climate & Sustainability  
  ['Carbon Capture Technology', 'Electric Vehicle Batteries', 'Renewable Energy Storage', 'Sustainable Manufacturing', 'Climate Monitoring'],
  
  // Week 7 - VR/AR & Metaverse
  ['Apple Vision Pro Updates', 'Meta Horizon Development', 'AR Glasses Technology', 'Virtual Reality Gaming', 'Haptic Feedback Systems'],
  
  // Week 8 - Robotics & Automation
  ['Humanoid Robot Development', 'Industrial Automation', 'Autonomous Vehicle Testing', 'Drone Technology', 'Robot Learning Systems']
]

const CURRENT_TECH_FOCUS = [
  'Large Language Model Training',
  'Transformer Architecture Evolution', 
  'Neural Network Optimization',
  'Computer Vision Advances',
  'Edge AI Computing',
  'Semiconductor Innovation',
  '6G Wireless Technology',
  'Quantum Sensors',
  'Smart Grid Technology',
  'IoT Security Protocols',
  'Cybersecurity AI Defense',
  'Digital Twin Technology',
  'Blockchain Scalability',
  'Cloud Computing Evolution',
  'Serverless Architecture'
]

async function getTechTrendingTopics(): Promise<string[]> {
  try {
    const trends: string[] = []
    
    // Get week of year to rotate topics
    const now = new Date()
    const weekOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))
    const topicIndex = weekOfYear % ROTATING_TRENDING_TOPICS.length
    
    // Add weekly rotating topics
    trends.push(...ROTATING_TRENDING_TOPICS[topicIndex])
    
    // Add some current tech focus topics
    const shuffledTech = [...CURRENT_TECH_FOCUS].sort(() => Math.random() - 0.5)
    trends.push(...shuffledTech.slice(0, 3))
    
    // Try to get GitHub trending topics (more reliable than news APIs)
    try {
      const githubTrends = await fetchGithubTrending()
      trends.push(...githubTrends)
    } catch (error) {
      console.log('GitHub trending fetch failed, using fallback topics')
    }
    
    // Remove duplicates and limit to 10
    const uniqueTrends = Array.from(new Set(trends))
    return uniqueTrends.slice(0, 10)
    
  } catch (error) {
    console.error('Failed to get trending topics:', error)
    return []
  }
}

async function fetchGithubTrending(): Promise<string[]> {
  try {
    // GitHub's public API for trending repositories
    const response = await fetch('https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=10', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'BlogTrendingTopics/1.0'
      }
    })
    
    if (!response.ok) {
      throw new Error('GitHub API request failed')
    }
    
    const data = await response.json()
    const repos = data.items || []
    
    const techTopics: string[] = []
    
    for (const repo of repos) {
      if (repo.description && repo.language) {
        // Extract tech topics from repository descriptions
        const topic = extractTechTopicFromRepo(repo.description, repo.language, repo.name)
        if (topic && !techTopics.includes(topic)) {
          techTopics.push(topic)
        }
      }
    }
    
    return techTopics.slice(0, 5)
  } catch (error) {
    console.error('GitHub trending fetch failed:', error)
    return []
  }
}

function extractTechTopicFromRepo(description: string, language: string, name: string): string | null {
  // Clean and extract meaningful tech topics from GitHub repos
  const techKeywords = {
    'ai': 'AI Development',
    'machine learning': 'Machine Learning',
    'deep learning': 'Deep Learning',
    'neural network': 'Neural Networks',
    'blockchain': 'Blockchain Technology',
    'cryptocurrency': 'Cryptocurrency',
    'quantum': 'Quantum Computing',
    'robotics': 'Robotics',
    'iot': 'Internet of Things',
    'cloud': 'Cloud Computing',
    'serverless': 'Serverless Architecture',
    'microservices': 'Microservices',
    'kubernetes': 'Container Orchestration',
    'react': 'Frontend Development',
    'vue': 'JavaScript Frameworks',
    'rust': 'Systems Programming',
    'go': 'Backend Development',
    'python': 'Python Development'
  }
  
  const lowerDesc = description.toLowerCase()
  const lowerName = name.toLowerCase()
  
  for (const [keyword, topic] of Object.entries(techKeywords)) {
    if (lowerDesc.includes(keyword) || lowerName.includes(keyword)) {
      return topic
    }
  }
  
  // Fallback based on programming language
  const languageTopics: Record<string, string> = {
    'JavaScript': 'Web Development Innovation',
    'TypeScript': 'Type-Safe Development',
    'Python': 'Data Science & AI',
    'Rust': 'Systems Programming',
    'Go': 'Cloud Infrastructure',
    'Swift': 'iOS Development',
    'Kotlin': 'Android Development',
    'Java': 'Enterprise Software',
    'C++': 'Performance Computing',
    'C': 'Embedded Systems'
  }
  
  return languageTopics[language] || null
}

export async function POST() {
  try {
    const now = Date.now()
    
    // Return cached trends if still fresh
    if (cachedTrends.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      return NextResponse.json({
        topics: cachedTrends,
        source: 'cache',
        cached: true
      })
    }
    
    // Fetch fresh trends
    const trends = await getTechTrendingTopics()
    
    if (trends.length > 0) {
      cachedTrends = trends
      lastFetch = now
      
      return NextResponse.json({
        topics: trends,
        source: 'live_aggregated',
        cached: false,
        count: trends.length,
        note: 'Topics from weekly rotation + GitHub trending + tech focus areas'
      })
    } else {
      // Fallback topics
      const fallbackTopics = [
        'Artificial Intelligence Ethics',
        'Quantum Computing Progress', 
        'Sustainable Technology',
        'Space Technology Innovation',
        'Cybersecurity Evolution'
      ]
      
      return NextResponse.json({
        topics: fallbackTopics,
        source: 'fallback',
        cached: false
      })
    }
    
  } catch (error) {
    console.error('Trends API error:', error)
    
    // Return fallback on error
    return NextResponse.json({
      topics: [
        'Technology Innovation Trends',
        'Digital Transformation Updates', 
        'Future Tech Predictions'
      ],
      source: 'error_fallback',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 