import { Module } from '@nestjs/common';
import { SkinController } from './skin.controller';
import { SkinService } from './skin.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkinController],
  providers: [SkinService]
})
export class SkinModule {}
