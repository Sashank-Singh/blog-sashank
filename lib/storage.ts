import { BlogPost } from './openai'
import { promises as fs } from 'fs'
import path from 'path'

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

export interface StoredBlogPost extends Omit<BlogPost, 'createdAt'> {
  createdAt: string // JSON doesn't support Date objects
}

async function ensureDataDirectory() {
  const dataDir = path.dirname(BLOG_DATA_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readBlogPosts(): Promise<StoredBlogPost[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(BLOG_DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist or is empty, return empty array
    return []
  }
}

async function writeBlogPosts(posts: StoredBlogPost[]): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(BLOG_DATA_FILE, JSON.stringify(posts, null, 2))
}

export async function saveBlogPost(post: Omit<BlogPost, 'id' | 'createdAt'>): Promise<BlogPost> {
  const posts = await readBlogPosts()
  
  const newPost: StoredBlogPost = {
    ...post,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  
  posts.unshift(newPost) // Add to beginning
  await writeBlogPosts(posts)
  
  return {
    ...newPost,
    createdAt: new Date(newPost.createdAt),
  }
}

export async function getAllBlogPosts(type?: 'opinion' | 'news'): Promise<BlogPost[]> {
  const posts = await readBlogPosts()
  
  let filteredPosts = posts
  if (type) {
    filteredPosts = posts.filter(post => post.type === type)
  }
  
  return filteredPosts.map(post => ({
    ...post,
    createdAt: new Date(post.createdAt),
  }))
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const posts = await readBlogPosts()
  const post = posts.find(p => p.id === id)
  
  if (!post) return null
  
  return {
    ...post,
    createdAt: new Date(post.createdAt),
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
} 