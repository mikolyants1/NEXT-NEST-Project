import { IsString, IsNotEmpty } from "class-validator";

export class CommBodyDto {
    @IsNotEmpty()
    @IsString()
    text:string;

    @IsNotEmpty()
    @IsString()
    author:string;
}