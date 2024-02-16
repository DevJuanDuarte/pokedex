//Se instalar class-validator y class-transformer: npm i --save class-validator class-transformer
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

  @IsInt()
  @IsPositive()
  @Min(1)
  no:number;

  @IsString()
  @MinLength(1)
  name:string;
}
