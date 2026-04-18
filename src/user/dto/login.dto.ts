import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'naveen@gmail.com', description: 'Email address of the user' })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({ example: '********', description: 'Password for the user' })
    @IsString()
    @MinLength(6)
    password: string;
}