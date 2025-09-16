import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../roles/roles.service';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private rolesService: RolesService,
  ) {}

  public async findAll(roleId?: string) {
    const users = await this.prisma.user.findMany({
      where: roleId
        ? {
            userRoles: {
              some: { roleId },
            },
          }
        : undefined,
      include: {
        userRoles: {
          include: { role: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      roles: u.userRoles.map((ur) => ({
        id: ur.role.id,
        name: ur.role.name,
      })),
    }));
  }

  public async findById(id: string) {
    const u = await this.prisma.user.findUnique({
      where: { id },
      include: { userRoles: { include: { role: true } } },
    });

    if (!u) throw new NotFoundException('User not found');

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      roles: u.userRoles.map((ur) => ({
        id: ur.role.id,
        name: ur.role.name,
      })),
    };
  }

  public async updateRoles(userId: string, dto: UpdateUserRolesDto) {
    await this.rolesService.ensureRolesExist(dto.roleIds).catch((e) => {
      throw new BadRequestException(e.message);
    });

    const exists = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!exists) throw new NotFoundException('User not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({ where: { userId } });

      if (dto.roleIds.length) {
        await tx.userRole.createMany({
          data: dto.roleIds.map((roleId) => ({ userId, roleId })),
        });
      }
    });

    return this.findById(userId);
  }
}
