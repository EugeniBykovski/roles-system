import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // fid all roles
  public async findAll() {
    return this.prisma.role.findMany();
  }

  public async ensureRolesExist(roleIds: string[]) {
    const setRoleIds = Array.from(new Set(roleIds));

    const countOfRoles = await this.prisma.role.count({
      where: {
        id: {
          in: roleIds,
        },
      },
    });

    if (countOfRoles !== setRoleIds.length) {
      const existingRoles = await this.prisma.role.findMany({
        where: {
          id: {
            in: roleIds,
          },
        },
      });

      const existingIds = new Set(existingRoles.map((role) => role.id));
      const missing = setRoleIds.filter((id) => !existingIds.has(id));

      throw new Error(`Unknown role ids: ${missing.join(', ')}`);
    }
  }
}
