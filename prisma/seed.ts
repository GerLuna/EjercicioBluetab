import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  // Borra datos existentes para evitar duplicados al re-ejecutar
  await prisma.user.deleteMany({});

  // Crea nuevos usuarios
  await prisma.user.create({ data: { name: 'Alice' } });
  await prisma.user.create({ data: { name: 'Bob' } });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });