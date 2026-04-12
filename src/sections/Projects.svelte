<script>
  import { onMount } from 'svelte'
  import data from '../data/portfolio.json'

  let sectionEl

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionEl) observer.observe(sectionEl)
    return () => observer.disconnect()
  })

  // 3D tilt effect
  function handleTilt(e, card) {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-8px)`
  }

  function resetTilt(card) {
    card.style.transform = ''
  }
</script>

<section id="projects" class="section" bind:this={sectionEl}>
  <p class="section-label reveal">Selected Work</p>
  <h2 class="section-title reveal reveal-delay-1">Things I've <em>Built</em></h2>

  <!-- Featured projects (large cards) -->
  <div class="featured-grid">
    {#each data.projects.filter(p => p.featured) as project, i}
      <article
        class="project-featured reveal reveal-delay-{i+2}"
        on:mousemove={(e) => handleTilt(e, e.currentTarget)}
        on:mouseleave={(e) => resetTilt(e.currentTarget)}
        style="--accent: {project.accentColor}"
      >
        <div class="project-img-wrap">
          <img src={project.image} alt={project.title} loading="lazy" />
          <div class="project-img-overlay"></div>
        </div>

        <div class="project-body">
          <div class="project-tags">
            {#each project.tags.slice(0,3) as t}
              <span class="tag">{t}</span>
            {/each}
          </div>
          <h3 class="project-title">{project.title}</h3>
          <p class="project-subtitle">{project.subtitle}</p>
          <p class="project-desc">{project.description}</p>

          <div class="project-links">
            {#if project.live}
              <a href={project.live} target="_blank" class="btn-primary proj-btn" data-hover>
                Live Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            {/if}
            {#if project.github}
              <a href={project.github} target="_blank" class="btn-outline proj-btn" data-hover>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.392.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </a>
            {/if}
          </div>
        </div>

        <!-- Accent glow -->
        <div class="project-glow" style="background: radial-gradient(ellipse at 50% 100%, {project.accentColor}22, transparent 60%)"></div>
      </article>
    {/each}
  </div>

  <!-- Mini projects (smaller cards) -->
  <div class="mini-grid">
    {#each data.projects.filter(p => !p.featured) as project, i}
      <article
        class="project-mini reveal reveal-delay-{i+2}"
        on:mousemove={(e) => handleTilt(e, e.currentTarget)}
        on:mouseleave={(e) => resetTilt(e.currentTarget)}
        style="--accent: {project.accentColor}"
      >
        <div class="mini-top">
          <div class="mini-folder">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="mini-actions">
            {#if project.github}
              <a href={project.github} target="_blank" data-hover title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.392.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
            {/if}
            {#if project.live}
              <a href={project.live} target="_blank" data-hover title="Live">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            {/if}
          </div>
        </div>
        <h3 class="mini-title">{project.title}</h3>
        <p class="mini-sub">{project.subtitle}</p>
        <p class="mini-desc">{project.description}</p>
        <div class="mini-tags">
          {#each project.tags as t}
            <span class="tag">{t}</span>
          {/each}
        </div>
        <div class="mini-glow" style="background: radial-gradient(ellipse at 50% 100%, {project.accentColor}18, transparent 60%)"></div>
      </article>
    {/each}
  </div>
</section>

<style>
  /* ── FEATURED ── */
  .featured-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 48px;
    margin-bottom: 24px;
  }

  .project-featured {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
    transform-style: preserve-3d;
    cursor: default;
  }

  .project-featured:hover {
    border-color: var(--accent, var(--gold-dim));
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--accent, var(--gold-dim));
  }

  .project-img-wrap {
    position: relative;
    height: 220px;
    overflow: hidden;
  }

  .project-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.7) saturate(0.6);
    transition: var(--trans-slow);
  }

  .project-featured:hover .project-img-wrap img {
    filter: brightness(0.85) saturate(0.8);
    transform: scale(1.05);
  }

  .project-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 30%, var(--bg-card) 100%);
  }

  .project-body { padding: 28px; }

  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }

  .project-title {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--text-100);
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .project-subtitle {
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--accent, var(--gold));
    letter-spacing: 0.08em;
    margin-bottom: 14px;
  }

  .project-desc {
    font-size: 14px;
    color: var(--text-200);
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .project-links { display: flex; gap: 12px; }
  .proj-btn { padding: 10px 20px; font-size: 13px; }

  .project-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* ── MINI ── */
  .mini-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .project-mini {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
    transform-style: preserve-3d;
    cursor: default;
  }

  .project-mini:hover {
    border-color: rgba(200,164,94,0.3);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  }

  .mini-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .mini-folder { color: var(--accent, var(--gold)); }

  .mini-actions {
    display: flex;
    gap: 12px;
  }

  .mini-actions a {
    color: var(--text-300);
    transition: var(--trans-fast);
    display: flex;
  }

  .mini-actions a:hover { color: var(--text-100); }

  .mini-title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-100);
    margin-bottom: 4px;
  }

  .mini-sub {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--accent, var(--gold));
    margin-bottom: 12px;
    letter-spacing: 0.05em;
  }

  .mini-desc {
    font-size: 13px;
    color: var(--text-300);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .mini-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .mini-glow { position: absolute; inset: 0; pointer-events: none; }

  @media (max-width: 768px) {
    .featured-grid { grid-template-columns: 1fr; }
  }
</style>
