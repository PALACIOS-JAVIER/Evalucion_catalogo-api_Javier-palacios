import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './entities/categoria.entity';
import { Producto, ProductoSchema } from '../productos/entities/producto.entity';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports:[
    MongooseModule.forFeature([
      {
        name: 'Categoria',
        schema: CategoriaSchema,
      },
      {
        name: 'Producto',
        schema: ProductoSchema,
      }
    ])
  ],
  exports: [MongooseModule],
})
export class CategoriasModule {}
