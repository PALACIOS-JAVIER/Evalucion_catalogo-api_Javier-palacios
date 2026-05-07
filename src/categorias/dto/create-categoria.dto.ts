import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
export class CreateCategoriaDto {
    @IsString({message: 'El nombre debe ser una cadena de texto'})
    @MinLength(2, {message: 'El nombre debe tener al menos 2 caracteres'})
    @MaxLength(100, {message: 'El nombre no puede tener más de 100 caracteres'})
    nombre: string;

    @IsString({message: 'La descripción debe ser una cadena de texto'})
    @MaxLength(255, {message: 'La descripción no puede tener más de 255 caracteres'})
    @IsOptional()
    descripcion?: string;
}
