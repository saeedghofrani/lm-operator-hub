import { $Enums } from '@prisma/client'

export interface UserInterface {
    user: number
    role?: number
    permissions?: number[]
    read?: $Enums.ReadAccess
}
