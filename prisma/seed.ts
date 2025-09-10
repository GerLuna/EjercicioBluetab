import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
    ],
  });
}

main()
  .then(async () => {
    console.log('✅ Seed ejecutado correctamente');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
