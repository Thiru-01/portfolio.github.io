<script>
  import { onMount } from 'svelte'
  import { marked } from 'marked'

  export let url = ''

  let html = ''
  let loading = false
  let error = ''

  async function fetchMarkdown() {
    if (!url) return

    loading = true
    error = ''
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const md = await response.text()
      html = marked(md)
    } catch (err) {
      error = err.message
    } finally {
      loading = false
    }
  }

  $: if (url) fetchMarkdown()
</script>

{#if loading}
  <div class="markdown-loading">Loading...</div>
{:else if error}
  <div class="markdown-error">Error loading markdown: {error}</div>
{:else if html}
  <div class="markdown-content">
    {@html html}
  </div>
{:else}
  <div class="markdown-placeholder">No markdown URL provided</div>
{/if}

<style>
  .markdown-loading {
    text-align: center;
    padding: 2rem;
    color: var(--text-60);
  }

  .markdown-error {
    background: var(--error-bg, #fee);
    color: var(--error-text, #c33);
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid var(--error-border, #fcc);
  }

  .markdown-content {
    /* Add any custom styles for rendered markdown */
    line-height: 1.6;
  }

  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3,
  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: var(--text-100);
  }

  .markdown-content p {
    margin-bottom: 1em;
  }

  .markdown-content code {
    background: var(--code-bg, #f5f5f5);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: var(--font-mono);
  }

  .markdown-content pre {
    background: var(--code-bg, #f5f5f5);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
  }

  .markdown-content blockquote {
    border-left: 4px solid var(--gold);
    padding-left: 1em;
    margin: 1em 0;
    color: var(--text-80);
  }
</style>