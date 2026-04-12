<script>
  import { onMount } from 'svelte'
  import data from '../data/portfolio.json'
  import { currentPage, layout } from '../stores.js'

  let sectionEl

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting)
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
        })
      },
      { threshold: 0.1 }
    )
    if (sectionEl) observer.observe(sectionEl)
    return () => observer.disconnect()
  })

  function viewAll() {
    if ($layout === 'multi') {
      currentPage.set('blog')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // already in blog section, scroll to it
    }
  }
</script>

<section id="blog" class="section" bind:this={sectionEl}>
  <div class="blog-header">
    <div>
      <p class="section-label reveal">Writing</p>
      <h2 class="section-title reveal reveal-delay-1">From the <em>Blog</em></h2>
    </div>
    <button class="btn-outline view-all-btn reveal reveal-delay-2" on:click={viewAll} data-hover>
      View All Posts
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>

  <!-- Featured post (first) -->
  {#if data.blog[0]}
    {@const post = data.blog[0]}
    <article class="blog-featured reveal reveal-delay-2">
      <div class="bf-img">
        <img src={post.cover} alt={post.title} loading="lazy" />
      </div>
      <div class="bf-body">
        <div class="bf-meta">
          <span class="post-date">{post.date}</span>
          <span class="meta-dot">·</span>
          <span class="post-read">{post.readTime}</span>
        </div>
        <h3 class="bf-title">{post.title}</h3>
        <p class="bf-excerpt">{post.excerpt}</p>
        <div class="bf-tags">
          {#each post.tags as t}
            <span class="tag">{t}</span>
          {/each}
        </div>
        <button class="btn-primary bf-read" data-hover>
          Read Article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  {/if}

  <!-- Other posts -->
  <div class="blog-grid">
    {#each data.blog.slice(1) as post, i}
      <article class="blog-card reveal reveal-delay-{i+3}" data-hover>
        <div class="bc-img">
          <img src={post.cover} alt={post.title} loading="lazy" />
        </div>
        <div class="bc-body">
          <div class="bc-meta">
            <span class="post-date">{post.date}</span>
            <span class="meta-dot">·</span>
            <span class="post-read">{post.readTime}</span>
          </div>
          <h4 class="bc-title">{post.title}</h4>
          <p class="bc-excerpt">{post.excerpt}</p>
          <div class="bc-tags">
            {#each post.tags.slice(0,2) as t}
              <span class="tag">{t}</span>
            {/each}
          </div>
        </div>
        <div class="bc-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .blog-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 48px;
    gap: 24px;
    flex-wrap: wrap;
  }

  .view-all-btn { padding: 11px 22px; font-size: 13px; }

  /* ── FEATURED POST ── */
  .blog-featured {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    margin-bottom: 24px;
    transition: var(--trans-med);
  }

  .blog-featured:hover {
    border-color: var(--border-gold);
    box-shadow: var(--shadow-gold);
  }

  .bf-img {
    overflow: hidden;
    min-height: 320px;
  }

  .bf-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.6) saturate(0.7);
    transition: var(--trans-slow);
  }

  .blog-featured:hover .bf-img img {
    transform: scale(1.04);
    filter: brightness(0.65) saturate(0.8);
  }

  .bf-body {
    padding: 44px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }

  .bf-meta, .bc-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-300);
  }

  .meta-dot { color: var(--gold); }

  .bf-title {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--text-100);
    line-height: 1.3;
  }

  .bf-excerpt, .bc-excerpt {
    font-size: 14px;
    color: var(--text-200);
    line-height: 1.7;
  }

  .bf-tags, .bc-tags { display: flex; flex-wrap: wrap; gap: 6px; }

  .bf-read { margin-top: 8px; align-self: flex-start; padding: 10px 22px; font-size: 13px; }

  /* ── GRID POSTS ── */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .blog-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: var(--trans-med);
    cursor: pointer;
    position: relative;
  }

  .blog-card:hover {
    border-color: var(--border-gold);
    transform: translateY(-4px);
    box-shadow: var(--shadow-gold);
  }

  .bc-img {
    height: 160px;
    overflow: hidden;
  }

  .bc-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.5) saturate(0.5);
    transition: var(--trans-slow);
  }

  .blog-card:hover .bc-img img {
    filter: brightness(0.6) saturate(0.7);
    transform: scale(1.04);
  }

  .bc-body { padding: 24px; }

  .bc-title {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-100);
    line-height: 1.4;
    margin: 10px 0 8px;
  }

  .bc-tags { margin-top: 14px; }

  .bc-arrow {
    position: absolute;
    bottom: 24px;
    right: 24px;
    color: var(--text-400);
    transition: var(--trans-fast);
    opacity: 0;
    transform: translateX(-8px);
  }

  .blog-card:hover .bc-arrow {
    opacity: 1;
    transform: translateX(0);
    color: var(--gold);
  }

  @media (max-width: 768px) {
    .blog-featured { grid-template-columns: 1fr; }
    .bf-img { min-height: 200px; }
  }
</style>
