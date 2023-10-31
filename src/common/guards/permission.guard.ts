import { CanActivate, ExecutionContext, ForbiddenException, Inject, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "src/api/permission/service/permission.service";
import { IS_PUBLIC_PERMISSION_KEY } from "../constant/public-permission.constant";

export class PermissionGuard implements CanActivate {
    private cache: Map<string, number> = new Map(); // Cache to store permission results

    constructor(
        @Inject(PermissionService) private permissionService: PermissionService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        let address: string = String(request.originalUrl).split('?')[0];
        const method = request.method;
        const permissions: number[] = request['user']['permissions'] || [];
        if (permissions.length < 1)
            throw new UnauthorizedException('you are not authorized');

        // Generate a unique cache key based on address and method
        const cacheKey = `${address}_${method}`;

        if (this.cache.has(cacheKey)) {
            const permissionId = this.cache.get(cacheKey);
            return permissions.includes(permissionId);
        }

        address = address.replace(/\/\d+/g, (match) => {
            const param = this.getPropertiesByValue(request.params, match.substring(1));
            return `/{${param[0]}}`
        });
        let permission = await this.permissionService.findByAddress(address, method);
        
        address = address.replace(/\/\d+/g, (match) => {
            const param = this.getPropertiesByValue(request.params, match.substring(1));
            return `/${param[0]}`
        });

        if (!permission) {
            throw new UnauthorizedException('you are not authorized');
        }

        const access = permissions.includes(permission.id);
        
        // Cache the result for future use
        this.cache.set(cacheKey, permission.id);

        if (!access) {
            throw new ForbiddenException('Forbidden resource');
        } else {
            return true;
        }
    }

    getPropertiesByValue(obj, valueToFind) {
        const keys = [];
        for (let key in obj) {
            if (obj[key] === valueToFind) {
                keys.push(key); // Store all keys associated with the value
            }
        }
        return keys;
    }
}