// bootstrap.module.ts
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule.load(path.resolve('config', '**/!(*.d).{ts,js}')),
  ],
})
export class BootstrapModule {}
