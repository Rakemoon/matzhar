import { db } from "$lib/database/connection";
import { users } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export async function getAllUser(take: number, skip: number) {
  return db
    .select()
    .from(users)
    .limit(take)
    .offset(skip)
    .execute()
}

export async function getUserByID(id: string): Promise<typeof users.$inferSelect | undefined> {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .execute()
    .then(x => x[0]);
}

export async function createUser(data: typeof users.$inferInsert) {
  return db
    .insert(users)
    .values(data)
    .execute()
}

export async function updateUserByID(id: string, data: Partial<typeof users.$inferSelect>) {
  return db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .execute()
}

export async function deleteUser(id: string) {
  return db
    .delete(users)
    .where(eq(users.id, id))
    .execute();
}
