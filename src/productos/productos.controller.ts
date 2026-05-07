import {Controller,Get,Post,Body,Patch,Param,Delete,HttpCode,HttpStatus,Query,} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(
    @Query('incluirInactivos') incluirInactivos?: string,
    @Query('categoria') categoria?: string,
  ) {
    return this.productosService.findAll(incluirInactivos, categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id/desactivar')
  desactivar(@Param('id') id: string) {
    return this.productosService.desactivar(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
