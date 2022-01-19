import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({type: String})
    username: string;
  
    @IsString()
    @ApiProperty({type: String})
    password: string;
}
