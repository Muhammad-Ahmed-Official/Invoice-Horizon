import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma:PrismaService){}
  async create(createClientInput: CreateClientInput, userId: string) {
    try {
      const client = await this.prisma.client.create({ data: { ...createClientInput, user: { connect: { id: userId } }, }});
      return client;
    } catch (error) {
      throw new InternalServerErrorException("Failed to create client");
    }
  };

  async findAll(userId: string) {
    try {
      const allClients = await this.prisma.client.findMany({ where: { userId: userId } });
      return allClients;
    } catch (error) {
       throw new InternalServerErrorException("Failed to get clients");
    }
  };

  // findOne(id: number) {
  //   return `This action returns a #${id} client`;
  // }

  async update(id: string, updateClientInput: UpdateClientInput) {
    try {
      const isClientExist = await this.prisma.client.update({
        where: { id },
        data: updateClientInput
      });
      return isClientExist;
    } catch (error) {
       throw new InternalServerErrorException("Failed to update clients");
    }
  };

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.client.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Client not found');
        }
      }
       throw new InternalServerErrorException("Failed to delete clients");
    }
  };
  
}