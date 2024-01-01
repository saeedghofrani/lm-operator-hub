import { Injectable } from '@nestjs/common'
import { $Enums } from '@prisma/client'

@Injectable()
export class PermissionCache {
    private cache: Map<string, { id: number; read: $Enums.ReadAccess }> =
        new Map()

    // Cache a permission result with a given key
    cachePermissionResult(
        key: string,
        permissionId: { id: number; read: $Enums.ReadAccess },
    ): void {
        this.cache.set(key, permissionId)
    }

    // Retrieve a cached permission result
    getPermissionResult(
        key: string,
    ): { id: number; read: $Enums.ReadAccess } | undefined {
        return this.cache.get(key)
    }

    // Clear the entire cache
    clearCache(): void {
        this.cache.clear()
    }
}
