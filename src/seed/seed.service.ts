import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { Pokeroke } from './interfaces/pokemon.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  //3. Se llama al mismo constructor que tiene el PokemonService y se agregan sus importaciones
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter
  ) { }

  

  async ejecutarSeed() {

    //Elimina todos los registros de la coleccion antes de agregar los nuevos
    await this.pokemonModel.deleteMany({});

    //Se almacena en una constante la data desestructurada del endpoint y como es un generico la respuesta sera de tipo PokeResponse
    const  data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1000')

    const pokemonToInsert:Pokeroke[] = [];

    data.results.forEach(async ({ name, url }) => {
      
      //Divide la url desde los valores que contengan '/'
      const segments = url.split('/');
      
      const no = +segments[segments.length - 2]
      //4. Se agrega la constante pokemon que ejecuta desde el servicio el metodo create y colocamos la desestructuracion de name y no
      // const pokemon = await this.pokemonModel.create({ name, no });

      pokemonToInsert.push({ name, no });

    });

    this.pokemonModel.insertMany(pokemonToInsert);

    return 'Semilla ejecutada';
  }

}
