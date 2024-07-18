import { databaseURL } from "$config";
import * as schema from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(databaseURL);

export const db = drizzle(client, { schema });
