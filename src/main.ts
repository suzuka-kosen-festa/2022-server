import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
      .setTitle('API List')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('API')
      .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   const prismaService = app.get(PrismaService);
   await prismaService.enableShutdownHooks(app);

   //TODO:環境変数化する
   await app.listen(7000);
}
bootstrap();
