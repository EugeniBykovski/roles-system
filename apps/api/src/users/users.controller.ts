import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'List users',
    description: 'Can filter by role ID',
  })
  @ApiQuery({
    name: 'roleId',
    required: false,
    type: String,
    description: 'Filter by role ID',
  })
  @ApiOkResponse({ type: [UserDto] })
  findAll(@Query('roleId') roleId?: string) {
    return this.users.findAll(roleId);
  }

  // need to fix x-user-role header
  @Patch(':id/roles')
  @UseGuards(AdminGuard)
  @ApiHeader({
    name: 'x-admin',
    required: false,
    description: 'Set to "true" to act as admin',
  })
  @ApiHeader({
    name: 'x-user-role',
    required: false,
    description: 'Admin | Editor | Viewer',
  })
  @ApiOperation({ summary: 'Update roles for a user (if admin)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOkResponse({ type: UserDto, description: 'Updated user with roles' })
  @ApiBadRequestResponse({ description: 'Invalid role ids' })
  @ApiUnauthorizedResponse({
    description: 'Admin rights required to perform this action',
  })
  @ApiBearerAuth()
  updateRoles(@Param('id') id: string, @Body() dto: UpdateUserRolesDto) {
    return this.users.updateRoles(id, dto);
  }
}
