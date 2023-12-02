import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_PERMISSION_KEY } from '../constant/public-permission.constant'

export const PublicPermission = () =>
    SetMetadata(IS_PUBLIC_PERMISSION_KEY, true)
