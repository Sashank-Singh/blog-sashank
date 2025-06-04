import { initializeAutoGeneration } from './auto-generator'

// Initialize the auto-generation system when the module loads
let isInitialized = false

export function initializeSystem() {
  if (!isInitialized) {
    try {
      console.log('🚀 Starting blog automation system...')
      
      // Only initialize if we're in runtime (not build time) and have API key
      if (process.env.NODE_ENV === 'production' && process.env.OPENAI_API_KEY) {
        initializeAutoGeneration()
        console.log('✅ Blog automation system started successfully')
      } else if (process.env.NODE_ENV === 'development') {
        // In development, try to initialize but don't fail if no API key
        if (process.env.OPENAI_API_KEY) {
          initializeAutoGeneration()
          console.log('✅ Blog automation system started successfully')
        } else {
          console.log('⚠️ OpenAI API key not found - automation will not work until key is added')
        }
      } else {
        console.log('⏭️ Skipping automation initialization (build environment)')
      }
      
      isInitialized = true
    } catch (error) {
      console.error('⚠️ Blog automation system failed to start:', error)
      // Don't throw - let the app continue without automation
    }
  }
}

// Auto-initialization is now handled via API routes instead of module import
// This prevents build-time issues and allows for better error handling 