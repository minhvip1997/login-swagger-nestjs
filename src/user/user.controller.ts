import { Body, Controller, Delete, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditUserDto } from './dto/edit-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';

@Controller('user')

export class UserController {

    constructor(private readonly userService: UserService){}



    @Post('create')
    @ApiConsumes('multipart/form-data')
    // @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor(''))
    async createUser(@Body() dto: CreateUserDto): Promise<CreateUserDto>{
        // console.log(dto)
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const user = await this.userService.createUSer({
           ...dto,
            password: hashedPassword
        });
      
        delete user.password;
      
        return user;
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor(''))
    async updateUser(
        @Param('id') id:number,
        @Body() dto: EditUserDto
    ){
        const editdto ={username: dto?.username, password: dto?.password}
        console.log(id)
        console.log(editdto)
        const data = await this.userService.editOne(id, editdto);
        return {message: 'User edited', data};
    }

    @Delete(':id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor(''))
    async deleteOne(@Param('id') id:number){
        const data = await this.userService.deleteOne(id);
        return {
            message: 'User delete',
            data
        }
    }
}
