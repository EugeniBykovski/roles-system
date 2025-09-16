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
    const nextIds = Array.from(new Set((dto.roleIds ?? []).filter(Boolean)));

    try {
      await this.rolesService.ensureRolesExist(nextIds);
    } catch (e: any) {
      throw new BadRequestException(e?.message ?? 'Invalid role ids');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.$transaction(async (tx) => {
      const current = await tx.userRole.findMany({
        where: { userId },
        select: { roleId: true },
      });

      const currentIds = new Set(current.map((r) => r.roleId));
      const nextSet = new Set(nextIds);

      const toAdd = [...nextSet].filter((id) => !currentIds.has(id));
      const toRemove = [...currentIds].filter((id) => !nextSet.has(id));

      if (toRemove.length) {
        await tx.userRole.deleteMany({
          where: { userId, roleId: { in: toRemove } },
        });
      }

      if (toAdd.length) {
        await tx.userRole.createMany({
          data: toAdd.map((roleId) => ({ userId, roleId })),
          skipDuplicates: true,
        });
      }
    });

    return this.findById(userId);
  }
}
