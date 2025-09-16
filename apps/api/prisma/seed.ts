import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const [admin, editor, viewer] = await Promise.all([
    prisma.role.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin' },
    }),
    prisma.role.upsert({
      where: { name: 'Editor' },
      update: {},
      create: { name: 'Editor' },
    }),
    prisma.role.upsert({
      where: { name: 'Viewer' },
      update: {},
      create: { name: 'Viewer' },
    }),
  ]);

  const user_1 = await prisma.user.upsert({
    where: { email: 'test_user_1@example.com' },
    update: {},
    create: { email: 'test_user_1@example.com', name: 'Kate' },
  });

  const user_2 = await prisma.user.upsert({
    where: { email: 'test_user_2@example.com' },
    update: {},
    create: { email: 'test_user_2@example.com', name: 'Alex' },
  });

  await prisma.userRole.createMany({
    data: [
      { userId: user_1.id, roleId: admin.id },
      { userId: user_1.id, roleId: editor.id },
      { userId: user_2.id, roleId: viewer.id },
    ],
    skipDuplicates: true,
  });
}

main().finally(async () => prisma.$disconnect());
