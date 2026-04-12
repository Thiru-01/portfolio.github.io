<script>
  import { layout } from '../stores.js'

  function toggle() {
    layout.update(l => l === 'single' ? 'multi' : 'single')
  }
</script>

<div class="toggle-wrap">
  <button
    class="toggle-btn"
    on:click={toggle}
    title="Switch layout mode"
    data-hover
  >
    <span class="toggle-icon">
      {#if $layout === 'single'}
        <!-- Single page icon -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="14" height="3" rx="1" fill="currentColor" opacity="0.5"/>
          <rect x="1" y="6" width="14" height="3" rx="1" fill="currentColor" opacity="0.7"/>
          <rect x="1" y="11" width="14" height="3" rx="1" fill="currentColor"/>
        </svg>
      {:else}
        <!-- Multi page icon -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="14" rx="1" fill="currentColor" opacity="0.7"/>
          <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.5"/>
        </svg>
      {/if}
    </span>
    <span class="toggle-label">
      {$layout === 'single' ? 'Single Page' : 'Multi Page'}
    </span>
    <span class="toggle-switch">
      <span class="toggle-thumb" class:right={$layout === 'multi'}></span>
    </span>
  </button>
</div>

<style>
  .toggle-wrap {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 1000;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background: rgba(12,12,30,0.92);
    border: 1px solid var(--border-gold);
    border-radius: 100px;
    color: var(--text-200);
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
    backdrop-filter: blur(20px);
    transition: var(--trans-med);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px var(--border);
  }

  .toggle-btn:hover {
    color: var(--gold);
    border-color: var(--gold);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5), var(--shadow-gold);
  }

  .toggle-icon {
    color: var(--gold);
    display: flex;
    align-items: center;
  }

  .toggle-switch {
    width: 28px;
    height: 16px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    position: relative;
    flex-shrink: 0;
  }

  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    background: var(--gold);
    border-radius: 50%;
    transition: var(--trans-med);
  }

  .toggle-thumb.right {
    left: calc(100% - 12px);
  }
</style>
