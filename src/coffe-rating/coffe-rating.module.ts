import { Module } from "@nestjs/common";
import { CoffeesModule } from "src/coffees/coffees.module";
import { DatabaseModule } from "src/database/database.module";
import { CoffeRatingService } from "./coffe-rating.service";

@Module({
  imports: [
    DatabaseModule.register({
      // 👈 passing in dynamic values
      type: "postgres",
      host: "localhost",
      username: "postgres",
      password: "admin",
    }),
    CoffeesModule,
  ],
  providers: [CoffeRatingService],
})
export class CoffeRatingModule {}
