import "dotenv/config";
import { defineConfig } from "prisma/config";

const isPrismaCommand = process.argv.some((arg) =>
  arg.includes("prisma")
);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: isPrismaCommand
      ? process.env["DIRECT_URL"]   // ✅ use 5432 for CLI
      : process.env["DATABASE_URL"], // ✅ use 6543 for app
  },
});