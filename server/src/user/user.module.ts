import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { NewUserSchema, UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: NewUserSchema.name, schema: UserSchema}])],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
