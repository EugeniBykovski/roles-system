import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'List of our roles' })
  @ApiOkResponse({ description: 'All roles' })
  findAll() {
    return this.roles.findAll();
  }
}
