import { Logger } from '@nestjs/common';
import { resolve } from 'path';

export function getEnvPath(): string {
  const prefix = 'src/common/envs';
  const env: string | 'development' = process.env.APP_MODE;
  const filename: string = `${prefix}/${env}.env`
  Logger.warn(`Server is running on ${env}`, 'Running Server')
  return resolve(`${filename}`);
}
