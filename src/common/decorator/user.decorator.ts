import { createParamDecorator } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';

export const GetUser = createParamDecorator((data, request): UserInterface => {
    const req = request.switchToHttp().getRequest();
    const user: UserInterface = {
        user: req.user.userId,
    };
    if (req.user.role) {
        user.role = req.user.role;
      }
    return user;
});
