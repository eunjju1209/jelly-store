import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request } from '@nestjs/common';
import { BrandDto } from '../../dto/brand.dto';
import moment from 'moment';

// import { brandService } from '/src/app/brand/brand.service';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  // 전체 브랜드 조회
  @Get('')
  async list() {
    const list = await this.brandService.list();
    return list;
  }

  // 단건 브랜드 조회
  @Get(':id')
  async get(@Param() params) {
    const { id } = params;
    const brand = await this.brandService.get(id);
    return brand;
  }

  // 생성
  @Post()
  async create(@Body() param: BrandDto) {
    const { nation, name } = param;
    return await this.brandService.create({ nation: nation, name: name});
  }

  // 수정
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
  @Delete(':id')
  async delete(@Param() params) {
    const { id } = params;
    return await this.brandService.delete({ id });
  }
}
