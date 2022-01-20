import { Body, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';

@Controller('auth')
@UsePipes(new ValidationPipe())
// @ApiBearerAuth()
export class AuthController {

    constructor(private authService:AuthService){

    }

    @Post('login')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor(''))
    async login(@Body() loginDto: AuthLoginDto){
        // console.log(loginDto)
        const user = await this.authService.validateUser(loginDto);
        // console.log(user)
        if(user) return this.authService.login(user);
        else return false;
    }
}
