import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";
import { WrapResponseInterceptor } from "./common/interceptors/wrap-response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // class-transformer will attempt conversion based on TS reflected type
      },
    })
  ); //Provides a validation rules for all incoming client payloads
  // app.useGlobalGuards(new ApiKeyGuard());
  // app.useGlobalFilters(new HttpExceptionFilter()); To handle the httpExceptions errors.
  // app.useGlobalInterceptors( //Interceptor that catch the time out error.
  //   new WrapResponseInterceptor(),
  //   new TimeoutInterceptor()
  // );
  await app.listen(3000);
}
bootstrap();
