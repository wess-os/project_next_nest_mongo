import { Controller, Post, Body, Param, Get, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SkinService } from './skin.service';
import { Item } from '@prisma/client';

@Controller('skin')
export class SkinController {
    constructor(private readonly skinService: SkinService) {}

    @Post() // Method to create an item
    async create(@Body() data: Item): Promise<Item> {
        // Checks if all required fields are present
        console.log(data);
        const requiredFields = ['name', 'image', 'category', 'float', 'price'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing required fields',
            }, HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.skinService.createSkin(data);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error creating skin: ',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get() // Method to fetch all items
    async findAll(): Promise<Item[]> {
        try {
            return await this.skinService.getSkins();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error when searching for skins: ' + error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id') // Method for updating an item
    async update(@Param('id') id: string, @Body() data: Item): Promise<Item> {
        try {
            return await this.skinService.updateSkin(id, data);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error when updating skin: ' + error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id') // Method for deleting an item
    async remove(@Param('id') id: string): Promise<void> {
        try {
            return await this.skinService.deleteSkin(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error when deleting skin: ' + error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
