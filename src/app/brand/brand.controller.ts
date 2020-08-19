import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { BrandDto } from '../dto/brand.dto';
import moment from 'moment';

// import { brandService } from '/src/app/brand/brand.service';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  // 전체 브랜드 조회
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin', 'user'])
  @Get('')
  async list() {
    const list = await this.brandService.list();
    return list;
  }

  // 단건 브랜드 조회
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin', 'user'])
  @Get(':id')
  async get(@Param() params) {
    const { id } = params;
    const brand = await this.brandService.get(id);
    return brand;
  }

  // 생성
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Post()
  async create(@Body() param: BrandDto) {
    const { nation, name } = param;
    return await this.brandService.create({ nation: nation, name: name});
  }

  // 수정
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Put(':id')
  async update(@Param() params, @Body() param: BrandDto) {
    const { id } = params;

    const brand = {
      id: id,
      ...param
    };

    return await this.brandService.update(brand);
  }

  // 삭제
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  async delete(@Param() params) {
    const { id } = params;
    return await this.brandService.delete({ id });
  }
}
