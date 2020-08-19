import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jelly } from '../../model/jelly.entity';
import { JellyService } from './jelly.service';
import { JellyController } from './jelly.controller';
import { BrandRepository } from '../brand/brand.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jelly]),
  ],
  providers: [JellyService, BrandRepository],
  exports: [JellyService],
  controllers: [JellyController],
})
export class JellyModule {}
