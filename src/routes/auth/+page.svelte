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

<h1>login</h1>
<div>
  <form action="?/login" method="POST">
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

{#if form?.result?.length}
  <ul>
    <li>Name: {form.result[0].lowerName}</li>
    <li>Email: {form.result[0].id}</li>
  </ul>
{/if}
