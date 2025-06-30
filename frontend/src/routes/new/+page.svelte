<script>
  let name = "";

  async function handleSubmit() {
    const response = await fetch("/api/containers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: "example",
        name,
      }),
    });
    
    const json = await response.json();

    if (!response.ok) {
      alert(`Error: ${json.message}`);
      return;
    }

    window.location.href = "/";
    window.open(`//${json.name}.${location.host}`, "_blank");
  }
</script>

<div style="display: flex; justify-content: center;">
  <h1>Create New Code Container</h1>
</div>

<div style="display: flex; justify-content: center;">
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Name:
      <input type="text" bind:value={name} required />
    </label>
    <button type="submit">Create</button>
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin-top: 2rem;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    align-self: flex-start;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
