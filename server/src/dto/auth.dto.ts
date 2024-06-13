import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    username:string;
}

export class AuthAccessDto {
    @IsString()
    @IsNotEmpty()
    check_pass:string;

    @IsString()
    @IsNotEmpty()
    check_name:string;

    @IsString()
    @IsNotEmpty()
    id:string;
}