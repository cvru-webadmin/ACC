import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  AGENT = 'AGENT',
}

export class CreateUserDto {
  @ApiProperty({ example: 'Naveen Sharma', description: 'Full name of the user' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'naveen@gmail.com', description: 'Email address of the user' })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********', description: 'Password for the user' })
  @IsString()
  @MinLength(6)
  password: string;

   @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.AGENT,
    description: 'Role of the user',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
