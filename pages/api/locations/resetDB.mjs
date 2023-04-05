import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.signup.deleteMany({});
  await prisma.houses.deleteMany({});
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Database reset complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
