import { DB } from "@/db/db-types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
