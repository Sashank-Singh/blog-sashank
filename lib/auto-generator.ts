import { generateOpinionPost, generateNewsPost } from './openai'
import { saveBlogPost } from './storage'

// Daily trending topics for automated generation
const TRENDING_TOPICS = [
  'Artificial Intelligence Breakthrough',
  'Quantum Computing Advances',
  'Climate Tech Innovation',
  'Space Exploration Updates',
  'Cryptocurrency Market Analysis',
  'Neural Interface Technology',
  'Autonomous Vehicle Progress',
  'Biotechnology Revolution',
  'Renewable Energy Future',
  'Metaverse Development',
  'Robotics Evolution',
  'Blockchain Applications',
  'Gene Editing Progress',
  'Virtual Reality Innovation',
  'Cybersecurity Threats',
  'Digital Transformation',
  'Smart City Technology',
  'Sustainable Technology',
  'Machine Learning Advances',
  'Internet of Things Growth',
  'Cloud Computing Evolution',
  'Edge Computing Revolution',
  '5G Network Expansion',
  'Fintech Innovation',
  'Healthcare Technology',
  'Educational Technology',
  'Remote Work Technology',
  'Social Media Evolution',
  'E-commerce Trends',
  'Gaming Industry Evolution',
  'Augmented Reality Applications',
  'Wearable Technology',
  'Smart Home Innovation',
  'Electric Vehicle Infrastructure',
  'Battery Technology Advances',
  'Solar Energy Efficiency',
  'Wind Power Innovation',
  'Hydrogen Fuel Technology',
  'Carbon Capture Technology',
  'Sustainable Agriculture',
  'Food Technology Innovation',
  'Water Conservation Technology',
  'Waste Management Innovation',
  'Mental Health Technology',
  'Telemedicine Growth',
  'Medical Device Innovation',
  'Pharmaceutical Technology',
  'Diagnostic Technology',
  'Personalized Medicine',
  'Data Privacy Regulations',
  'Digital Identity Solutions',
  'Biometric Authentication',
  'Quantum Cryptography',
  'Zero Trust Security',
  'API Security Evolution',
  'Mobile Security Advances',
  'Network Security Innovation'
]

const FUTURISTIC_TOPICS = [
  'Neural Implant Networks',
  'Consciousness Transfer Technology',
  'Interplanetary Communication',
  'Quantum Internet Infrastructure',
  'Synthetic Biology Design',
  'Digital Twin Ecosystems',
  'Holographic Computing',
  'Time Dilation Communication',
  'Nano-scale Manufacturing',
  'Dimensional Computing Theory',
  'Brain-Computer Interfaces',
  'Molecular Computing',
  'Biocomputing Systems',
  'Photonic Computing',
  'Neuromorphic Chips',
  'Quantum Teleportation',
  'Space-based Solar Power',
  'Asteroid Mining Technology',
  'Terraforming Techniques',
  'Longevity Technology',
  'Cryogenic Preservation',
  'Digital Immortality',
  'Memory Enhancement Technology',
  'Cognitive Augmentation',
  'Genetic Engineering Ethics',
  'Designer Babies Technology',
  'Regenerative Medicine',
  'Organ Printing Technology',
  'Synthetic Life Forms',
  'Robotic Companions',
  'AI Consciousness Debate',
  'Machine Emotions',
  'Robot Rights Movement',
  'Automated Governance',
  'Digital Democracy',
  'Virtual Nations',
  'Cryptocurrency Societies',
  'Post-scarcity Economics',
  'Universal Basic Income',
  'Fusion Energy Revolution',
  'Antimatter Technology',
  'Gravity Manipulation',
  'Warp Drive Theory',
  'Parallel Universe Communication',
  'Time Travel Possibilities',
  'Multiverse Exploration',
  'Reality Simulation Theory',
  'Digital Physics',
  'Information Universe Theory'
]

const BUSINESS_TOPICS = [
  'Startup Ecosystem Evolution',
  'Venture Capital Trends',
  'IPO Market Analysis',
  'Merger and Acquisition Strategies',
  'Corporate Innovation Labs',
  'Digital Business Models',
  'Subscription Economy Growth',
  'Platform Business Strategy',
  'Supply Chain Innovation',
  'Logistics Technology',
  'Manufacturing Automation',
  'Quality Control Systems',
  'Product Development Cycles',
  'Customer Experience Technology',
  'Marketing Automation',
  'Sales Technology Evolution',
  'Human Resources Technology',
  'Talent Acquisition Innovation',
  'Workplace Collaboration Tools',
  'Project Management Evolution'
]

const SCIENCE_TOPICS = [
  'Dark Matter Research',
  'Black Hole Discoveries',
  'Exoplanet Exploration',
  'CRISPR Gene Editing',
  'Stem Cell Research',
  'Cancer Treatment Innovation',
  'Alzheimer Research Progress',
  'Vaccine Development Technology',
  'Antibiotic Resistance Solutions',
  'Precision Medicine Advances',
  'Climate Change Research',
  'Ocean Acidification Studies',
  'Biodiversity Conservation',
  'Ecosystem Restoration',
  'Species Revival Technology',
  'Archaeological Technology',
  'Paleontology Discoveries',
  'Anthropological Research',
  'Linguistic Evolution Studies',
  'Cultural Preservation Technology'
]

// Fetch real-time trending topics from web search
async function fetchRealTimeTrends(): Promise<string[]> {
  try {
    // Web search for current tech trends
    const response = await fetch('/api/trends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch real-time trends')
    }
    
    const trends = await response.json()
    return trends.topics || []
  } catch (error) {
    console.error('Failed to fetch real-time trends, using fallback topics:', error)
    return []
  }
}

// Select topic with real-time data preference
async function selectTopic(): Promise<string> {
  // Try to get real-time trending topics first
  const realTimeTrends = await fetchRealTimeTrends()
  
  if (realTimeTrends.length > 0) {
    console.log('Using real-time trending topic')
    return realTimeTrends[Math.floor(Math.random() * realTimeTrends.length)]
  }
  
  // Fallback to curated topics
  const allTopics = [...TRENDING_TOPICS, ...FUTURISTIC_TOPICS, ...BUSINESS_TOPICS, ...SCIENCE_TOPICS]
  const random = Math.random()
  
  let topicPool
  if (random > 0.6) {
    topicPool = TRENDING_TOPICS
  } else if (random > 0.3) {
    topicPool = FUTURISTIC_TOPICS
  } else if (random > 0.15) {
    topicPool = BUSINESS_TOPICS
  } else {
    topicPool = SCIENCE_TOPICS
  }
  
  return topicPool[Math.floor(Math.random() * topicPool.length)]
}

export async function generateDailyContent(): Promise<void> {
  try {
    console.log('🤖 Starting daily content generation...')
    
    // Always generate exactly 1 opinion + 1 news post
    const opinionTopic = await selectTopic()
    const newsTopic = await selectTopic()
    
    console.log(`📝 Generating opinion post about: ${opinionTopic}`)
    const opinionPost = await generateOpinionPost(opinionTopic)
    await saveBlogPost(opinionPost)
    
    // Wait 5 seconds between generations to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    console.log(`📰 Generating news post about: ${newsTopic}`)
    const newsPost = await generateNewsPost(newsTopic)
    await saveBlogPost(newsPost)
    
    console.log('✅ Daily content generation completed: 1 opinion + 1 news post created')
  } catch (error) {
    console.error('❌ Daily content generation failed:', error)
    throw error
  }
}

let generationTimer: NodeJS.Timeout | null = null

export function scheduleAutomaticGeneration(): void {
  // Clear any existing timer
  if (generationTimer) {
    clearTimeout(generationTimer)
  }
  
  const msUntilMidnight = getMsUntilMidnight()
  
  console.log(`⏰ Scheduling automatic generation. Next run in ${Math.round(msUntilMidnight / 1000 / 60)} minutes`)
  
  generationTimer = setTimeout(async () => {
    console.log('🌙 Midnight reached - starting daily generation')
    try {
      await generateDailyContent()
    } catch (error) {
      console.error('❌ Scheduled generation failed:', error)
    }
    
    // Set up recurring generation every 24 hours
    const dailyInterval = setInterval(async () => {
      console.log('🔄 Daily generation cycle starting')
      try {
        await generateDailyContent()
      } catch (error) {
        console.error('❌ Daily generation failed:', error)
      }
    }, 24 * 60 * 60 * 1000)
    
    // Store the interval so we can clear it if needed
    process.on('SIGINT', () => {
      clearInterval(dailyInterval)
      process.exit(0)
    })
    
  }, msUntilMidnight)
}

function getMsUntilMidnight(): number {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  return midnight.getTime() - now.getTime()
}

// For manual testing - generate content immediately
export async function generateTestContent(): Promise<void> {
  const topic = await selectTopic()
  const type = Math.random() > 0.5 ? 'opinion' : 'news'
  
  try {
    let generatedPost
    if (type === 'opinion') {
      generatedPost = await generateOpinionPost(topic)
    } else {
      generatedPost = await generateNewsPost(topic)
    }
    
    await saveBlogPost(generatedPost)
    console.log(`✅ Test content generated: ${type} post about ${topic}`)
  } catch (error) {
    console.error('❌ Test content generation failed:', error)
    throw error
  }
}

// Generate initial content when system starts
export async function generateInitialContent(): Promise<void> {
  try {
    console.log('🚀 Generating initial content...')
    
    // Generate 1 opinion + 1 news for initial content
    const opinionTopic = await selectTopic()
    const newsTopic = await selectTopic()
    
    const opinionPost = await generateOpinionPost(opinionTopic)
    await saveBlogPost(opinionPost)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newsPost = await generateNewsPost(newsTopic)
    await saveBlogPost(newsPost)
    
    console.log('✅ Initial content generation completed')
  } catch (error) {
    console.error('❌ Initial content generation failed:', error)
    throw error
  }
}

// Auto-start the generation system
export function initializeAutoGeneration(): void {
  console.log('🔄 Initializing automatic content generation system...')
  scheduleAutomaticGeneration()
  console.log('✅ Auto-generation system initialized')
} 