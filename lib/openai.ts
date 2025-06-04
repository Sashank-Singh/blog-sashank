import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface BlogPost {
  id: string
  title: string
  content: string
  type: 'opinion' | 'news'
  topic: string
  createdAt: Date
  excerpt: string
  readingTime: number
}

export async function generateOpinionPost(topic: string): Promise<Omit<BlogPost, 'id' | 'createdAt'>> {
  const prompt = `Write a thoughtful opinion piece about "${topic}". 
  
  Please structure it as follows:
  1. A compelling title (max 60 characters)
  2. An engaging introduction that hooks the reader
  3. 3-4 main points with detailed analysis
  4. A thought-provoking conclusion
  5. Write in a conversational yet professional tone
  6. Aim for 800-1200 words
  
  Make it insightful, balanced, and include different perspectives where relevant.
  
  Format your response as JSON with the following structure:
  {
    "title": "Your Title Here",
    "content": "Full article content here with proper paragraphs",
    "excerpt": "A brief 2-3 sentence summary"
  }`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert content writer who creates engaging, well-researched opinion pieces. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) throw new Error('No response from OpenAI')

    const parsed = JSON.parse(response)
    const wordCount = parsed.content.split(' ').length
    const readingTime = Math.ceil(wordCount / 200)

    return {
      title: parsed.title,
      content: parsed.content,
      excerpt: parsed.excerpt,
      type: 'opinion',
      topic,
      readingTime,
    }
  } catch (error) {
    console.error('Error generating opinion post:', error)
    throw new Error('Failed to generate opinion post')
  }
}

export async function generateNewsPost(topic: string): Promise<Omit<BlogPost, 'id' | 'createdAt'>> {
  const prompt = `Write a news-style article about recent developments in "${topic}". 
  
  Please structure it as follows:
  1. A clear, factual headline (max 60 characters)
  2. A lead paragraph summarizing the key information (who, what, when, where, why)
  3. 3-4 paragraphs expanding on the details
  4. Include relevant context and background
  5. Mention potential implications or future developments
  6. Write in an objective, journalistic style
  7. Aim for 600-800 words
  
  Make it informative, current, and factual. Focus on recent trends and developments.
  
  Format your response as JSON with the following structure:
  {
    "title": "Your Headline Here",
    "content": "Full article content here with proper paragraphs",
    "excerpt": "A brief 2-3 sentence summary"
  }`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional journalist who writes clear, factual news articles. Always respond with valid JSON. Focus on recent developments and trends."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 1500,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) throw new Error('No response from OpenAI')

    const parsed = JSON.parse(response)
    const wordCount = parsed.content.split(' ').length
    const readingTime = Math.ceil(wordCount / 200)

    return {
      title: parsed.title,
      content: parsed.content,
      excerpt: parsed.excerpt,
      type: 'news',
      topic,
      readingTime,
    }
  } catch (error) {
    console.error('Error generating news post:', error)
    throw new Error('Failed to generate news post')
  }
} 