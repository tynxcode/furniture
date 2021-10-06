import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    MongooseModule.forRoot(process.env.ATLAS_URL,
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
      }
    ),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql'
    }),
    UserModule,
    AuthModule,
    OrderModule
  ]
})
export class AppModule { }
