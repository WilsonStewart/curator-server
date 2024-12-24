import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("respositories")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("display_name", "varchar")
    .execute();

  await db.schema
    .createTable("fileRepositories")
    .addColumn("id", "uuid", (col) =>
      col.notNull().primaryKey().references("respositories.id")
    )
    .addColumn("path", "varchar", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("exhibits")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("eid", "uuid", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("artifacts")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("eid", "uuid", (col) => col.notNull().unique())
    .addColumn("display_name", "varchar")
    .execute();

  await db.schema
    .createTable("exhibitsArtifacts")
    .addColumn("exhibit", "integer", (col) =>
      col.notNull().references("exhibits.id")
    )
    .addColumn("artifact", "integer", (col) =>
      col.notNull().references("artifacts.id")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("exhibitsArtifacts").execute();
  await db.schema.dropTable("artifacts").execute();
  await db.schema.dropTable("exhibits").execute();
  await db.schema.dropTable("fileRepositories").execute();
  await db.schema.dropTable("respositories").execute();
}
