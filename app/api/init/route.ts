import { NextResponse } from 'next/server'
import { initializeSystem } from '@/lib/startup'

// Initialize the automation system when this endpoint is called
export async function POST() {
  try {
    initializeSystem()
    
    return NextResponse.json({
      success: true,
      message: 'Automation system initialized successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Failed to initialize automation system:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to initialize automation system',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: 'System Initialization',
    description: 'Initializes the automated content generation system',
    method: 'POST',
    note: 'This is called automatically when the system starts'
  })
} 