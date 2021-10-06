import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { NewProductSchema, ProductSchema } from './schema/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: NewProductSchema.name, schema: ProductSchema}])],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
