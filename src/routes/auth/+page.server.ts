import { db } from "$lib/database/connection";
import { users } from "$lib/database/schema";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { and, eq, sql } from "drizzle-orm";

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
            password: password as string,
        });

        console.log(await db.select().from(users));

        return { succes: true };
    },

    login: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) return fail(400, { succes: false });

        const result = await db
            .select({
                id: users.id,
                lowerName: sql<string>`lower(${users.name})`,
            })
            .from(users)
            .where(
                and(
                    eq(users.email, sql.placeholder("email")),
                    eq(users.password, sql.placeholder("password")),
                ),
            )
            .execute({ email, password });
        return { succes: true, result };
    },
};
