import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { GraphQLGuard } from 'src/auth/guard/graphql.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { FilterProductsArgs, GetProductOptionsArgs } from './dto/product.args';
import { CreateProductInput, RatingProductInput, UpdateProductInput } from './dto/product.input';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  //QraphQL Query
  @Query(() => Product)
  async getProductById(@Args('id', { type: () => ID }) id: string): Promise<Product> {
    return await this.productService.getProductById(id)
  }

  @Query(()=> [Product])
  async getShopProducts(@Args() filter: FilterProductsArgs, @Args() options: GetProductOptionsArgs ): Promise<Product[]> {
    return this.productService.getShopProduct(filter, options)
  }

  @Query(() => Product)
  async getLatestProduct(): Promise<Product> {
    return await this.productService.getLatestProduct()
  }

  @Query(() => [Product])
  async getProductsByCategory(
    @Args('category', { type: () => String }) category: string,
    @Args('limit', { type: () => Int, defaultValue: 0, nullable: true}) limit: number,
    @Args('skip', { type: () => Int, defaultValue: 0, nullable: true }) skip: number
  ): Promise<Product[]> {
    return await this.productService.getProductsByCategory(category, limit, skip)
  }

  //GraphQL Mutation
  @UseGuards(GraphQLGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => Product)
  async createProduct(@Args('product') product: CreateProductInput): Promise<Product> {
    return await this.productService.create(product)
  }

  @UseGuards(GraphQLGuard)
  @Mutation(() => Product)
  async ratingProduct(@Args('id', { type: () => ID }) id: string, @Args('point', { type: () => Int }) point: number): Promise<Product> {
    return await this.productService.ratingProduct(id, point)
  }

  @UseGuards(GraphQLGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => Product)
  async updateProduct(@Args('product') product: UpdateProductInput): Promise<Product> {
    return await this.productService.updateProduct(product)
  }

  @UseGuards(GraphQLGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => Boolean)
  async deleteProduct(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return await this.productService.deleteProduct(id)
  }

}
