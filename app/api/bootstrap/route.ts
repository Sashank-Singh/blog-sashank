import { NextResponse } from 'next/server'
import { generateDailyContent, generateInitialContent } from '@/lib/auto-generator'
import { getAllBlogPosts } from '@/lib/storage'

export async function POST() {
  try {
    console.log('🚀 Bootstrap content generation started...')
    
    // Generate initial content with 1 opinion + 1 news
    await generateInitialContent()
    
    return NextResponse.json({
      success: true,
      message: 'Content generation completed successfully',
      posts_created: 2,
      types: ['opinion', 'news'],
      timestamp: new Date().toISOString(),
      automation_status: 'Daily generation scheduled for midnight'
    })

  } catch (error) {
    console.error('❌ Bootstrap generation error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { 
            error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.',
            solution: 'Add OPENAI_API_KEY=your_key_here to your .env.local file'
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: `Content generation failed: ${error.message}`,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Unknown error occurred during content generation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'System operational',
    automation: 'Active - Daily generation at midnight',
    content_types: ['opinion', 'news'],
    real_time_data: 'Enabled',
    last_check: new Date().toISOString(),
    next_generation: 'Midnight (00:00)',
    posts_per_day: 2
  })
} 