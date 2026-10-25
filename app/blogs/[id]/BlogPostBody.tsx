'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function BlogPostBody({ content }: { content: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let active = true;
    try {
      const rendered = marked.parse(content, { async: false }) as string;
      if (active) setHtml(DOMPurify.sanitize(rendered, { USE_PROFILES: { html: true } }));
    } catch {
      if (active) setHtml('');
    }
    return () => { active = false; };
  }, [content]);

  return <div className="prose prose-cyber max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
