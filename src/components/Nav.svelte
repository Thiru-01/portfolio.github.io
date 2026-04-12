<script>
  import { layout, currentPage, activeSection } from '../stores.js'
  import data from '../data/portfolio.json'

  export let mode = 'sidebar' // 'sidebar' | 'topbar'

  const singleLinks = [
    { id: 'hero',       label: 'Home',       icon: '⌂' },
    { id: 'about',      label: 'About',      icon: '◎' },
    { id: 'experience', label: 'Experience', icon: '◈' },
    { id: 'projects',   label: 'Projects',   icon: '◆' },
    { id: 'skills',     label: 'Skills',     icon: '◉' },
    { id: 'blog',       label: 'Blog',       icon: '◐' },
  ]

  const multiLinks = [
    { id: 'home',       label: 'Home' },
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
    { id: 'skills',     label: 'Skills' },
    { id: 'blog',       label: 'Blog' },
  ]

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  function navigate(id) {
    currentPage.set(id)
  }

  let menuOpen = false
</script>

{#if mode === 'sidebar'}
<!-- ── SIDEBAR NAV ─────────────────────────────────────── -->
<nav class="sidebar">
  <div class="sidebar-logo">
    <span class="logo-initials">{data.personal.name.split(' ').map(n=>n[0]).join('')}</span>
    <div class="logo-info">
      <span class="logo-name">{data.personal.name}</span>
      <span class="logo-title">{data.personal.title}</span>
    </div>
  </div>

  <ul class="sidebar-links">
    {#each singleLinks as link}
      <li>
        <button
          class="sidebar-link"
          class:active={$activeSection === link.id}
          on:click={() => scrollTo(link.id)}
          data-hover
        >
          <span class="link-icon">{link.icon}</span>
          <span class="link-label">{link.label}</span>
          {#if $activeSection === link.id}
            <span class="link-indicator"></span>
          {/if}
        </button>
      </li>
    {/each}
  </ul>

  <div class="sidebar-socials">
    <a href={data.personal.github}   target="_blank" data-hover title="GitHub">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.392.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
    </a>
    <a href={data.personal.linkedin} target="_blank" data-hover title="LinkedIn">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    </a>
    <a href="mailto:{data.personal.email}" data-hover title="Email">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
    </a>
  </div>

  {#if data.personal.available}
    <div class="sidebar-status">
      <span class="status-dot"></span>
      Available for work
    </div>
  {/if}
</nav>

{:else}
<!-- ── TOP NAV ──────────────────────────────────────────── -->
<header class="topbar">
  <div class="topbar-inner">
    <button class="topbar-logo" on:click={() => navigate('home')} data-hover>
      <span class="logo-initials sm">{data.personal.name.split(' ').map(n=>n[0]).join('')}</span>
      <span class="topbar-name">{data.personal.name}</span>
    </button>

    <!-- Desktop links -->
    <nav class="topbar-links" aria-label="Main navigation">
      {#each multiLinks as link}
        <button
          class="topbar-link"
          class:active={$currentPage === link.id}
          on:click={() => navigate(link.id)}
          data-hover
        >
          {link.label}
        </button>
      {/each}
    </nav>

    <!-- CTA -->
    <a href={data.personal.resume} class="btn-primary topbar-cta" data-hover>
      Resume
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>

    <!-- Mobile hamburger -->
    <button class="hamburger" on:click={() => menuOpen = !menuOpen} data-hover>
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
    </button>
  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div class="mobile-menu">
      {#each multiLinks as link}
        <button
          class="mobile-link"
          on:click={() => { navigate(link.id); menuOpen = false }}
          data-hover
        >
          {link.label}
        </button>
      {/each}
    </div>
  {/if}
</header>
{/if}

<style>
  /* ── SIDEBAR ────────────────── */
  .sidebar {
    position: fixed;
    top: 0; left: 0;
    width: var(--nav-w);
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 40px 24px;
    background: rgba(6,6,15,0.85);
    border-right: 1px solid var(--border);
    backdrop-filter: blur(20px);
    z-index: 100;
    overflow-y: auto;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 48px;
  }

  .logo-initials {
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: var(--bg-deep);
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  .logo-initials.sm {
    width: 36px; height: 36px;
    font-size: 13px;
  }

  .logo-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
  }

  .logo-name {
    font-weight: 700;
    font-size: 14px;
    color: var(--text-100);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .logo-title {
    font-size: 11px;
    color: var(--text-300);
    font-family: var(--font-mono);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sidebar-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .sidebar-link {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 11px 14px;
    border-radius: var(--radius-md);
    color: var(--text-300);
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    transition: var(--trans-fast);
    position: relative;
  }

  .sidebar-link:hover {
    background: var(--bg-glass);
    color: var(--text-100);
  }

  .sidebar-link.active {
    background: var(--gold-glow);
    color: var(--gold);
  }

  .link-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .link-indicator {
    position: absolute;
    right: 14px;
    width: 5px; height: 5px;
    background: var(--gold);
    border-radius: 50%;
  }

  .sidebar-socials {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }

  .sidebar-socials a {
    width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-300);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    transition: var(--trans-fast);
  }

  .sidebar-socials a svg { width: 14px; height: 14px; }

  .sidebar-socials a:hover {
    color: var(--gold);
    border-color: var(--gold-dim);
    background: var(--gold-glow);
  }

  .sidebar-status {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    font-size: 11px;
    font-family: var(--font-mono);
    color: #4ade80;
    opacity: 0.8;
  }

  .status-dot {
    width: 7px; height: 7px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse-green 2s infinite;
    flex-shrink: 0;
  }

  @keyframes pulse-green {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
    50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
  }

  /* ── TOPBAR ─────────────────── */
  .topbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(6,6,15,0.8);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px);
  }

  .topbar-inner {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0 32px;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .topbar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: auto;
  }

  .topbar-name {
    font-weight: 700;
    font-size: 15px;
    color: var(--text-100);
  }

  .topbar-links {
    display: flex;
    gap: 4px;
  }

  .topbar-link {
    padding: 8px 14px;
    color: var(--text-300);
    font-size: 14px;
    font-weight: 500;
    border-radius: var(--radius-sm);
    transition: var(--trans-fast);
  }

  .topbar-link:hover { color: var(--text-100); background: var(--bg-glass); }
  .topbar-link.active { color: var(--gold); }

  .topbar-cta {
    padding: 9px 20px;
    font-size: 13px;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
  }

  .hamburger span {
    display: block;
    width: 22px; height: 2px;
    background: var(--text-200);
    border-radius: 2px;
    transition: var(--trans-med);
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    padding: 16px 24px 24px;
    border-top: 1px solid var(--border);
    gap: 4px;
  }

  .mobile-link {
    text-align: left;
    padding: 12px 16px;
    color: var(--text-200);
    font-size: 15px;
    border-radius: var(--radius-sm);
    transition: var(--trans-fast);
  }

  .mobile-link:hover { background: var(--bg-glass); color: var(--text-100); }

  @media (max-width: 768px) {
    .topbar-links, .topbar-cta { display: none; }
    .hamburger { display: flex; }
    .mobile-menu { display: flex; }

    .sidebar { width: 80px; }
    .logo-info, .link-label, .sidebar-status, .logo-name, .logo-title { display: none; }
    .sidebar-logo { justify-content: center; margin-bottom: 32px; }
    .sidebar-link { justify-content: center; padding: 12px; }
    .sidebar-socials { flex-direction: column; align-items: center; }
  }
</style>
