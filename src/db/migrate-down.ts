import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";
import { DB as Database } from "@/db/db-types";
import "dotenv/config";
import { Pool } from "pg";
import { promises as fs } from "fs";
import path from "path";

async function migrateDown() {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DB_CONNECTION_STRING,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: "/Users/wilson/reeps/curator-server/src/db/migrations",
    }),
  });

  const { error, results } = await migrator.migrateTo("0");

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateDown();
