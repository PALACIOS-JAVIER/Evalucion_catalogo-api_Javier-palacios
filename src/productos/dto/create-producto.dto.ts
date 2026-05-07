import {IsString,IsNumber,Min,IsBoolean,IsMongoId,IsInt,MinLength,IsPositive,IsOptional,} from 'class-validator';
export class CreateProductoDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @IsMongoId({ message: 'El id de la categoría no es válido' })
  categoria: string;

  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
  @IsOptional()
  activo?: boolean;
}

