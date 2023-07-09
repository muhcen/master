import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductRepository } from './product.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
