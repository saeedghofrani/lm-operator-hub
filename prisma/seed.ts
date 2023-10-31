import { $Enums, PrismaClient, RequestMethod, Role, Route } from '@prisma/client';
import api from '../swagger-spec.json';
import * as bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // Ensure roles exist in the database
    const roles = await ensureRolesExist();

    await createUser(roles);
    // Extract paths from the OpenAPI specification
    const paths = api.paths;

    // Convert OpenAPI paths into Route records
    const routes = createRouteRecords(paths);

    // Save the Route records to the database
    await prisma.route.createMany({ data: routes });

    // Retrieve the created routes
    const createdRoutes = await prisma.route.findMany({ });
    
    // Create a permission (e.g., masterAccess) and associate it with the admin role
    await createAdminPermission(roles, createdRoutes);
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

function filterRoutes(createdRoutes:Route[], condition) {
  return createdRoutes.filter(condition).map((route) => ({ id: route.id }));
}

async function createAdminPermission(roles: { superAdminRole: Role, adminRole: Role, userRole: Role }, createdRoutes: Route[]) {
  const routeIds = createdRoutes.map((route) => ({ id: route.id }));
  const loginRoutes = filterRoutes(createdRoutes, (item: Route) => item.address.includes('login'));
  const orderRoute = filterRoutes(createdRoutes, (item: Route) => {
    if (item.address === '/api/v1/order' && item.method === $Enums.RequestMethod.GET)
      return item
  });
  const readApiRoutes = filterRoutes(createdRoutes, (item: Route) => {
    if (item.method === $Enums.RequestMethod.GET && item.address !== '/api/v1/order')
      return item;
  });

  await prisma.permission.upsert({
    where: { name: 'masterAccess' },
    update: {},
    create: {
      name: 'masterAccess',
      read: $Enums.ReadAccess.ANY,
      roles: { connect: { id: roles.superAdminRole.id } },
      routes: { connect: routeIds },
    },
  });

  await prisma.permission.upsert({
    where: { name: 'restrictedAccess' },
    update: {},
    create: {
      name: 'restrictedAccess',
      read: $Enums.ReadAccess.OWN,
      roles: { connect: { id: roles.userRole.id } },
      routes: { connect: readApiRoutes.concat(loginRoutes) },
    },
  });

  await prisma.permission.upsert({
    where: { name: 'orderAccess' },
    update: {},
    create: {
      name: 'orderAccess',
      read: $Enums.ReadAccess.OWN,
      roles: { connect: { id: roles.adminRole.id } },
      routes: { connect: orderRoute },
    },
  });
}

async function createUser(roles: { superAdminRole: Role, adminRole: Role, userRole: Role }) {
  // Create the user and associate the "admin" role
  const password = await bcrypt.hash("123", 10)
  await prisma.user.upsert({
    where: { email: 'superAdmin@gmail.com' },
    update: {},
    create: {
      email: 'superAdmins@gmail.com',
      password,
      username: 'superAdmins',
      roles: {
        create: [{
          role: { connect: { id: roles.superAdminRole.id } }
        }]
      }
    }
  });
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password,
      username: 'admin',
      roles: {
        create: [{
          role: { connect: { id: roles.adminRole.id } }
        }]
      }
    }
  });
  await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      password,
      username: 'user',
      roles: {
        create: [{
          role: { connect: { id: roles.userRole.id } }
        },
        {
          role: { connect: { id: roles.adminRole.id } }
        }
      ]
      }
    }
  });
}

// Execute the main function
main();