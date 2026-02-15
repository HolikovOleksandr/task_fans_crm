import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Name of the user',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'john@email.com',
    description: 'User email address',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '+380991112233',
    description: 'User phone number',
  })
  @IsString()
  readonly phone: string;

  @ApiProperty({
    example: '1998-05-21',
    description: 'Birth date in ISO format (YYYY-MM-DD)',
  })
  @IsDateString()
  readonly birthDate: string;
}
