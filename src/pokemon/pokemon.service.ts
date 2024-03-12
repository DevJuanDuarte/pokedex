import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }


  //Como es una funcion de crear se agrega el async para que espere una rta
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.hadleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }


  //Metodo que verifica si es un numero, si es un mongoid y si es un nombre
  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    //MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }


    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }


    if (!pokemon) throw new NotFoundException(`Pokemon con el id, name o no ${term} no funciona`)

    return pokemon;

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    //Verificar el termino de busqueda, si no se encuentra muestra la excepcion del metodo findOne
    const pokemon = await this.findOne(term);

    //Puede que al actualizar me manden el nombre en mayuscula entonces agrego una condicion que pregunte que si tiene el name entonces el name de ese dto va a ser igual al name.toLowerCase() para que tambien sea minuscula
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
      //Exparsir el pokemon y luego le sobreescribe todas las propiedades que tiene el updatePokemonDto asi recibimos la informacion nueva que se esta actualizando.
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.hadleExceptions(error);
    }

  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne();
  }

  private hadleExceptions (error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`El pokemon ya existe en la bd ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`No se puede crear este pokemon, vea la consola de errores.`)
  }
}
