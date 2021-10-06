import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { NewOrderSchema, OrderSchema } from './schema/order';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: NewOrderSchema.name, schema: OrderSchema}]),
    UserModule
  ],
  providers: [OrderResolver, OrderService]
})
export class OrderModule {}
