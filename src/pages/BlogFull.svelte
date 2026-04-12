<script>
  import { onMount } from 'svelte'
  import { tick } from 'svelte'
  import data from '../data/portfolio.json'
  import MarkdownRenderer from '../components/MarkdownRenderer.svelte'

  let searchQuery = ''
  let selectedTag = 'All'
  let mdUrl = ''
  let selectedPost = null
  let featured = null

  const allTags = data.blog ? ['All', ...new Set(data.blog.flatMap(p => p.tags))] : ['All']

  $: filtered = data.blog ? data.blog.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  }) : []

  $: featured = filtered[0]

  async function revealFilteredResults() {
    await tick()
    sectionEl?.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
  }

  $: filtered, sectionEl && revealFilteredResults()

  async function selectPost(post) {
    selectedPost = post
    mdUrl = post.content
    await tick()
    document.querySelector('.md-url-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  let sectionEl

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting)
            e.target.classList.add('visible')
        })
      },
      { threshold: 0.05 }
    )
    if (sectionEl) {
      sectionEl.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }
    return () => observer.disconnect()
  })
</script>

<section class="blog-full" bind:this={sectionEl}>
  <!-- Page header -->
  <div class="bf-page-header">
    <div class="bf-header-text">
      <p class="inner-hero-label reveal">Writing</p>
      <h1 class="inner-hero-title reveal reveal-delay-1">
        From the <em>Blog</em>
      </h1>
      <p class="bf-sub reveal reveal-delay-2">
        Thoughts on software architecture, developer experience, and building things that matter.
      </p>
    </div>

    <!-- Search & Filter -->
    <div class="bf-controls reveal reveal-delay-3">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          type="text"
          placeholder="Search articles..."
          bind:value={searchQuery}
          class="search-input"
        />
      </div>

      <div class="tag-filters">
        {#each allTags as tag}
          <button
            class="filter-tag"
            class:active={selectedTag === tag}
            on:click={() => selectedTag = tag}
            data-hover
          >
            {tag}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Article Content -->
  {#if selectedPost && mdUrl}
    <div class="md-url-section">
      <div class="selected-post-header">
        <h2>{selectedPost.title}</h2>
        <div class="post-meta">
          <span>{selectedPost.date}</span>
          <span>·</span>
          <span>{selectedPost.readTime}</span>
        </div>
      </div>
      <MarkdownRenderer url={mdUrl} />
    </div>
  {/if}

  <!-- Results count -->
  <p class="result-count reveal">
    {filtered.length} article{filtered.length !== 1 ? 's' : ''}
    {selectedTag !== 'All' ? `tagged "${selectedTag}"` : ''}
    {searchQuery ? `matching "${searchQuery}"` : ''}
  </p>

  <!-- Featured post -->
  {#if featured}
    {@const post = featured}
    <article class="bf-featured reveal">
      <div class="bff-img">
        <img src={post.cover} alt={post.title} loading="lazy" />
        <div class="bff-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Featured
        </div>
      </div>
      <div class="bff-body">
        <div class="bff-meta">
          <span class="post-date">{post.date}</span>
          <span class="meta-dot">·</span>
          <span class="post-read">{post.readTime}</span>
        </div>
        <h2 class="bff-title">{post.title}</h2>
        <p class="bff-excerpt">{post.excerpt}</p>
        <div class="bff-tags">
          {#each post.tags as t}
            <button class="tag" on:click={() => selectedTag = t} data-hover>{t}</button>
          {/each}
        </div>
        <button class="btn-primary bff-cta" data-hover on:click={() => selectPost(post)}>
          Read Article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  {/if}

  <!-- Posts grid -->
  <div class="blog-posts-grid">
    {#each (filtered.length > 1 ? filtered.slice(1) : []) as post, i}
      <article class="post-card reveal reveal-delay-{(i % 3) + 1}" data-hover>
        <div class="pc-img">
          <img src={post.cover} alt={post.title} loading="lazy" />
        </div>
        <div class="pc-body">
          <div class="pc-meta">
            <span class="post-date">{post.date}</span>
            <span class="meta-dot">·</span>
            <span class="post-read">{post.readTime}</span>
          </div>
          <h3 class="pc-title">{post.title}</h3>
          <p class="pc-excerpt">{post.excerpt}</p>
          <div class="pc-tags">
            {#each post.tags as t}
              <button class="tag" on:click|stopPropagation={() => selectedTag = t} data-hover>{t}</button>
            {/each}
          </div>
          <button type="button" class="pc-read-more" on:click={() => selectPost(post)}>
            Read More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </article>
    {:else}
      <div class="no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <p>No articles found</p>
        <button class="btn-outline" on:click={() => { searchQuery = ''; selectedTag = 'All' }}>Clear filters</button>
      </div>
    {/each}
  </div>
</section>

<style>
  .blog-full {
    padding-bottom: 100px;
  }

  /* ── HEADER ── */
  .bf-page-header {
    padding: 60px 0 48px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
  }

  .bf-header-text { margin-bottom: 40px; }

  .inner-hero-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .inner-hero-label::before {
    content: '';
    width: 32px;
    height: 1px;
    background: var(--gold);
  }

  .inner-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 600;
    line-height: 1.1;
    color: var(--text-100);
    margin-bottom: 16px;
  }

  .inner-hero-title em { font-style: italic; color: var(--gold); }

  .bf-sub {
    font-size: 17px;
    color: var(--text-200);
    max-width: 540px;
    line-height: 1.7;
  }

  /* Controls */
  .bf-controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .search-wrap {
    position: relative;
    max-width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-300);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-100);
    font-family: var(--font-body);
    font-size: 14px;
    outline: none;
    transition: var(--trans-fast);
  }

  .search-input::placeholder { color: var(--text-400); }

  .search-input:focus {
    border-color: var(--gold-dim);
    box-shadow: 0 0 0 3px var(--gold-glow);
  }

  .tag-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-tag {
    padding: 6px 16px;
    border-radius: 100px;
    background: var(--bg-glass);
    border: 1px solid var(--border);
    color: var(--text-300);
    font-size: 12px;
    font-family: var(--font-mono);
    font-weight: 500;
    letter-spacing: 0.05em;
    transition: var(--trans-fast);
    cursor: none;
  }

  .filter-tag:hover {
    border-color: var(--gold-dim);
    color: var(--text-100);
  }

  .filter-tag.active {
    background: var(--gold-glow);
    border-color: var(--gold);
    color: var(--gold);
  }

  /* Result count */
  .result-count {
    font-size: 13px;
    font-family: var(--font-mono);
    color: var(--text-400);
    margin-bottom: 32px;
  }

  /* ── FEATURED ── */
  .bf-featured {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    background: var(--bg-card);
    border: 1px solid var(--border-gold);
    border-radius: var(--radius-xl);
    overflow: hidden;
    margin-bottom: 32px;
    transition: var(--trans-med);
  }

  .bf-featured:hover {
    box-shadow: var(--shadow-gold);
  }

  .bff-img {
    position: relative;
    min-height: 380px;
    overflow: hidden;
  }

  .bff-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.55) saturate(0.6);
    transition: var(--trans-slow);
  }

  .bf-featured:hover .bff-img img {
    transform: scale(1.04);
    filter: brightness(0.65) saturate(0.75);
  }

  .bff-badge {
    position: absolute;
    top: 20px; left: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: rgba(200,164,94,0.15);
    border: 1px solid var(--gold-dim);
    border-radius: 100px;
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--gold);
    backdrop-filter: blur(8px);
  }

  .bff-body {
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }

  .bff-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-300);
  }

  .meta-dot { color: var(--gold); }

  .bff-title {
    font-family: var(--font-display);
    font-size: 1.9rem;
    font-weight: 600;
    color: var(--text-100);
    line-height: 1.3;
  }

  .bff-excerpt {
    font-size: 15px;
    color: var(--text-200);
    line-height: 1.7;
  }

  .bff-tags { display: flex; flex-wrap: wrap; gap: 6px; }

  .bff-cta {
    margin-top: 8px;
    align-self: flex-start;
    padding: 10px 22px;
    font-size: 13px;
  }

  /* ── POSTS GRID ── */
  .blog-posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .post-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: var(--trans-med);
    cursor: pointer;
  }

  .post-card:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 4px;
  }

  .post-card:hover {
    border-color: var(--border-gold);
    transform: translateY(-4px);
    box-shadow: var(--shadow-gold);
  }

  .pc-img {
    height: 180px;
    overflow: hidden;
  }

  .pc-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.5) saturate(0.5);
    transition: var(--trans-slow);
  }

  .post-card:hover .pc-img img {
    transform: scale(1.04);
    filter: brightness(0.6) saturate(0.7);
  }

  .pc-body { padding: 28px; }

  .pc-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-300);
    margin-bottom: 12px;
  }

  .post-date, .post-read { color: var(--text-300); }

  .pc-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-100);
    line-height: 1.4;
    margin-bottom: 10px;
    transition: var(--trans-fast);
  }

  .post-card:hover .pc-title { color: var(--gold); }

  .pc-excerpt {
    font-size: 13px;
    color: var(--text-300);
    line-height: 1.7;
    margin-bottom: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }

  .pc-read-more {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-mono);
    color: var(--text-400);
    letter-spacing: 0.05em;
    transition: var(--trans-fast);
  }

  .post-card:hover .pc-read-more {
    color: var(--gold);
    gap: 10px;
  }

  /* No results */
  .no-results {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 0;
    color: var(--text-300);
    font-size: 15px;
  }

  /* Markdown URL Section */
  .md-url-section {
    margin-bottom: 48px;
    padding: 24px;
    background: var(--bg-200);
    border-radius: 8px;
    border: 1px solid var(--border);
  }

  .md-url-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .md-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-100);
  }

  .md-url-input {
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--bg-100);
    color: var(--text-100);
    font-size: 14px;
  }

  .md-url-input:focus {
    outline: none;
    border-color: var(--gold);
  }

  @media (max-width: 768px) {
    .bf-featured { grid-template-columns: 1fr; }
    .bff-img { min-height: 220px; }
    .bff-body { padding: 28px 24px; }
  }
</style>
