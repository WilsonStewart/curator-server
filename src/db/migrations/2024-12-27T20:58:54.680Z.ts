import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("s3_repositories")
    .addColumn("repository_id", "uuid", (col) =>
      col.notNull().primaryKey().references("repositories.id")
    )
    .addColumn("s3_repo_provider", "integer")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("s3_repositories").execute();
}
