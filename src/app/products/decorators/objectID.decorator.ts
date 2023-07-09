import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

export const ObjectIdParam = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const id = request.params[data];
        if (!ObjectId.isValid(id))
            throw new BadRequestException('id is not valid mongoDB ObjectID.');
        else return new ObjectId(id);
    },
);
