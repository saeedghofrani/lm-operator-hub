import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class AppService {
    constructor(prismaService: PrismaService) {
        runMigrations(prismaService);
        runSeed(prismaService);
    }
    getHello(): string {
        return 'Hello World!';
    }
}
export const runMigrations = (
    prismaService: PrismaService,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Use Prisma CLI to run migrations
        const childProcess = require('child_process');
        const process = childProcess.spawn('npx', ['prisma', 'migrate', 'deploy'], {
            stdio: 'inherit',
        });

        process.on('close', code => {
            if (code === 0) {
                resolve('Migrations completed successfully');
            } else {
                reject(new Error(`Migrations failed with exit code: ${code}`));
            }
        });

        process.on('error', err => {
            reject(err);
        });
    });
};

// Modified runMigrations function to return a Promise
export const runSeed = (prismaService: PrismaService): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Use Prisma CLI to run migrations
        const childProcess = require('child_process');
        const process_second = childProcess.spawn(
            'npx',
            ['ts-node', './prisma/seed.ts'],
            {
                stdio: 'inherit',
            },
        );

        process_second.on('close', code => {
            if (code === 0) {
                resolve('seed completed successfully');
            } else {
                reject(new Error(`seed failed with exit code: ${code}`));
            }
        });

        process_second.on('error', err => {
            reject(err);
        });
    });
}
