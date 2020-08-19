import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../model/brand.entity';
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
  async create(param) {
    let brand = new Brand();

    // 필요한 entity 들만 가지고와서 데이터셋팅하기
    brand = { ...param };

    // TODO: 시간 별 +9 시간 해주고, create vs save 확인해봐야함
    // return await this.brandRepository.create(brand);
    return await this.brandRepository.save(brand);
  }

  // 수정
  async update(param){
    let brand = new Brand();
    brand = { ...param };
    return await this.brandRepository.update(brand.id, brand);
  }

  // 삭제
  async delete(id) {
    return await this.brandRepository.softDelete(id);
  }
}
