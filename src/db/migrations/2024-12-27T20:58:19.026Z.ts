import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("repositories")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn("display_name", "varchar", (col) => col.unique())
    .execute();

  await db.schema
    .createTable("file_repositories")
    .addColumn("repository_id", "uuid", (col) =>
      col.notNull().primaryKey().references("repositories.id")
    )
    .addColumn("file_repo_path", "varchar", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("exhibits")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("eid", "uuid")
    .execute();

  await db.schema
    .createTable("artifacts")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("eid", "uuid")
    .addColumn("display_name", "varchar")
    .execute();

  await db.schema
    .createTable("exhibits_artifacts")
    .addColumn("exhibit", "integer", (col) =>
      col.notNull().references("exhibits.id")
    )
    .addColumn("artifact", "integer", (col) =>
      col.notNull().references("artifacts.id")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("exhibits_artifacts").execute();
  await db.schema.dropTable("artifacts").execute();
  await db.schema.dropTable("exhibits").execute();
  await db.schema.dropTable("file_repositories").execute();
  await db.schema.dropTable("repositories").execute();
}
