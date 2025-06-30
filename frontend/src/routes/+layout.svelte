<style>
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f0f0f0;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }
</style>

<nav style="width: 100%; background: #222; color: #fff; padding: 1rem 2rem; box-sizing: border-box;">
  <span style="font-weight: bold; font-size: 1.2rem;">Code containers</span>
</nav>

<slot />
