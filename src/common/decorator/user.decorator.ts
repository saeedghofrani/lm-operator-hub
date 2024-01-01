import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserInterface } from '../interfaces/user.interface'

/**
 * Custom param decorator to extract user information from the request.
 * @param data - Additional data if needed (not used in this example).
 * @param context - The Nest.js execution context.
 * @returns User information extracted from the request.
 */
export const GetUser = createParamDecorator(
    (data: any, context: ExecutionContext): UserInterface => {
        const request = context.switchToHttp().getRequest()
        const user: UserInterface = {
            user: request.user.user,
        }

        // Optional: Include role and permissions if available in the request.
        if (request.user.role) {
            user.role = request.user.role
        }
        if (request.user.permissions) {
            user.permissions = request.user.permissions
        }
        if (request.user.read) {
            user.read = request.user.read
        }

        return user
    },
)
