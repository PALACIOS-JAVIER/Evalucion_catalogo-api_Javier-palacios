import {BadRequestException,ConflictException,Injectable,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>,
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<Categoria>,
  ) {}

  private validarObjectId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El id "${id}" no es un ObjectId válido`);
    }
  }

  async create(createProductoDto: CreateProductoDto) {
    this.validarObjectId(createProductoDto.categoria);

    const categoriaExiste = await this.categoriaModel.findById(
      createProductoDto.categoria,
    );
    if (!categoriaExiste) {
      throw new NotFoundException(
        `La categoría con id ${createProductoDto.categoria} no existe`,
      );
    }

    try {
      createProductoDto.name = createProductoDto.name.toLocaleLowerCase();
      const producto = await this.productoModel.create(createProductoDto);
      return producto;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Ya existe un producto con el nombre "${createProductoDto.name}"`,
        );
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll(incluirInactivos?: string, categoria?: string) {
    const filtro: Record<string, any> = {};

    if (incluirInactivos !== 'true') {
      filtro.activo = true;
    }

    if (categoria) {
      this.validarObjectId(categoria);
      filtro.categoria = categoria;
    }

    return this.productoModel.find(filtro).populate('categoria', 'name descripcion');
  }

  async findOne(id: string) {
    this.validarObjectId(id);
    const producto = await this.productoModel
      .findById(id)
      .populate('categoria', 'name descripcion');
    if (!producto) {
      throw new NotFoundException(`El producto con id ${id} no existe`);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    this.validarObjectId(id);

    if (updateProductoDto.categoria) {
      this.validarObjectId(updateProductoDto.categoria);
      const categoriaExiste = await this.categoriaModel.findById(
        updateProductoDto.categoria,
      );
      if (!categoriaExiste) {
        throw new NotFoundException(
          `La categoría con id ${updateProductoDto.categoria} no existe`,
        );
      }
    }

    if (updateProductoDto.name) {
      updateProductoDto.name = updateProductoDto.name.toLocaleLowerCase();
    }

    try {
      const producto = await this.productoModel.findByIdAndUpdate(
        id,
        updateProductoDto,
        { new: true },
      );
      if (!producto) {
        throw new NotFoundException(`El producto con id ${id} no existe`);
      }
      return producto;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error.code === 11000) {
        throw new ConflictException(
          `Ya existe un producto con el nombre "${updateProductoDto.name}"`,
        );
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async desactivar(id: string) {
    this.validarObjectId(id);
    const producto = await this.productoModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );
    if (!producto) {
      throw new NotFoundException(`El producto con id ${id} no existe`);
    }
    return producto;
  }

  async remove(id: string) {
    this.validarObjectId(id);
    const producto = await this.productoModel.findByIdAndDelete(id);
    if (!producto) {
      throw new NotFoundException(`El producto con id ${id} no existe`);
    }
    return { message: `Producto "${producto.name}" eliminado correctamente` };
  }
}