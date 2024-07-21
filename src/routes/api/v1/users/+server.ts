import { createUser, getAllUser } from "$lib/services/user.service";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const take = Math.max(parseInt(url.searchParams.get("take") ?? "NaN"), 1);
  const skip = Math.max(parseInt(url.searchParams.get("skip") ?? "NaN"), 0);

  if (isNaN(take) || isNaN(skip)) return json({
    success: false,
    error: 400,
    message: `take | skip is not a number`
  }, { status: 400 });

  return json({
    success: true,
    data: await getAllUser(take, skip)
  })
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json() as { name?: string; email?: string; password?: string; role?: string };

  if (!body.name || !body.email || !body.password || (body.role && !["admin", "buyer", "shoper"].includes(body.role))) return json({
    success: false,
    error: 400,
    message: `missing field`
  }, { status: 400 });

  await createUser({
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role as never
  });

  return json({
    success: true
  });
}
