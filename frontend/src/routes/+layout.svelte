<nav>
  <span>Code containers</span>
  <a href="/new">Add Container</a>
</nav>

<slot />

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
    width: 100%;
    background: #222;
    color: #fff;
    padding: 1rem 2rem;
    box-sizing: border-box;
  }

  nav > span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  nav > a {
    background: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
  }

  nav > a:hover {
    background: #45a049;
  }
</style>
