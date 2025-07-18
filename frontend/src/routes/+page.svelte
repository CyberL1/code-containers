<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

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
      invalidate("/api/containers");
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
    invalidate("/api/containers");
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
    {#each data.containers as container}
      <tr>
        <td>
          <a href={`//${container.name}.${location.host}`} target="_blank">
            {container.name}
          </a>
        </td>
        <td>{container.status}</td>
        <td>
          <button
            onclick={() => switchContainerPowerState(container.id, "start")}
            disabled={container.status === "running"}
          >
            Start
          </button>
          <button
            onclick={() => switchContainerPowerState(container.id, "stop")}
            disabled={container.status !== "running"}
          >
            Stop
          </button>
          <button
            onclick={() => switchContainerPowerState(container.id, "restart")}
            disabled={container.status !== "running"}
          >
            Restart
          </button>
          <button onclick={() => deleteContainer(container.id)}>Delete</button>
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
