import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){

    }

    @Post('login')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor(''))
    async login(@Body() loginDto: AuthLoginDto){
        // console.log(loginDto)
        const user =  this.authService.validateUser(loginDto);
// console.log(user)
        if(user) return this.authService.login(user);
        else return false;
    }
}
