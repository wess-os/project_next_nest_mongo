import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class SkinService {
    constructor(private readonly prisma: PrismaService) {}

    async createSkin(data: { name: string; image: string; category: string; float: string; price: number; }): Promise<Item> {
        return this.prisma.item.create({
            data: {
                name: data.name,
                image: data.image,
                price: data.price,
                float: data.float.toString(),
                category: data.category
            }
        });
    }

    async getSkins(): Promise<Item[]> {
        return this.prisma.item.findMany();
    }

    async updateSkin(id: string, data: Partial<Item>): Promise<Item> {
        const skin = await this.prisma.item.findUnique({
            where: { id: id },
        });
        if (!skin) {
            throw new NotFoundException(`Skin with ID ${id} not found`);
        }
        return this.prisma.item.update({
            where: { id: id },
            data: {
                name: data.name,
                image: data.image,
                category: data.category,
                float: data.float,
                price: data.price,
                updatedAt: new Date(),
            },
        });
    }

    async deleteSkin(id: string): Promise<void> {
        const result = await this.prisma.item.delete({
            where: { id },
        });
        if (!result) {
            throw new NotFoundException(`Skin with ID ${id} not found`);
        }
    }
}
