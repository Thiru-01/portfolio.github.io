<script>
  import { onMount, onDestroy } from 'svelte'

  let x = -100, y = -100
  let tx = -100, ty = -100
  let dot_x = -100, dot_y = -100
  let hovering = false
  let enabled = false
  let raf

  function lerp(a, b, n) { return a + (b - a) * n }

  function supportsCustomCursor() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }

  function onMove(e) {
    tx = e.clientX
    ty = e.clientY
  }

  function onEnter() { hovering = true }
  function onLeave() { hovering = false }

  function loop() {
    x = lerp(x, tx, 0.12)
    y = lerp(y, ty, 0.12)
    dot_x = lerp(dot_x, tx, 0.5)
    dot_y = lerp(dot_y, ty, 0.5)
    raf = requestAnimationFrame(loop)
  }

  onMount(() => {
    enabled = supportsCustomCursor()
    if (!enabled) return

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    loop()
  })

  onDestroy(() => {
    if (!enabled) return
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(raf)
  })
</script>

{#if enabled}
  <!-- Main ring cursor -->
  <div
    class="cursor-ring"
    class:hovering
    style="transform: translate({x - 20}px, {y - 20}px)"
  ></div>

  <!-- Small dot cursor -->
  <div
    class="cursor-dot"
    style="transform: translate({dot_x - 3}px, {dot_y - 3}px)"
  ></div>
{/if}

<style>
  .cursor-ring {
    position: fixed;
    top: 0; left: 0;
    width: 40px; height: 40px;
    border: 1.5px solid rgba(200,164,94,0.7);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: width 0.25s, height 0.25s, border-color 0.25s, background 0.25s;
    mix-blend-mode: exclusion;
  }
  .cursor-ring.hovering {
    width: 60px; height: 60px;
    border-color: rgba(200,164,94,1);
    background: rgba(200,164,94,0.08);
    margin: -10px; /* compensate size growth */
  }
  .cursor-dot {
    position: fixed;
    top: 0; left: 0;
    width: 6px; height: 6px;
    background: var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
  }
</style>
