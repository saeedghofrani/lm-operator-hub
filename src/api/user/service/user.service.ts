import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { BaseService } from 'src/common/abstract/service.abstract'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserRepository } from '../repository/user.repository'
import { PasswordHasherService } from 'src/utilities/crypto/service/hash.service'
import { RoleService } from 'src/api/role/service/role.service'
import { LoginDto } from '../dto/login.dto'
import { PayloadJwtInterface } from 'src/common/interfaces/payload-jwt.interface'
import { JwtService } from '@nestjs/jwt'
import { RoleDto } from 'src/api/role/dto/role.dto'
import { PermissionService } from 'src/api/permission/service/permission.service'
import { UserInterface } from 'src/common/interfaces/user.interface'

@Injectable()
export class UserService extends BaseService<
    User,
    CreateUserDto,
    UpdateUserDto
> {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasherService,
        private roleService: RoleService,
        private jwtService: JwtService,
        private permissionService: PermissionService,
    ) {
        super(userRepository)
    }

    async create(createUserDto: CreateUserDto) {
        try {
            createUserDto.password = await this.passwordHasher.hashPassword(
                createUserDto.password,
            )
            createUserDto.roles = {
                create: [
                    {
                        role: {
                            connect: {
                                id: (await this.roleService.findDefaultRole())
                                    .id,
                            },
                        },
                    },
                ],
            }
            return this.userRepository.createUser(createUserDto)
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            return this.userRepository.findAllUser()
        } catch (error) {
            throw error
        }
    }

    async findOne(id: number, include?: Record<string, any>) {
        try {
            return this.userRepository.findOneUser(id, include)
        } catch (error) {
            throw error
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            updateUserDto.password = await this.passwordHasher.hashPassword(
                updateUserDto.password,
            )
            return this.userRepository.updateUser(id, updateUserDto)
        } catch (error) {
            throw error
        }
    }

    async addRole(id: number, roleId: number) {
        try {
            return this.userRepository.addRole(id, roleId)
        } catch (error) {
            throw error
        }
    }

    async login(loginDto: LoginDto) {
        try {
            const user = await this.userRepository.findByEmail(loginDto.email)
            if (!user) throw new BadRequestException('Username Does Not Exist')
            if (
                !(await this.passwordHasher.comparePasswords(
                    loginDto.password,
                    user.password,
                ))
            )
                throw new ForbiddenException(
                    'Username or Password is wrong ...!',
                )

            const payload: PayloadJwtInterface = {
                user: user.id,
            }
            const access_token = await this.jwtService.signAsync(payload)
            return {
                access_token,
                roles: [
                    ...user.roles.map((item) => {
                        return {
                            id: item.role.id,
                            name: item.role.name,
                        }
                    }),
                ],
            }
        } catch (error) {
            throw error
        }
    }

    async setRole(userInterface: UserInterface, roleId: number) {
        try {
            const user = await this.userRepository.findOneByRole(
                userInterface.user,
                roleId,
            )
            if (!user) throw new UnauthorizedException('permission denied')

            const permissions = await this.permissionService.findByRole(roleId)
            const payload: PayloadJwtInterface = {
                user: user.id,
                role: roleId,
                permissions: permissions.map((item) => item.id),
            }
            const access_token = await this.jwtService.signAsync(payload)
            return {
                access_token,
            }
        } catch (error) {
            throw error
        }
    }

    async remove(id: number) {
        try {
            return this.userRepository.removeUser(id)
        } catch (error) {
            throw error
        }
    }

    async pagination(paginationQueryDto: PaginationQueryDto) {
        try {
            if (paginationQueryDto.where) {
                let whereCondition = {
                    id: +paginationQueryDto.where.id || undefined,
                    email: paginationQueryDto.where.email,
                    name: paginationQueryDto.where.name,
                    roles: {
                        some: {
                            role: {
                                name: paginationQueryDto.where.role_name,
                            },
                        },
                    },
                }
                paginationQueryDto.where = whereCondition
            }
            return this.userRepository.pagination(paginationQueryDto)
        } catch (error) {
            throw error
        }
    }
}
