import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

// import { brandService } from '/src/app/brand/brand.service';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  // 전체 브랜드 조회
  @Get('/')
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
  create(@Body() BrandCreateDto) {
    return  true;
  }

  // 수정
  @Put()
  update(@Param() params, @Body() BrandUpdateDto) {
    return true;
  }

  // 삭제
  @Delete(':id')
  async delete(@Param() params) {
    const { id } = params;
    await this.brandService.delete(id);
    return id;
  }
}
