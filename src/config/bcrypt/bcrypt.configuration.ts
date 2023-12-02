import { registerAs } from '@nestjs/config'

export default registerAs('bcrypt', () => ({
    secret: process.env.BCRYPT_SALT_ROUNDS,
}))
