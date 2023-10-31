import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  exp_h: process.env.JWT_EXP_H,
  exp_d: process.env.JWT_EXP_D,
}));
