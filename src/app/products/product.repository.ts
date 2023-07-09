import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { Product } from './entities/product.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ObjectId } from 'mongodb';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository
    extends BaseAbstractRepository<Product>
    implements BaseInterfaceRepository<Product>
{
    findAndCount(query) {
        return this.productRepository.findAndCount(query);
    }
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
        super(productRepository);
    }

    create(product: CreateProductDto, userId): Product {
        try {
            return this.productRepository.create({ ...product, user: userId });
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    // async findOneAndUpdate(
    //     id: ObjectId,
    //     updateProductDto: UpdateProductDto,
    //     user: any,
    // ) {
    //     try {
    //         const product = await this.productRepository.fin(
    //             id,
    //             updateProductDto,
    //         );

    //         return product;
    //     } catch (error) {
    //         console.log(error);
    //         throw new BadRequestException(error);
    //     }
    // }
}
