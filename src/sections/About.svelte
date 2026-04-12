<script>
  import { onMount } from 'svelte'
  import data from '../data/portfolio.json'

  const { personal, about } = data

  let sectionEl
  let countersStarted = false

  // Animated count-up for highlight numbers
  function animateCounters() {
    if (countersStarted) return
    countersStarted = true
    // handled in CSS via animation
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
            animateCounters()
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionEl) observer.observe(sectionEl)
    return () => observer.disconnect()
  })
</script>

<section id="about" class="section about-section" bind:this={sectionEl}>
  <div class="about-inner">
    <!-- Left: Image + stats -->
    <div class="about-left reveal">
      <div class="avatar-wrap">
        <img src={personal.avatar} alt={personal.name} class="avatar-img" loading="lazy" />
        <div class="avatar-ring"></div>
        <div class="avatar-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {personal.location}
        </div>
      </div>

      <!-- Highlight stats -->
      <div class="stats-grid">
        {#each about.highlights as h}
          <div class="stat-card reveal">
            <span class="stat-val">{h.value}</span>
            <span class="stat-lbl">{h.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right: Text -->
    <div class="about-right">
      <p class="section-label reveal">About Me</p>
      <h2 class="section-title reveal reveal-delay-1">
        Passionate about <em>craft</em> &amp; code
      </h2>
      <p class="about-bio reveal reveal-delay-2">{about.bio}</p>
      <p class="about-bio reveal reveal-delay-3" style="margin-top:16px">{about.bio2}</p>

      <!-- Tech interests list -->
      <div class="interests reveal reveal-delay-4">
        {#each ['Clean Architecture', 'Design Systems', 'Developer Experience', 'Open Source', 'Performance', 'Accessibility'] as interest}
          <span class="tag">{interest}</span>
        {/each}
      </div>

      <div class="about-actions reveal reveal-delay-5">
        <a href="mailto:{personal.email}" class="btn-primary" data-hover>
          Say Hello
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
        <a href={personal.resume} download class="btn-outline" data-hover>Download CV</a>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section { padding: 120px 0; }

  .about-inner {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 80px;
    align-items: start;
  }

  /* ── LEFT ── */
  .about-left { display: flex; flex-direction: column; gap: 32px; }

  .avatar-wrap {
    position: relative;
    width: fit-content;
  }

  .avatar-img {
    width: 280px; height: 340px;
    object-fit: cover;
    border-radius: var(--radius-xl);
    filter: grayscale(20%) contrast(1.05);
    display: block;
  }

  .avatar-ring {
    position: absolute;
    inset: -8px;
    border-radius: calc(var(--radius-xl) + 8px);
    border: 1px solid var(--border-gold);
    pointer-events: none;
  }

  .avatar-badge {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: rgba(6,6,15,0.88);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-200);
    white-space: nowrap;
    backdrop-filter: blur(12px);
  }

  .avatar-badge svg { color: var(--gold); flex-shrink: 0; }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: var(--trans-med);
    text-align: center;
  }

  .stat-card:hover {
    border-color: var(--border-gold);
    background: var(--bg-card-hov);
  }

  .stat-val {
    display: block;
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-lbl {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-300);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* ── RIGHT ── */
  .about-bio {
    font-size: 16px;
    color: var(--text-200);
    line-height: 1.8;
  }

  .interests {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 28px 0 36px;
  }

  .about-actions { display: flex; gap: 16px; }

  @media (max-width: 900px) {
    .about-inner { grid-template-columns: 1fr; gap: 48px; }
    .avatar-img { width: 100%; height: 300px; }
    .about-left { align-items: center; }
  }
</style>
