import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jelly } from '../model/jelly.entity';
import { JellyRepository } from './jelly.repository';
import { BrandRepository } from '../brand/brand.repository';
import { Brand } from '../model/brand.entity';
import { getConnection } from 'typeorm/index';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class JellyService {
  constructor(
    @InjectRepository(Jelly)
    private readonly jellyRepository: JellyRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
  ) { }

  // 젤리 조회
  async list() {

    // TODO: getConnection query 하고나서 후처리 확인하기
    const query = `
      select j.name       as name,
             j.price      as price,
             b.name       as brand_name,
             j.created_at as created_at,
             j.updated_at as updated_at
      from jelly j
               left join brand b on b.id = j.brand_id and b.deleted_at is null
      where j.deleted_at is null
    `;

    return await getConnection().query(query);
  }

  // 젤리 단건 조회
  async get(id) {
    // TODO: getConnection query 하고나서 후처리 확인하기
    const query = `
      select j.name       as name,
             j.price      as price,
             b.name       as brand_name,
             j.created_at as created_at,
             j.updated_at as updated_at
      from jelly j
               left join brand b on b.id = j.brand_id and b.deleted_at is null
      where j.id = ${id}
        and j.deleted_at is null
    `;

    const jelly = await getConnection().query(query);
    return jelly;
  }

  // 생성
  async create(param) {
    return await this.jellyRepository.save(param);
  }

  // 수정
  async update(param) {

    // brand Name 기준으로 id 찾아주기
    const query = `
      select *
      from brand
      where name = '${param.brandName}'
      and deleted_at is null
    `;

    const brand = await getConnection().query(query);

    // 찾는 브랜드 없으면 false 보내주기
    if (isEmpty(brand)) {
      return false;
    }

    // delete 함수 말고 reduce 이용해서 key 없애기
    let jelly = Object.keys(param).reduce((object, key) => {
      if (key != 'brandName') {
        object[key] = param[key]
      }
      return object;
    }, {});

    jelly = Object.assign( { brandId: brand[0].id }, jelly);
    return await this.jellyRepository.update(param.id, jelly);
  }

  // 삭제
  async delete(id) {
    return await this.brandRepository.softDelete({ id: id });
  }

}

