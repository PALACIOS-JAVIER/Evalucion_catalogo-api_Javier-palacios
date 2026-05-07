import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Producto extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    index: true,
  })
  precio: number;

  @Prop({
    required: true,
  })
  stock: number;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: 'Categoria',
  })
  categoria: Types.ObjectId;

  @Prop({
    default: true,
  })
  activo: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);