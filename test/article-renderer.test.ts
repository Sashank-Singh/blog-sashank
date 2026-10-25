import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { safeMarkdownHtml, articleSubjects } from '../lib/article-markdown'

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

test('names AgentTwin as the subject of its retry-safety guide', () => {
  const about = articleSubjects('agenttwin-retry-safety-20261025')
  assert.equal(about?.length, 2)
  assert.deepEqual(about?.map(entity => [entity['@type'], entity.name, entity.url]), [
    ['SoftwareApplication', 'AgentTwin', 'https://agenttwin.si/'],
    ['Organization', 'AgentTwin', 'https://agenttwin.si/'],
  ])
  assert.equal(articleSubjects('another-post'), undefined)
})
