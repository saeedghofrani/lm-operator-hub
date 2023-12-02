import { Logger } from '@nestjs/common'
import { resolve } from 'path'

/**
 * Get the path to the environment file based on the 'APP_MODE' environment variable.
 * @returns The resolved path to the environment file.
 */
export function getEnvPath(): string {
    // Define the path prefix where environment files are located.
    const prefix = 'src/common/envs'

    // Get the 'APP_MODE' environment variable, if available.
    const env: string | undefined = process.env.APP_MODE

    // Determine the filename based on the 'APP_MODE' or use 'development.env' as a default.
    const filename: string = env
        ? `${prefix}/${env}.env`
        : `${prefix}/development.env`

    Logger.warn(`Server is running on ${env}`, 'Running Server')
    // Resolve and return the full path to the environment file.
    return resolve(filename)
}
