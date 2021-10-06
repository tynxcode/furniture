import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterProductsArgs, GetProductOptionsArgs } from './dto/product.args';
import { CreateProductInput, RatingProductInput, UpdateProductInput } from './dto/product.input';
import { Product } from './models/product.model';
import { NewProductSchema, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(NewProductSchema.name) private productModel: Model<ProductDocument>) { }

    async create(product: CreateProductInput): Promise<Product> {
        try {
            const newProduct = new this.productModel(product)
            return await newProduct.save()
        } catch (error) {
            throw new Error(error)
        }
    }

    async getShopProduct(filter: FilterProductsArgs, options: GetProductOptionsArgs): Promise<Product[]> {
        try {
            let conditions;

            if (filter.name) conditions = { ...conditions, name: { $regex: new RegExp(filter.name, 'i') } }
            if (filter.price) conditions = { ...conditions, price: { $lt: filter.price } }
            if (filter.category) conditions = { ...conditions, category: filter.category }

            const products = await this.productModel.find(conditions).limit(options.limit)
            return products
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getProductById(id: string): Promise<Product> {
        try {
            const product = await this.productModel.findById(id)

            if (!product) throw new NotFoundException()

            return product
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getLatestProduct(): Promise<Product> {
        try {
            const product = await this.productModel.find().sort({ create_date: -1 }).limit(1)
            if (!product) throw new NotFoundException()

            return product[0]
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getProductsByCategory(category: string, limit: number, skip: number): Promise<Product[]> {
        try {
            if (category == 'all') return await this.productModel.find().limit(limit).skip(skip)

            return await this.productModel.find({ category }).limit(limit).skip(skip)
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async ratingProduct(id: string, point: number): Promise<Product> {
        try {
            const product = await this.productModel.findById(id)
            const { review } = product
            let newRate = (review.review_point + point) / review.total
            const updatedProduct = await this.productModel.findByIdAndUpdate(id, { review: { review_point: newRate, total: review.total + 1 } })
            return updatedProduct
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(product: UpdateProductInput): Promise<Product> {
        try {
            const { id } = product

            const updatedProduct = await this.productModel.findByIdAndUpdate(id, product)
            return updatedProduct
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id: string): Promise<boolean> {
        try {
            await this.productModel.findByIdAndDelete(id)
            return true
        } catch (error) {
            throw new Error(error)
        }
    }
}
