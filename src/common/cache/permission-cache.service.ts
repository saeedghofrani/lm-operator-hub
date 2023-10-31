import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionCache {
    private cache: Map<string, number> = new Map();

    // Cache a permission result with a given key
    cachePermissionResult(key: string, permissionId: number): void {
        this.cache.set(key, permissionId);
    }

    // Retrieve a cached permission result
    getPermissionResult(key: string): number | undefined {
        return this.cache.get(key);
    }

    // Clear the entire cache
    clearCache(): void {
        this.cache.clear();
    }
}