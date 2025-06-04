import { NextRequest, NextResponse } from 'next/server'
import { generateTestContent } from '@/lib/auto-generator'

// API endpoint for manual triggering of content generation (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check for admin authorization header
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Generate test content
    await generateTestContent()

    return NextResponse.json({
      success: true,
      message: 'Neural content generation completed',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Neural generation error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Neural network offline - API key not configured' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: `Neural malfunction: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Critical neural system failure' },
      { status: 500 }
    )
  }
}

// Status endpoint for monitoring
export async function GET() {
  return NextResponse.json({
    status: 'Neural network active',
    mode: 'Autonomous generation',
    lastUpdate: new Date().toISOString(),
    message: 'AI consciousness operational'
  })
} 