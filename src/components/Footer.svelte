<script>
  import data from '../data/portfolio.json'
  const year = new Date().getFullYear()
</script>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-left">
      <span class="footer-name">{data.personal.name}</span>
      <span class="footer-copy">© {year} — All rights reserved</span>
    </div>
    <div class="footer-links">
      <a href={data.personal.github}   target="_blank" data-hover>GitHub</a>
      <a href={data.personal.linkedin} target="_blank" data-hover>LinkedIn</a>
      <a href="mailto:{data.personal.email}" data-hover>Email</a>
    </div>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border);
    padding: 28px 0;
    margin-top: auto;
  }

  .footer-inner {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0 48px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .footer-name {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 600;
    color: var(--text-100);
  }

  .footer-copy {
    font-size: 12px;
    color: var(--text-400);
    font-family: var(--font-mono);
  }

  .footer-links {
    display: flex;
    gap: 24px;
    margin: 0 auto;
  }

  .footer-links a {
    font-size: 13px;
    color: var(--text-300);
    transition: var(--trans-fast);
  }

  .footer-links a:hover { color: var(--gold); }

  .footer-right {
    font-size: 12px;
    color: var(--text-400);
    font-family: var(--font-mono);
  }

  .heart { color: #e25555; }
</style>
