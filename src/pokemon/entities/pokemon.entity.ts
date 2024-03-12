import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Decorador que indica un esquema, la clase se extiende de Document que hace parte de mongoose
@Schema()
export class Pokemon extends Document {
  //El id me lo proporciona mongo

  //Decorador Prop: agrega las propiedades a los tipos de datos, por ejemplo este sera unico y tendra un indice para una busqueda mas rapida.
  @Prop({
    unique: true,
    index: true
  })
  name: string;

  @Prop({
    unique: true,
    index: true
  })
  no: number;
}

// En una constante se exporta el SchemaFactory y se le da la propiedad createForClass con la clase  del esquema
// Basicamente la va a decir cuando se este iniciando la base de datos estos son las definiciones que uses, estas son las reglas y columnas y demas cosas.
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
