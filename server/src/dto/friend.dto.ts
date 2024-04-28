import { IsNotEmpty, IsString } from "class-validator";
import { EFriendAction } from "src/enums/friend.enum";

export class FriendBodyDto {
   @IsString()
   @IsNotEmpty()
   friendId:string;

   @IsString()
   @IsNotEmpty()
   action:EFriendAction;
}