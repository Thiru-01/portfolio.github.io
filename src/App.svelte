<script>
  import { layout } from './stores.js'
  import Cursor from './components/Cursor.svelte'
  import MultiPage from './layouts/MultiPage.svelte'
</script>

<Cursor />

<div class="app">
  <MultiPage />
</div>

<style>
  .app {
    transition: opacity 0.3s var(--ease-out);
  }

  .app.transitioning {
    opacity: 0;
    pointer-events: none;
  }
</style>
