import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    mobile: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @IsInt()
    role_id: number;

    @IsOptional()
    @IsInt()
    organization_id: number;
}
