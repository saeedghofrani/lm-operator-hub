import { CreateRouteDto } from 'src/api/route/dto/create-route.dto';
import api from '../swagger-spec.json';
import { PrismaClient, RequestMethod } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const superAdminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'super admin',
        }
    });
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
        }
    });
    const superUserRole = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
            name: 'super user',
            default: true
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
    await prisma.user.upsert({
        where: { email: 'sa.ghofraniivari@gmail.com' },
        update: {},
        create: {
            email: 'sa.ghofraniivari@gmail.com',
            password: '$2y$10$T2VabCQ5yWGtrp3yOjDKl.xNyK6tjn6ngWzA2zBLJ9A6oaJy9N7mu',
            username: 'saeed',
            roles: {
                create: [{
                    role: { connect: { id: superAdminRole.id } }
                },
                {
                    role: { connect: { id: adminRole.id } }
                }]
            }
        }
    });
    const paths = api.paths; // Extract the paths from your OpenAPI JSON
    let routes: CreateRouteDto[] = [];
    // Loop through the paths and create records in the Route model
    for (const path in paths) {
        const pathDetails = paths[path];
        const methodNames = Object.keys(pathDetails);

        // Loop through the HTTP methods for each path
        for (const method of methodNames) {
            const routeAddress = path;
            const routeMethod = RequestMethod[method.toUpperCase()];
            const routeDescription = pathDetails[method].summary || '';

            // Create a record in the Prisma Route model
            routes.push({
                address: routeAddress,
                method: routeMethod,
                description: routeDescription,
            });
        }
    }
    await prisma.route.createMany({
        data: routes
    });
    const route = await prisma.route.findMany({
        select: {
            id: true
        }
    })
    await prisma.permission.create(
        {
            data: {
                name: 'masterAccess',
                roles: {
                    connect: {
                        id: adminRole.id
                    }
                },
                routes: {
                    connect: route
                }
            }
        }
    )
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