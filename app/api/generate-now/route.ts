import { NextResponse } from 'next/server'
import { generateDailyContent } from '@/lib/auto-generator'

export async function POST() {
  try {
    console.log('⚡ Manual generation triggered...')
    
    // Generate the daily content (1 opinion + 1 news)
    await generateDailyContent()
    
    return NextResponse.json({
      success: true,
      message: 'Daily content generated successfully',
      posts_created: 2,
      types: ['opinion', 'news'],
      timestamp: new Date().toISOString(),
      note: 'This was a manual generation. Automatic generation happens daily at midnight.'
    })

  } catch (error) {
    console.error('❌ Manual generation error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: `Generation failed: ${error.message}`,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Unknown error occurred' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: 'Manual Generation',
    description: 'Triggers immediate generation of 1 opinion + 1 news post',
    method: 'POST',
    automation_note: 'Daily generation runs automatically at midnight'
  })
} 