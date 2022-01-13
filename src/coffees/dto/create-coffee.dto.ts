import { IsString } from "class-validator";
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true }) //Each: true indicates that the expected value is an Array of Strings
  readonly flavors: string[];
}
