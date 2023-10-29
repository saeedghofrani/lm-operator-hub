// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // Create the "admin" role if it doesn't exist or fetch it if it does
    let role = await prisma.role.findFirst({
        where: { name: 'admin' },
    });

    if (!role) {
        role = await prisma.role.create({
            data: {
                name: 'admin',
            },
        });
    }

    // Create the user and associate the "admin" role
    const user = await prisma.user.create({
        data: {
            email: 'sa.ghofraniivari@gmail.com',
            password: '123',
            roles: {
                create: [{
                    role: { connect: { id: role.id } }
                }]
            }
        },
    });

    console.log({ user, role });
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