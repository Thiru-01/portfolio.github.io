<script>
  import { onMount } from 'svelte'
  import data from '../data/portfolio.json'

  let sectionEl
  let visible = false

  const categories = [...new Set(data.skills.map(s => s.category))]

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            visible = true
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionEl) observer.observe(sectionEl)
    return () => observer.disconnect()
  })
</script>

<section id="skills" class="section" bind:this={sectionEl}>
  <p class="section-label reveal">Capabilities</p>
  <h2 class="section-title reveal reveal-delay-1">My <em>Tech Stack</em></h2>
  <p class="skills-subtitle reveal reveal-delay-2">Technologies I work with on a daily basis</p>

  <!-- Icon grid -->
  <div class="skills-icon-grid reveal reveal-delay-2">
    {#each data.skills as skill, i}
      <div
        class="skill-icon-card"
        style="--i: {i}; --color: {skill.color}"
        title="{skill.name} — {skill.level}%"
        data-hover
      >
        <div class="skill-icon">
          <i class="{skill.icon} colored" style="color:{skill.color}"></i>
        </div>
        <span class="skill-name">{skill.name}</span>
        <div class="skill-bar-wrap">
          <div
            class="skill-bar"
            style="width: {visible ? skill.level : 0}%; background: {skill.color}; transition: width 1.2s {0.05 * i}s var(--ease-out)"
          ></div>
        </div>
        <span class="skill-pct">{skill.level}%</span>
      </div>
    {/each}
  </div>

  <!-- Categories breakdown -->
  <div class="categories-wrap reveal reveal-delay-3">
    {#each categories as cat}
      <div class="cat-group">
        <h4 class="cat-label">{cat}</h4>
        <div class="cat-skills">
          {#each data.skills.filter(s => s.category === cat) as skill}
            <div class="cat-skill-row">
              <div class="cat-skill-info">
                <i class="{skill.icon} colored" style="font-size:16px;color:{skill.color}"></i>
                <span class="cat-skill-name">{skill.name}</span>
              </div>
              <div class="cat-bar-wrap">
                <div
                  class="cat-bar"
                  style="width: {visible ? skill.level : 0}%; background: linear-gradient(90deg, {skill.color}88, {skill.color}); transition: width 1s {0.1}s var(--ease-out)"
                ></div>
              </div>
              <span class="cat-pct">{skill.level}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .skills-subtitle {
    color: var(--text-300);
    font-size: 16px;
    margin-bottom: 48px;
    margin-top: -8px;
  }

  /* ── ICON GRID ── */
  .skills-icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    margin-bottom: 64px;
  }

  .skill-icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px 16px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: var(--trans-med);
    position: relative;
    overflow: hidden;
  }

  .skill-icon-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, var(--color, var(--gold))18, transparent 70%);
    opacity: 0;
    transition: var(--trans-med);
  }

  .skill-icon-card:hover {
    border-color: var(--color, var(--gold-dim));
    transform: translateY(-4px);
  }

  .skill-icon-card:hover::before { opacity: 1; }

  .skill-icon {
    font-size: 32px;
    height: 40px;
    display: flex;
    align-items: center;
    filter: drop-shadow(0 4px 12px var(--color, transparent));
  }

  .skill-name {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-200);
    letter-spacing: 0.03em;
  }

  .skill-bar-wrap {
    width: 100%;
    height: 3px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
  }

  .skill-bar {
    height: 100%;
    border-radius: 3px;
  }

  .skill-pct {
    font-size: 10px;
    font-family: var(--font-mono);
    color: var(--text-400);
  }

  /* ── CATEGORIES ── */
  .categories-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
  }

  .cat-group {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
  }

  .cat-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .cat-skills { display: flex; flex-direction: column; gap: 14px; }

  .cat-skill-row {
    display: grid;
    grid-template-columns: 140px 1fr 32px;
    align-items: center;
    gap: 12px;
  }

  .cat-skill-info {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
  }

  .cat-skill-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-200);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cat-bar-wrap {
    height: 4px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
  }

  .cat-bar {
    height: 100%;
    border-radius: 4px;
  }

  .cat-pct {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-400);
    text-align: right;
  }
</style>
