import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [RolesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
