import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Protocol } from "src/common/decorators/protocol.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { ParseIntPipe } from "src/common/pipes/parse-int.pipe";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@UsePipes(ValidationPipe)
@Controller("coffees") //between the parentheses we define the path, example: http://localhost:3000/coffees
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public() //Public decorator takes the login from src/common/decorators/public.decorator.ts, and we can access to this endpoint with out token authorization.
  @Get() //Again, between the parentheses we define the second path next of the first one http://localhost:3000/coffees/flavors
  async findAll(
    @Protocol("https") protocol: string,
    @Query() paginationQuery: PaginationQueryDto
  ) {
    console.log(protocol);
    //@Query Decoratos gets the queries of the url. Example http://localhost:3000/coffees?limit=20&offset=10
    // await new Promise((resolve) => setTimeout(resolve, 6000)); // setTimeout to testing the timeout.interceptor
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    //With the decorator @Param we can take parameters of the url
    const coffe = this.coffeesService.findOne(id);
    if (!coffe) {
      throw new NotFoundException(`Coffe ${id} not found`);
    }
    return coffe;
  }

  @Post()
  //@HttpCode(HttpStatus.GONE) //HttpCode decoratos allows us to set a specific status code for the entire response //HttpStatus is a enum that have a multiple response status code
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    //If we put a value between the parentheses of @Body decorator, it will only return the parameter with this name

    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.coffeesService.remove(id);
  }
}
