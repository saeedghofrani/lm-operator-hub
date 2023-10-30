import { PrismaClient, RequestMethod } from '@prisma/client';
import api from '../swagger-spec.json';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // Ensure roles exist in the database
    const roles = await ensureRolesExist();

    // Extract paths from the OpenAPI specification
    const paths = api.paths;

    // Convert OpenAPI paths into Route records
    const routes = createRouteRecords(paths);

    // Save the Route records to the database
    await prisma.route.createMany({ data: routes });

    // Retrieve the created routes
    const createdRoutes = await prisma.route.findMany({ select: { id: true } });

    // Create a permission (e.g., masterAccess) and associate it with the admin role
    await createAdminPermission(roles.adminRole, createdRoutes);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    // Close Prisma Client connection
    await prisma.$disconnect();
  }
}

async function ensureRolesExist() {
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'super admin' },
    update: {},
    create: { name: 'super admin' },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: { name: 'user', default: true },
  });

  const roles = { superAdminRole, adminRole, userRole };
  return roles;
}

function createRouteRecords(paths) {
  const routes = [];

  for (const path in paths) {
    const pathDetails = paths[path];
    const methodNames = Object.keys(pathDetails);

    for (const method of methodNames) {
      const routeAddress = path;
      const routeMethod = RequestMethod[method.toUpperCase()];
      const routeDescription = pathDetails[method].summary || '';

      routes.push({
        address: routeAddress,
        method: routeMethod,
        description: routeDescription,
      });
    }
  }

  return routes;
}

async function createAdminPermission(adminRole, createdRoutes) {
  const routeIds = createdRoutes.map((route) => ({ id: route.id }));

  await prisma.permission.create({
    data: {
      name: 'masterAccess',
      roles: { connect: { id: adminRole.id } },
      routes: { connect: routeIds },
    },
  });
}

// Execute the main function
main();