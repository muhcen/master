import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.use(
        session({
            secret: process.env.SESSION_SECRET_KEY,
            cookie: {
                httpOnly: true,
                secure: true,
            },
        }),
    );
    app.use(helmet());

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
        .setTitle('app api')
        .setDescription('The app API description')
        .setVersion('1.0')
        .addTag('app')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
