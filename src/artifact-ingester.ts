import { Queue } from "bullmq";
import { redisConnection } from "@/redis";
import { Artifacts } from "@/db/db-types";

export const QArtifactIngest = new Queue("artifact-ingest", {
  connection: redisConnection,
});

interface IIngestibleArtifact extends Artifacts {}

export async function ingestArtifact(artifact: IIngestibleArtifact) {}
