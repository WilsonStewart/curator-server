import { db } from "@/db/database";
import { FileRepositories, Repositories, S3Repositories } from "@/db/db-types";
import { server } from "@/server";
import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";

server.get(
  "/repository/:id",
  async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
    return await db
      .selectFrom("repositories")
      .where("repositories.id", "=", req.params.id)
      .leftJoin(
        "file_repositories",
        "file_repositories.repository_id",
        "repositories.id"
      )
      .leftJoin(
        "s3_repositories",
        "s3_repositories.repository_id",
        "repositories.id"
      )
      .selectAll()
      .execute();
  }
);

server.get(
  "/repositories",
  async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
    return await db
      .selectFrom("repositories")
      .leftJoin(
        "file_repositories",
        "file_repositories.repository_id",
        "repositories.id"
      )
      .leftJoin(
        "s3_repositories",
        "s3_repositories.repository_id",
        "repositories.id"
      )
      .selectAll()
      .execute();
  }
);

server.post(
  "/repository",
  async (req: FastifyRequest<{ Body: INewRepository }>, res: FastifyReply) => {
    if (!req.body.repository.id) {
      req.body.repository.id = uuidv4();
    }
    await db.insertInto("repositories").values(req.body.repository).execute();

    switch (req.body.type) {
      case "file": {
        if (req.body.fileRepository) {
          req.body.fileRepository.repository_id = req.body.repository.id;
          await db
            .insertInto("file_repositories")
            .values(req.body.fileRepository)
            .execute();

          return { ...req.body.repository, ...req.body.fileRepository };
        }
      }

      case "s3": {
        if (req.body.s3Repository) {
          req.body.s3Repository.repository_id = req.body.repository.id;
          await db
            .insertInto("s3_repositories")
            .values(req.body.s3Repository)
            .execute();

          return { ...req.body.repository, ...req.body.s3Repository };
        }
      }
    }
  }
);

interface INewRepository {
  type: "file" | "s3";
  repository: Repositories;
  fileRepository?: FileRepositories;
  s3Repository?: S3Repositories;
}
