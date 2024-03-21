import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    
    //Se importa el modulo que crea el esquema solo existe un forRoot por aplicacion
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  //1. Se exporta el MongooseModule que es el que tiene el nombre y el esquema para poder ser llamado en otros modulos
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}
