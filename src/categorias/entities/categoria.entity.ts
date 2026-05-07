import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Categoria extends Document {
    @Prop({ 
        required: true, 
        unique: true, 
        index: true,
        })
    nombre: string;

    @Prop({
        required: false,
        index: true,
    })
    descripcion?: string;
}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
