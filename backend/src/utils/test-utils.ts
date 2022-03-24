import { PrismaClient } from "@prisma/client";
import app from "./app";

export const createTestServer = () => {
  const prisma = new PrismaClient();

  const server = app();

  const internalConfig: { server: any } = {
    server: undefined,
  };

  beforeAll(async () => {
    internalConfig.server = await server.listen({ port: 8003 });

    await prisma.$connect();
  });

  afterAll(async () => {
    internalConfig.server.close();
    await prisma.$disconnect();
  });

  return {
    prisma,
    serverURL: `http://localhost:8003`,
  };
};
