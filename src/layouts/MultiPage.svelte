<script>
  import { currentPage } from '../stores.js'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  import Nav from '../components/Nav.svelte'
  import Footer from '../components/Footer.svelte'
  import Hero from '../sections/Hero.svelte'
  import About from '../sections/About.svelte'
  import Experience from '../sections/Experience.svelte'
  import Projects from '../sections/Projects.svelte'
  import Skills from '../sections/Skills.svelte'
  import Blog from '../sections/Blog.svelte'
  import BlogFull from '../pages/BlogFull.svelte'

  // Trigger scroll reveal whenever page changes
  $: if ($currentPage) {
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible')
      })
      setTimeout(() => {
        setupObservers()
      }, 50)
    }, 10)
  }

  function setupObservers() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  }

  onMount(() => {
    setupObservers()
  })
</script>

<div class="multi-layout">
  <Nav mode="topbar" />

  <main class="multi-main">
    <div class="page-wrap" class:active={$currentPage === 'home'}>
      {#if $currentPage === 'home'}
        <div class="page-container hero-page">
          <Hero />
        </div>
      {/if}
    </div>

    {#if $currentPage === 'about'}
      <div class="page-container inner-page" in:fly>
        <div class="inner-hero">
          <p class="inner-hero-label">About Me</p>
          <h1 class="inner-hero-title">The person <em>behind the code</em></h1>
        </div>
        <About />
      </div>
    {/if}

    {#if $currentPage === 'experience'}
      <div class="page-container inner-page" in:fly>
        <div class="inner-hero">
          <p class="inner-hero-label">Work History</p>
          <h1 class="inner-hero-title">Places I've <em>Worked</em></h1>
        </div>
        <Experience />
      </div>
    {/if}

    {#if $currentPage === 'projects'}
      <div class="page-container inner-page" in:fly>
        <div class="inner-hero">
          <p class="inner-hero-label">Selected Work</p>
          <h1 class="inner-hero-title">Things I've <em>Built</em></h1>
        </div>
        <Projects />
      </div>
    {/if}

    {#if $currentPage === 'skills'}
      <div class="page-container inner-page" in:fly>
        <div class="inner-hero">
          <p class="inner-hero-label">Capabilities</p>
          <h1 class="inner-hero-title">My <em>Tech Stack</em></h1>
        </div>
        <Skills />
      </div>
    {/if}

    {#if $currentPage === 'blog'}
      <div class="page-container inner-page" in:fly>
        <BlogFull />
      </div>
    {/if}
  </main>

  <Footer />
</div>

<style>
  .multi-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 70px; /* topbar height */
  }

  .multi-main {
    flex: 1;
  }

  .page-container {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0 48px;
    animation: pageIn 0.4s var(--ease-out);
  }

  @keyframes pageIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-page {
    max-width: 100%;
    padding: 0;
  }

  .hero-page :global(.hero) {
    padding-left: calc((100vw - var(--content-max)) / 2 + 48px);
    padding-right: calc((100vw - var(--content-max)) / 2 + 48px);
  }

  .inner-page {
    padding-top: 60px;
  }

  /* Inner page hero banner */
  .inner-hero {
    margin-bottom: 0;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }

  .inner-hero::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -120px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
    pointer-events: none;
  }

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
  }

  .inner-hero-title em {
    font-style: italic;
    color: var(--gold);
  }

  /* Override section padding for inner pages */
  .inner-page :global(.section) {
    padding-top: 60px;
  }

  .inner-page :global(.section-label),
  .inner-page :global(.section-title) {
    display: none;
  }

  @media (max-width: 768px) {
    .page-container { padding: 0 20px; }
    .inner-page { padding-top: 40px; }
  }
</style>
