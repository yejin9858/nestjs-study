### Spring과 코드 비교

  

모듈 하나 하나가 스프링에선 User관련 코드, Post 관련 코드를 분리해놓은 느낌이다.

  

Spring 의 controller와 모양이 비슷하다.

```
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

  

@Controller()

export class AppController {

constructor(private readonly appService: AppService) {}

  

@Get()// "/"생략

getHello(): string {

return this.appService.getHello();

}

}
```

  

module에서 코드들을 등록하는 듯. (빈 등록, config 코드 느낌?)

```
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

  

@Module({

imports: [],

controllers: [AppController],

providers: [AppService], //등록이 되어있음

})

export class AppModule {}
```

  

Appication.java 재질

```
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

  

async function bootstrap() {

//앱 시작, 어플리케이션 생성, 5000번 포트에서 앱 모듈을 실행한다.

const app = await NestFactory.create(AppModule);

await app.listen(5000);

}

bootstrap();
```


### 프로젝트 초기화와 모듈 생성

- Contoller 생성
nestjs는 모듈 생성을 주로 명령어로 함
`nest g controller boards --no-spec`
이 안되면 [여기](https://hellcoding.tistory.com/entry/VSCode-%EC%98%A4%EB%A5%98-%EC%9D%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%A0-%EC%88%98-%EC%97%86%EC%9C%BC%EB%AF%80%EB%A1%9C) 참조
-> appmodule에 자동 추가, boards.controller.ts 생김
애노테이션을 데코레이터라고 말한다.

Provider - 종속성으로 주입
Controller <- Service

- Service 생성
`nest g service boards --no-spec`

private를 매개변수 안에 선언함 -> class 내부에서만 사용


### CRUD
- model 생성 : Spring의 entity
+ type정의 : kotiln처럼 return type을 정의해줄 수 있음. 이해가 쉽고 에러방지에 좋음


