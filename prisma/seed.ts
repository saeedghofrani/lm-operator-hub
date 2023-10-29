// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
        }
    });

    const userRole = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
            name: 'user',
            default: true
        }
    });

    // Create the user and associate the "admin" role
    const user = await prisma.user.upsert({
        where: { email: 'sa.ghofraniivari@gmail.com' },
        update: {},
        create: {
            email: 'sa.ghofraniivari@gmail.com',
            password: '123',
            username: 'saeed',
            roles: {
                create: [{
                    role: { connect: { id: userRole.id } }
                },
                {
                    role: { connect: { id: adminRole.id } }
                }]
            }
        }
    });

    console.log({ user, adminRole, userRole });
}

// Execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // Close Prisma Client at the end
        await prisma.$disconnect();
    });