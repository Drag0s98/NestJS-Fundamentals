import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

//Checks if the value inserted in the URL is a number, and we need to import it where we want to check this condition, example in src/coffees/coffees.controller.ts line 35.
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`
      );
    }
    return val;
  }
}
