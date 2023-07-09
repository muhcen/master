import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../users/enum/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ObjectIdParam } from './decorators/objectID.decorator';
import { ObjectId } from 'mongodb';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    create(
        @Body() createProductDto: CreateProductDto,
        @Req() request: Request,
    ) {
        return this.productsService.create(createProductDto, request['user']);
    }

    @Get()
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    findAll(@Query() query) {
        try {
            return this.productsService.findAll(query);
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    @Get(':id')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    findOne(@ObjectIdParam('id') id: ObjectId) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @ObjectIdParam('id') id: ObjectId,
        @Body() updateProductDto: UpdateProductDto,
        @Req() request: Request,
    ) {
        console.log(updateProductDto);
        return this.productsService.update(
            id,
            updateProductDto,
            request['user'],
        );
    }

    @Delete(':id')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    remove(@ObjectIdParam('id') id: ObjectId, @Req() request: Request) {
        return this.productsService.remove(id, request['user']);
    }
}
