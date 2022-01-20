import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { User } from './entities/user.entity';
import { RolesGuard } from './roles.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,RolesGuard,JwtAuthGuard,JwtStrategy,RolesGuard],
  exports: [UserService],
})
export class UserModule {}
