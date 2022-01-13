import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees') //between the parentheses we define the path, example: http://localhost:3000/coffees
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get() //Again, between the parentheses we define the second path next of the first one http://localhost:3000/coffees/flavours
  findAll(@Query() paginationQuery) {
    //@Query Decoratos gets the queries of the url. Example http://localhost:3000/coffees?limit=20&offset=10
    const { limit, offset } = paginationQuery; //Destructuring the Query
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
