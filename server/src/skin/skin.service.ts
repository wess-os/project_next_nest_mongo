import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class SkinService {
    constructor(private readonly prisma: PrismaService) {}

    async createSkin(data: { name: string; image: string; category: string; float: string; price: number; }): Promise<Item> {
        return this.prisma.item.create({
        data,
        });
    }

    async getSkins(): Promise<Item[]> {
        return this.prisma.item.findMany();
    }
}
