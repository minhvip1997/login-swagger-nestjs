import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,private jwtService: JwtService) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const user = await this.userService.findOne(authLoginDto.username);
        console.log(authLoginDto.username)
        if(!await bcrypt.compare(authLoginDto.password, user.password)){
          throw new BadRequestException('invalid credentials');
        }
        // if (user && user.password === password) {
        //   const { password, ...result } = user;
        //   return { password, ...result };
        // }
        return user;
  }

  async login(user: any) {
    // console.log(user)
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
      // user
    };
  }
}
