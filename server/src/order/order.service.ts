import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { generateOrderCode } from 'src/order/code/orderCode';
import { NewOrderInput } from './dto/order.input';
import { Order } from './models/order';
import { NewOrderSchema, OrderDocument } from './schema/order';
import { User } from 'src/user/models/user.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(NewOrderSchema.name) private orderModel: Model<OrderDocument>,
        private userService: UserService
    ) { }

    async createOrder(user: User, order: NewOrderInput): Promise<Order> {
        try {
            const newOrder = new this.orderModel({
                ...order,
                code: generateOrderCode(),
                customer: {
                    fullname: user.fullname,
                    address: user.address,
                    phone: user.phone,
                    email: user.email
                },
                purchase_time: Date.now()
            })

            const { code } = newOrder
            await this.userService.addNewOrder(user._id, code)

            return await newOrder.save()
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOrderByCode(code: string): Promise<Order> {
        try {
            return await this.orderModel.findOne({code})
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getOrdersByCode(code: string[]): Promise<Order[]> {
        try {
            return await this.orderModel.find({code: {$in: code}})
            
        } catch (error) {
            throw new NotFoundException()
        }
    }
}
