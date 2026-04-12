<script>
  import { onMount, tick } from 'svelte'
  import data from '../data/portfolio.json'

  const { personal } = data
  const visibleSkills = data.skills

  function randomBetween(min, max) {
    return min + Math.random() * (max - min)
  }

  function initialPillX(width) {
    const min = width * 0.60
    const max = width * 0.96
    return randomBetween(min, max)
  }

  function initialPillY(height) {
    const min = height * 0.12
    const max = height * 0.86
    return randomBetween(min, max)
  }

  const defaultWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const defaultHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  let pillStyles = visibleSkills.map(() => ({
    left: initialPillX(defaultWidth),
    top: initialPillY(defaultHeight)
  }))
  let pillRefs = []
  let resizeObserver

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
  }

  function checkOverlap(pill1, pill2, minDistance = 120) {
    const dx = pill1.left - pill2.left
    const dy = pill1.top - pill2.top
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < minDistance
  }

  function computePillPositions() {
    const container = document.querySelector('.hero-pills')
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight
    const total = visibleSkills.length

    const nextStyles = []
    const maxAttempts = 50

    for (let i = 0; i < total; i++) {
      let attempts = 0
      let position
      let hasOverlap = true

      while (hasOverlap && attempts < maxAttempts) {
        const targetX = initialPillX(width)
        const targetY = initialPillY(height)
        position = {
          left: clamp(targetX, 0, width),
          top: clamp(targetY, 0, height)
        }

        hasOverlap = nextStyles.some(existing => checkOverlap(position, existing))
        attempts++
      }

      // If we couldn't find a non-overlapping position, use the last attempted position
      nextStyles.push(position)
    }

    pillStyles = nextStyles
  }

  onMount(async () => {
    await tick()
    computePillPositions()
    const container = document.querySelector('.hero-pills')
    if (container) {
      resizeObserver = new ResizeObserver(computePillPositions)
      resizeObserver.observe(container)
    }

    typingInterval = setInterval(type, 85)

    return () => {
      resizeObserver?.disconnect()
      clearInterval(typingInterval)
    }
  })

  // Typing animation
  const words = ['Full Stack Engineer', 'Systems Engineer', 'Backend & Distributed Systems', 'Problem Solver']
  let wordIndex = 0
  let charIndex = 0
  let displayed = ''
  let deleting = false
  let typingInterval

  function type() {
    const current = words[wordIndex]
    if (!deleting) {
      displayed = current.slice(0, ++charIndex)
      if (charIndex === current.length) {
        deleting = true
        clearInterval(typingInterval)
        setTimeout(() => { typingInterval = setInterval(type, 60) }, 1800)
        return
      }
    } else {
      displayed = current.slice(0, --charIndex)
      if (charIndex === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
      }
    }
  }

  // Background gradient mesh
  let mx = 50, my = 50
  function onMouseMove(e) {
    mx = (e.clientX / window.innerWidth) * 100
    my = (e.clientY / window.innerHeight) * 100
  }

  function scrollDown() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<svelte:window on:mousemove={onMouseMove} />

<section id="hero" class="hero">
  <!-- Animated gradient bg -->
  <div
    class="hero-bg"
    style="background: radial-gradient(ellipse 80% 60% at {mx}% {my}%, rgba(200,164,94,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at {100-mx}% {100-my}%, rgba(94,139,200,0.05) 0%, transparent 60%)"
  ></div>

  <!-- Grid lines -->
  <div class="hero-grid"></div>

  <div class="hero-content">
    <!-- Status badge -->
    {#if personal.available}
      <div class="hero-badge reveal">
        <span class="badge-dot"></span>
        Open to opportunities
      </div>
    {/if}

    <!-- Main heading -->
    <h1 class="hero-title reveal reveal-delay-1">
      <span class="hero-greeting">Hello, I'm</span>
      <em class="hero-name">{personal.name}</em>
    </h1>

    <!-- Typing subtitle -->
    <div class="hero-typing reveal reveal-delay-2">
      <span class="typing-text">{displayed}</span><span class="typing-cursor">|</span>
    </div>

    <!-- Tagline -->
    <p class="hero-tagline reveal reveal-delay-3">{personal.tagline}</p>

    <!-- CTAs -->
    <div class="hero-actions reveal reveal-delay-4">
      <a href={personal.github} target="_blank" class="btn-primary" data-hover>
        View My Work
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="mailto:{personal.email}" class="btn-outline" data-hover>
        Get in Touch
      </a>
    </div>

    <!-- Stats row -->
    <div class="hero-stats reveal reveal-delay-5">
      {#each data.about.highlights as h}
        <div class="stat-item">
          <span class="stat-value">{h.value}</span>
          <span class="stat-label">{h.label}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Scroll indicator -->
  <button class="scroll-indicator" on:click={scrollDown} data-hover>
    <span class="scroll-text">Scroll</span>
    <span class="scroll-arrow">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </span>
  </button>

  <!-- Floating tech pills -->
  <div class="hero-pills" aria-hidden="true">
    {#each visibleSkills as skill, i}
      <div
        bind:this={pillRefs[i]}
        class="tech-pill"
        style="
          --delay: {i * 0.15}s;
          --left: {pillStyles[i]?.left ?? 0}px;
          --top: {pillStyles[i]?.top ?? 0}px;
        "
      >
        <i class="{skill.icon} colored" style="font-size:14px;color:{skill.color}"></i>
        {skill.name}
      </div>
    {/each}
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 80px 48px 80px 0;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background 0.1s;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(74,222,128,0.08);
    border: 1px solid rgba(74,222,128,0.25);
    border-radius: 100px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: #4ade80;
    margin-bottom: 28px;
  }

  .badge-dot {
    width: 6px; height: 6px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse-green 2s infinite;
  }

  @keyframes pulse-green {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
    50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
  }

  .hero-greeting {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    color: var(--text-300);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hero-name {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 0.95;
    background: linear-gradient(135deg, var(--text-100) 0%, var(--gold-light) 60%, var(--gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }

  .hero-typing {
    font-family: var(--font-mono);
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    color: var(--blue-light);
    margin-bottom: 24px;
    height: 2em;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .typing-cursor {
    animation: blink 1s step-end infinite;
    color: var(--gold);
  }

  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .hero-tagline {
    font-size: 18px;
    color: var(--text-200);
    line-height: 1.6;
    max-width: 520px;
    margin-bottom: 40px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 56px;
  }

  .hero-stats {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-value {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-300);
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--text-400);
    transition: var(--trans-fast);
  }

  .scroll-indicator:hover { color: var(--gold); }

  .scroll-text {
    font-size: 10px;
    font-family: var(--font-mono);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
  }

  .scroll-arrow {
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
  }

  /* Floating pills on right side */
  .hero-pills {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .tech-pill {
    position: absolute;
    left: var(--left, 0px);
    top: var(--top, 0px);
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-200);
    white-space: nowrap;
    animation: float 3s ease-in-out var(--delay, 0s) infinite alternate both;
    transition: left 0.25s ease, top 0.25s ease;
    backdrop-filter: blur(10px);
  }

  @keyframes float {
    0%   { transform: translateY(-50%) translateX(0); }
    100% { transform: translateY(-50%) translateX(-12px); }
  }

  @media (max-width: 900px) {
    .hero { padding: 80px 24px; }
    .hero-pills { display: none; }
    .scroll-indicator {
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
