import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsString } from 'class-validator';

export class UpdateUserRolesDto {
  @ApiProperty({
    type: [String],
    example: ['roleId1', 'roleId2'],
    description: 'Array of role IDs to assign to the user',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  roleIds!: string[];
}
