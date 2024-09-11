import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class SkinService {
    constructor(private readonly prisma: PrismaService) {}

    async createSkin(data: Item): Promise<Item> {
        try {
            // Converts price to an integer, if it is a string
            const priceValue = typeof data.price === 'string' ? parseInt(data.price, 10) : data.price;

            // Check whether the conversion was successful
            if (isNaN(priceValue)) {
                throw new Error('The price value must be a valid number.');
            }
            
            return await this.prisma.item.create({
                data: {
                    name: data.name,
                    image: data.image,
                    price: priceValue,
                    float: data.float.toString(),
                    category: data.category
                }
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error creating skin: ',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getSkins(): Promise<Item[]> {
        try {
            return await this.prisma.item.findMany();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error when searching for skins: ' + error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async updateSkin(id: string, data: Partial<Item>): Promise<Item> {
        try {
            const skin = await this.prisma.item.findUnique({
                where: { id: id },
            });

            if (!skin) {
                throw new NotFoundException(`Skin with ID ${id} not found`);
            }

            let priceValue: number;
            if (data.price) {
                // Converts price to an integer, if it is a string
                priceValue = typeof data.price === 'string' ? parseInt(data.price, 10) : data.price;

                // Check whether the conversion was successful
                if (isNaN(priceValue)) {
                    throw new Error('The price value must be a valid number.');
                }
            }

            return await this.prisma.item.update({
                where: { id: id },
                data: {
                    name: data.name,
                    image: data.image,
                    category: data.category,
                    float: data.float,
                    price: priceValue,
                    updatedAt: new Date(),
                },
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error when updating skin: ' + error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteSkin(id: string): Promise<void> {
        try {
            await this.prisma.item.delete({
                where: { id },
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error when deleting skin: ' + error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
