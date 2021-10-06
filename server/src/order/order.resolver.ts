import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/guard/graphql.guard';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { User } from 'src/user/models/user.model';
import { NewOrderInput } from './dto/order.input';
import { Order } from './models/order';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(GraphQLGuard)
  @Query(() => Order)
  async getOrderByCode(@Args('code', { type: () => String }) code: string): Promise<Order> {
    return this.orderService.getOrderByCode(code)
  }

  @UseGuards(GraphQLGuard)
  @Query(() => [Order])
  async getOrdersByCode(@Args('code', { type: () => [String] }) code: string[]): Promise<Order[]> {
    return this.orderService.getOrdersByCode(code)
  }

  @UseGuards(GraphQLGuard)
  @Mutation(() => Order)
  async createOrder(@CurrentUser() user: User, @Args('order') order: NewOrderInput): Promise<Order> {
    return this.orderService.createOrder(user, order)
  }

}
