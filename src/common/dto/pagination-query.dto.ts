import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number)  //We can avoid this line setting to true `enableImplicitConversion` property on main.ts file
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
