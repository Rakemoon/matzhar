import {
    createUser,
    getAllUser,
    getUserByEmail,
} from "$lib/services/user.service";
import { waiting } from "$lib/util/promises";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { PostgresError } from "postgres";

export const GET: RequestHandler = async ({ url }) => {
    const take = Math.max(parseInt(url.searchParams.get("take") ?? "NaN"), 1);
    const skip = Math.max(parseInt(url.searchParams.get("skip") ?? "NaN"), 0);

    if (isNaN(take) || isNaN(skip))
        return json(
            {
                success: false,
                error: 400,
                message: `take | skip is not a number`,
            },
            { status: 400 },
        );

    return json({
        success: true,
        data: await getAllUser(take, skip),
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const body = (await request.json()) as {
        name?: string;
        email?: string;
        password?: string;
    };

    if (!body.email || !body.password)
        return json(
            {
                success: false,
                error: 400,
                message: `missing field`,
            },
            { status: 400 },
        );
    if (body.name) {
        const [err, _res] = await waiting<never[], PostgresError>(
            createUser({
                name: body.name,
                email: body.email,
                password: body.password,
            }),
        );

        if (err !== null && err.constraint_name === "users_email_unique") {
            return json({
                success: false,
                error: 400,
                message: `email already exists`,
            });
        }

        return json({
            success: true,
            result: _res,
        });
    } else {
        const [, res] = await waiting(getUserByEmail(body.email));
        if (!res)
            return json({
                success: false,
                error: 401,
                message: `email not found`,
            });
        if (res.password !== body.password)
            return json({
                success: false,
                error: 401,
                message: `password not match`,
            });
        return json({
            success: true,
            result: res.name,
        });
    }
};
