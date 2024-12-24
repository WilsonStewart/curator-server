import { db } from "@/db/database";
import { server } from "@/server";
import { FastifyRequest } from "fastify";
import { IArtifactPostBody } from "@/api/api-types";
import { v4 as uuidv4 } from "uuid";

// server.get(
//   "/artifact/:id",
//   async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
//     return db
//       .selectFrom("artifacts")
//       .where("id", "=", req.params.id)
//       .selectAll()
//       .execute();
//   }
// );

server.get("/artifacts", async (req, res) => {
  return db.selectFrom("artifacts").selectAll().execute();
});

server.post(
  "/artifact",
  async (req: FastifyRequest<{ Body: { eid: string } }>, res) => {
    req.body.eid = uuidv4();
    await db.insertInto("artifacts").values(req.body).execute();
  }
);
