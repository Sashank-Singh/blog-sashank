import type { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/storage'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts()
  return [
    { url: 'https://blog.sashanksingh.com/', lastModified: new Date('2026-10-25') },
    { url: 'https://blog.sashanksingh.com/blogs', lastModified: new Date('2026-10-25') },
    ...posts.map(post => ({
      url: `https://blog.sashanksingh.com/blogs/${post.id}`,
      lastModified: post.createdAt,
    })),
  ]
}
