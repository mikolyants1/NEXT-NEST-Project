import { IsNotEmpty, IsString } from "class-validator";
import { EInviteAction } from "src/enums/invite.enum";

export class InviteBodyDto {
    @IsString()
    @IsNotEmpty()
    recipient:string;
}

