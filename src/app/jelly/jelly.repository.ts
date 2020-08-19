import { EntityRepository, Repository } from 'typeorm/index';
import { Jelly } from '../model/jelly.entity';

@EntityRepository(Jelly)
export class JellyRepository extends Repository<Jelly> {

}
