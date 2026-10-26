import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { safeMarkdownHtml } from '../lib/article-markdown'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

test('renders headings and safe external links', () => {
  const html = safeMarkdownHtml('## A section\n\nSee [AgentTwin](https://agenttwin.si/what-is-agenttwin/).')
  assert.match(html, /<h2>A section<\/h2>/)
  assert.match(html, /<a href="https:\/\/agenttwin\.si\/what-is-agenttwin\/">AgentTwin<\/a>/)
})

test('escapes Markdown HTML and rejects non-http links', () => {
  const html = safeMarkdownHtml('<script>alert(1)</script> [bad](javascript:alert(1))')
  assert.doesNotMatch(html, /<script>/)
  assert.doesNotMatch(html, /href="javascript:/)
  assert.match(html, /&lt;script&gt;/)
})
test('the AgentTwin article defines its product and organization relationships', () => {
  const page = readFileSync(join(process.cwd(), 'app/blogs/[id]/page.tsx'), 'utf8')
  assert.match(page, /agenttwin-retry-safety-20261025/)
  assert.match(page, /'@id': 'https:\/\/agenttwin\.si\/#software'/)
  assert.match(page, /'@id': 'https:\/\/agenttwin\.si\/#organization'/)
  assert.match(page, /sameAs: \['https:\/\/www\.linkedin\.com\/in\/sashanksingh08'\]/)
  assert.match(page, /operatingSystem: 'Node\.js 22\.12\+'/)
})
