import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecret } from './config/secret.jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '3600s' },
    })],
  providers: [
    AuthResolver, 
    JwtStrategy, 
    AuthService
  ]
})
export class AuthModule { }
