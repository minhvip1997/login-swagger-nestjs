

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Validate, validate } from "class-validator";
// import { IsUserAlreadyExist } from "../validate/unique.validate";



export class AuthLoginDto{
    @ApiProperty({type: String, description: "email"})
    @IsNotEmpty({ message: 'Username không được bỏ trống!' })
   username: string;

    @ApiProperty({type: String, description: "password",default:""})
    @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống!' })
    password: string
}


