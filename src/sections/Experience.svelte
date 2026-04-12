<script>
  import { onMount } from 'svelte'
  import data from '../data/portfolio.json'

  let sectionEl
  let activeExp = 0

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
</script>

<section id="experience" class="section" bind:this={sectionEl}>
  <p class="section-label reveal">Work History</p>
  <h2 class="section-title reveal reveal-delay-1">Where I've <em>Worked</em></h2>

  <div class="exp-layout reveal reveal-delay-2">
    <!-- Company tabs -->
    <div class="exp-tabs">
      {#each data.experience as exp, i}
        <button
          class="exp-tab"
          class:active={activeExp === i}
          on:click={() => activeExp = i}
          data-hover
        >
          <img
            src={exp.logo}
            alt={exp.company}
            class="tab-logo"
            on:error={(e) => e.target.style.display='none'}
          />
          <div class="tab-info">
            <span class="tab-company">{exp.company}</span>
            <span class="tab-period">{exp.period}</span>
          </div>
        </button>
      {/each}
    </div>

    <!-- Detail panel -->
    {#each data.experience as exp, i}
      {#if activeExp === i}
        <div class="exp-detail">
          <!-- Cover image -->
          <div class="exp-cover">
            <img src={exp.cover} alt={exp.company} loading="lazy" />
            <div class="exp-cover-overlay">
              <span class="exp-duration">{exp.duration}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="exp-content">
            <div class="exp-header">
              <div>
                <h3 class="exp-role">{exp.role}</h3>
                <p class="exp-company-name">{exp.company}</p>
              </div>
              <div class="exp-meta">
                <span class="meta-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {exp.period}
                </span>
                <span class="meta-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {exp.location}
                </span>
              </div>
            </div>

            <p class="exp-desc">{exp.description}</p>

            <!-- Achievements -->
            <ul class="exp-achievements">
              {#each exp.achievements as ach}
                <li>
                  <span class="ach-bullet">▹</span>
                  {ach}
                </li>
              {/each}
            </ul>

            <!-- Tech stack -->
            <div class="exp-tech">
              {#each exp.tech as t}
                <span class="tag">{t}</span>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</section>

<style>
  .exp-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 32px;
    margin-top: 48px;
    align-items: start;
  }

  /* ── TABS ── */
  .exp-tabs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: sticky;
    top: 24px;
  }

  .exp-tab {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    text-align: left;
    transition: var(--trans-med);
    background: transparent;
  }

  .exp-tab:hover {
    background: var(--bg-card);
    border-color: var(--border);
  }

  .exp-tab.active {
    background: var(--bg-card-hov);
    border-color: var(--border-gold);
    box-shadow: var(--shadow-gold);
  }

  .tab-logo {
    width: 44px; height: 44px;
    border-radius: var(--radius-sm);
    object-fit: cover;
    background: var(--bg-surface);
    flex-shrink: 0;
    border: 1px solid var(--border);
  }

  .tab-info { display: flex; flex-direction: column; gap: 3px; overflow: hidden; }
  .tab-company { font-weight: 600; font-size: 14px; color: var(--text-100); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tab-period { font-size: 11px; font-family: var(--font-mono); color: var(--text-300); }

  .exp-tab.active .tab-company { color: var(--gold); }

  /* ── DETAIL ── */
  .exp-detail {
    background: var(--bg-card);
    border: 1px solid var(--border-gold);
    border-radius: var(--radius-xl);
    overflow: hidden;
    animation: slideIn 0.35s var(--ease-out);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .exp-cover {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .exp-cover img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.5) saturate(0.7);
    transition: var(--trans-slow);
  }

  .exp-detail:hover .exp-cover img {
    transform: scale(1.04);
    filter: brightness(0.55) saturate(0.8);
  }

  .exp-cover-overlay {
    position: absolute;
    bottom: 16px; right: 16px;
    padding: 6px 14px;
    background: rgba(6,6,15,0.85);
    border: 1px solid var(--border-gold);
    border-radius: 100px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--gold);
    backdrop-filter: blur(8px);
  }

  .exp-content { padding: 32px; }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .exp-role {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--text-100);
    line-height: 1.2;
  }

  .exp-company-name {
    font-size: 14px;
    color: var(--gold);
    font-weight: 600;
    margin-top: 4px;
  }

  .exp-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-300);
  }

  .meta-item svg { color: var(--gold); flex-shrink: 0; }

  .exp-desc {
    font-size: 15px;
    color: var(--text-200);
    line-height: 1.8;
    margin-bottom: 24px;
  }

  .exp-achievements {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .exp-achievements li {
    display: flex;
    gap: 12px;
    font-size: 14px;
    color: var(--text-200);
    line-height: 1.6;
  }

  .ach-bullet {
    color: var(--gold);
    font-size: 16px;
    line-height: 1.5;
    flex-shrink: 0;
  }

  .exp-tech { display: flex; flex-wrap: wrap; gap: 8px; }

  @media (max-width: 768px) {
    .exp-layout { grid-template-columns: 1fr; }
    .exp-tabs { flex-direction: row; overflow-x: auto; position: static; padding-bottom: 4px; }
    .exp-tab { min-width: 160px; }
  }
</style>
