<script lang="ts">
  import { onMount } from "svelte";

  let containers = [] as { name: string; status: string }[];

  onMount(async () => {
    const response = await fetch("/api/containers");
    containers = await response.json();
  });

  async function deleteContainer(id: string) {
    if (confirm("Are you sure you want to delete this container?")) {
      const deleteResp = await fetch(`/api/containers/${id}?force=true`, {
        method: "DELETE",
      });

      if (!deleteResp.ok) {
        alert("Failed to delete container");
        return;
      }

      // Refetch containers
      const response = await fetch("/api/containers");
      containers = await response.json();
    }
  }

  async function switchContainerPowerState(
    id: string,
    state: "start" | "stop" | "restart",
  ) {
    const response = await fetch(`/api/containers/${id}/${state}`, {
      method: "PUT",
    });

    if (!response.ok) {
      alert(`Failed to ${state} container`);
      return;
    }

    // Refetch containers
    const updatedResponse = await fetch("/api/containers");
    containers = await updatedResponse.json();
  }
</script>

Containers:
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each containers as container}
      <tr>
        <td>{container.name}</td>
        <td>{container.status}</td>
        <td>
          <button
            on:click={() => window.open(`//${container.name}.${location.host}`)}
          >
            Open container
          </button>
          <button on:click={() => deleteContainer(container.name)}>
            Delete
          </button>
          <button
            on:click={() =>
              switchContainerPowerState(container.name, "start")}
            disabled={container.status === "running"}
          >
            Start
          </button>
          <button
            on:click={() =>
              switchContainerPowerState(container.name, "stop")}
            disabled={container.status !== "running"}
          >
            Stop
          </button>
          <button
            on:click={() =>
              switchContainerPowerState(container.name, "restart")}
            disabled={container.status !== "running"}
          >
            Restart
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
  th {
    background: #f4f4f4;
  }
</style>
