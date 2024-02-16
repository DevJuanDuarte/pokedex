import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Decorador que indica un esquema, la clase se extiende de Document que hace parte de mongoose
@Schema()
export class Pokemon extends Document {

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
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
