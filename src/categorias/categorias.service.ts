import { BadGatewayException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './entities/categoria.entity';


@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<Categoria>,
  ){}

  async create(createCategoriaDto: CreateCategoriaDto){
    try {
      createCategoriaDto.nombre = createCategoriaDto.nombre.toLowerCase();
      const categoria = await this.categoriaModel.create(createCategoriaDto);
      return categoria;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadGatewayException(`La categoria ${createCategoriaDto.nombre} ya existe`);
      }
      throw new InternalServerErrorException('Error al crear la categoria');
    }
  }

  async findAll() {
    return await this.categoriaModel.find();
  }

  async findOne(id: string) {
    return await this.categoriaModel.findById(id);
  }

  update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: string) {
    return `This action removes a #${id} categoria`;
  }
}
