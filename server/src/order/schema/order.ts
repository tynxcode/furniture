import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Document & NewOrderSchema

@Schema()
export class NewOrderSchema {
    @Prop({ required: true })
    code: string

    @Prop({ type: Object, required: true })
    customer: {
        fullname: string,
        address: string,
        phone: string,
        email: string
    }

    @Prop({ default: [] })
    products: {
        product: {
            name: string,
            price: number,
            brand: string,
            discount: number
            image_path: string;
        },
        quantity: number,
        total_price: number
    }[]

    @Prop({ default: 0 })
    transport_fee: number

    @Prop({default: 'verifing'})
    status: string

    @Prop({ required: true })
    payment_amount: number

    @Prop({ required: true })
    purchase_time: Date
}

export const OrderSchema = SchemaFactory.createForClass(NewOrderSchema)