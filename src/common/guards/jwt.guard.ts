import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

export function UseJwtGuard() {
  return UseGuards(AuthGuard('jwt'));
}