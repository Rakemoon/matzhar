import { db } from "$lib/database/connection";
import { users } from "$lib/database/schema";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    if (!name || !email || !password) return fail(400, { succes: false });

    await db.insert(users).values({
      name: name as string,
      email: email as string,
      password: password as string
    });

    console.log(await db.query.users.findMany());

    return { succes: true };
  }
}
