import { CanActivate, ExecutionContext, ForbiddenException, Inject, UnauthorizedException } from "@nestjs/common";
import { PermissionService } from "src/api/permission/service/permission.service";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_PERMISSION_KEY } from "../constant/public-permission.constant";

export class PermissionGuard implements CanActivate {
    constructor(
        @Inject(PermissionService) private permissionService: PermissionService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Check if the route is marked as public.
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const permissions: number[] = request['user']['permissions'] || [];

        // Ensure the user has permissions.
        if (permissions.length < 1) {
            throw new UnauthorizedException('You are not authorized');
        }

        let address: string = String(request.originalUrl).split('?')[0];
        const method = request.method;

        // Replace dynamic segments in the address with {param}.
        address = address.replace(/\/\d+/g, (match) => {
            const param = this.getPropertiesByValue(request.params, match.substring(1));
            return `/{${param[0]}}`;
        });

        let permission = await this.permissionService.findByAddress(address, method);

        // Restore the original address.
        address = address.replace(/\/\d+/g, (match) => {
            const param = this.getPropertiesByValue(request.params, match.substring(1));
            return `/${param[0]}`;
        });

        if (!permission) {
            throw new UnauthorizedException('You are not authorized');
        }

        const access = permissions.includes(permission.id);

        if (!access) {
            throw new ForbiddenException('Forbidden resource');
        }

        return true;
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