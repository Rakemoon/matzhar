<script lang="ts">
  import type { ActionData } from "./$types";
  let form: ActionData;
</script>

<h1>Regristasion</h1>
<div>
  <form method="POST" action="?/register">
    <label for="name">Name</label>
    <input type="text" name="name"/>
    <br />
    <label for="email">Email</label>
    <input type="email" name="email"/>
    <br />
    <label for="password">Password</label>
    <input type="password" name="password"/>
    <br />
    <button>Log in</button>
  </form>
</div>

{#if form?.succes}
  <h1>Form succes!</h1>
{/if}
