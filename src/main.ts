import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 유효하지 않은 속성 체크
      forbidNonWhitelisted: false, // 정의되지 않은 속성 forbidden error
      transform: true, // 데이터 자동 변환
      disableErrorMessages: false, // 유효성 검사 오류 메시지 비활성화
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger 설정
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const options = new DocumentBuilder()
    .setTitle('Coinone Event API')
    .setDescription('Coinone Event API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);

  await app.listen(3000);
}
bootstrap();
