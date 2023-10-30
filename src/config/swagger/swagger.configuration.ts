import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.SG_TITLE,
  description: process.env.SG_DESCRIPTION,
  version: process.env.SG_VERSION,
  tag: process.env.SG_TAG,
  prefix: process.env.SG_PREFIX,
}));
