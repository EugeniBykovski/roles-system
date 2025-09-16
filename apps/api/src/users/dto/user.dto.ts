import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class UserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ type: [RoleDto] })
  roles!: RoleDto[];
}
