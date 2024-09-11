import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
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

    @Put(':id') // Método para atualizar um item
    async update(@Param('id') id: string, @Body() data: { name?: string; image?: string; category?: string; float?: string; price?: number; }): Promise<Item> {
        return this.skinService.updateSkin(id, data);
    }

    @Delete(':id') // Método para deletar um item
    async remove(@Param('id') id: string): Promise<void> {
        return this.skinService.deleteSkin(id);
    }
}
