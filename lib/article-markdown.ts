export function articleSubjects(postId: string) {
  if (postId !== 'agenttwin-retry-safety-20261025') return undefined
  return [
    { '@type': 'SoftwareApplication', name: 'AgentTwin', url: 'https://agenttwin.si/', applicationCategory: 'DeveloperApplication' },
    { '@type': 'Organization', name: 'AgentTwin', url: 'https://agenttwin.si/', logo: 'https://agenttwin.si/icon-512.png' },
  ]
}

export function safeMarkdownHtml(source: string) {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const inline = (value: string) => escape(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
  return source.split(/\n\s*\n/).map(block => block.trim()).filter(Boolean).map(block => {
    if (block.startsWith('## ')) return `<h2>${inline(block.slice(3))}</h2>`
    if (block.startsWith('### ')) return `<h3>${inline(block.slice(4))}</h3>`
    const lines = block.split('\n')
    if (lines.every(line => /^[-*] /.test(line))) return `<ul>${lines.map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`
    return `<p>${lines.map(inline).join('<br />')}</p>`
  }).join('')
}
