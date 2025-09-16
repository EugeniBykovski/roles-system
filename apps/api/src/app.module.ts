import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, RolesModule, UsersModule],
})
export class AppModule {}
