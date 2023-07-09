import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from 'src/app/products/entities/product.entity';
import { Query } from './interface/query.interface';
import { seeder } from 'nestjs-seeder';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Payload } from '../auth/interface/payload.interface';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) {}

    create(createProductDto: CreateProductDto, user) {
        try {
            const userId = user.sub;
            const product = this.productRepository.create(
                createProductDto,
                userId,
            );
            return this.productRepository.save(product);
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }

    async findAll(query) {
        try {
            const take = Number(query.take) || 10;
            const page = Number(query.page) || 1;
            const skip = (page - 1) * take;
            const order = query.order && JSON.parse(query.order);
            const select = query.select && JSON.parse(query.select);

            let queryPaginate: Query = {
                take,
                skip,
            };

            if (order) queryPaginate.order = order;
            if (order) queryPaginate.select = select;

            const [result, total] = await this.productRepository.findAndCount(
                queryPaginate,
            );

            return {
                data: result,
                count: total,
            };
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }

    async findOne(id: ObjectId) {
        try {
            const product = await this.productRepository.findOne({
                where: { _id: id },
            });
            return product;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }

    async update(
        id: ObjectId,
        updateProductDto: UpdateProductDto,
        user: Payload,
    ): Promise<Product> {
        try {
            const product = await this.productRepository.findOne({
                _id: id,
                user: user.sub,
            });

            if (!product)
                throw new NotFoundException('product with this id not exists.');

            return this.productRepository.save({
                ...product,
                ...updateProductDto,
            });
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }

    async remove(id: ObjectId, user: Payload) {
        try {
            const product = await this.productRepository.findOne({
                where: { _id: id, user: user.sub },
            });

            console.log(product);
            if (!product)
                throw new NotFoundException('product with this id not exists.');

            await this.productRepository.remove(product._id);

            return {
                status: 204,
                message: 'product removed successfully.',
            };
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }
}
