import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../../model/brand.entity';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand) private readonly brandRepository: BrandRepository,
  ) {}

  // 브랜드 조회
  async list() {
    return await this.brandRepository.find();
  }

  // 단건 조회
  async get(id) {
    return await this.brandRepository.findOne({ id: id});
  }

  // 생성
  async create() {
    return ;
  }

  // 수정
  async update(){
    return ;
  }

  // 삭제
  async delete(id) {
    return await this.brandRepository.softDelete({id: id});
    return;
  }
}
