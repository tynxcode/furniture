import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Document & NewProductSchema

@Schema()
export class NewProductSchema {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: '' })
    brand: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ required: true })
    image_path: string

    @Prop({ type: Object, default: { total: 0, review_point: 0 } })
    review: {
        total: number,
        review_point: number
    }

    @Prop({ default: 0 })
    discount: number

    @Prop({ required: true })
    category: string

    @Prop({ default: Date() })
    create_date: Date;

}

export const ProductSchema = SchemaFactory.createForClass(NewProductSchema);