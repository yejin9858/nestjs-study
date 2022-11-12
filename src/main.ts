import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //앱 시작, 어플리케이션 생성, 5000번 포트에서 앱 모듈을 실행한다.
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
