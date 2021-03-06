import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Response,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { toCamel } from 'snake-camel';

import { JellyService } from './jelly.service';
import { JellyDto } from '../dto/jelly.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('jelly')
export class JellyController {
  constructor(private readonly jellyService: JellyService) {
  }

  // 전체 조회
  @UseGuards(JwtAuthGuard)
  // @SetMetadata('roles', ['admin', 'user'])
  // @Roles('admin')
  @Get('')
  async list() {
    return await this.jellyService.list();
  }

  // 단건 조회
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin', 'user'])
  @Get(':id')
  async get(@Param() param) {
    const { id } = param;
    return await this.jellyService.get(id);
  }

  // 생성
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Post()
  async create(@Body() param: JellyDto) {
    return await this.jellyService.create(toCamel({...param}));
  }

  // 수정
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Put(':id')
  async update(@Param() param, @Body() jelly:JellyDto, @Response() response) {
    const { id } = param;
    const req = toCamel({...jelly});
    const result = await this.jellyService.update({
      id: id,
      ...req,
    });

    // 수정 실패한경우
    if (result == false) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'brand Not Found'
      });
    }

    return response.status(200);
  }

  // 삭제
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  async delete(@Param() param) {
    const { id } = param;
    return await this.jellyService.delete(id);
  }
}
