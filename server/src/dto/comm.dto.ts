import { OmitType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty, IsBoolean, IsObject, IsOptional } from "class-validator";

export class CommBodyDto {
  @IsNotEmpty()
  @IsString()
  text:string;

  @IsNotEmpty()
  @IsString()
  author:string;
}

export class UpdateCommDto extends OmitType(CommBodyDto,["author"]) {
  @IsBoolean()
  @IsOptional()
  was_update?:boolean;
}

export class CommCreateDto { 
  @IsString()
  @IsNotEmpty()
  id:string;

  @IsString()
  @IsNotEmpty()
  userId:string;

  @IsObject()
  @IsNotEmpty()
  body:CommBodyDto;
}
