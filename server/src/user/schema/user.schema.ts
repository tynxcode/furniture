import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = NewUserSchema & Document

@Schema()
export class NewUserSchema {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({required: true})
    email: string

    @Prop({required: true})
    address: string

    @Prop({ required: true })
    phone: string

    @Prop({ required: true })
    image_path: string

    @Prop({ required: true })
    fullname: string

    @Prop({default: []})
    orders: string[]

    @Prop({ default: Date() })
    created_date: Date

    @Prop({ default: ['user'] })
    roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(NewUserSchema)