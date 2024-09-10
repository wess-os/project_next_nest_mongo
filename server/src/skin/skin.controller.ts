import { Controller, Post, Body, Get } from '@nestjs/common';
import { SkinService } from './skin.service';
import { Item } from '@prisma/client';

@Controller('skin')
export class SkinController {
    constructor(private readonly skinService: SkinService) {}

    @Post()
    async create(@Body() data: { name: string; image: string; category: string; float: string; price: number; }): Promise<Item> {
        return this.skinService.createSkin(data);
    }

    @Get()
    async findAll(): Promise<Item[]> {
        return this.skinService.getSkins();
    }
}
