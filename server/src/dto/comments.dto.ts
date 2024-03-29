import { IsArray, IsString, MinLength } from "class-validator";
import { CommentDto } from "./comment.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CommentsDto {
    @ApiProperty({
     type:String
    })
    @IsString()
    _id:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    @MinLength(1)
    name:string;

    @ApiProperty({
      type:String
    })
    @IsString()
    filmID:string;
    
    @ApiProperty({
     type:[CommentDto]
    })
    @IsArray()
    comm:CommentDto[]
}