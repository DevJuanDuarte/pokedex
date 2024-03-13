import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    //2. Se importa PokemonModule para poder usarlo en Seed
    PokemonModule
  ]
})
export class SeedModule {}
