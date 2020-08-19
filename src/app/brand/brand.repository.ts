// 엔티티에 접근할 수 있도록 기본적인 인터페이스를 작성한다.

import { EntityRepository, Repository } from 'typeorm';
import { Brand } from '../model/brand.entity';

@EntityRepository(Brand)
export class  BrandRepository extends Repository<Brand> {

}
