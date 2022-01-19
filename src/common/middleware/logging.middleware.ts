import { Injectable, NestMiddleware } from "@nestjs/common";

//Middleware -> Funtion that is called before the route handler and any other building blocks are processed.
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time("Request-response time");
    console.log("Hi from middleware!");

    res.on("finish", () => console.timeEnd("Request-response time"));
    next();
  }
}
