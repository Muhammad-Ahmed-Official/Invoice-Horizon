import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma:PrismaService){}
  async create(createClientInput: CreateClientInput) {
    try {
      const client = await this.prisma.client.create({ data: { ...createClientInput }});
      return client;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  async findAll() {
    try {
      const allClients = await this.prisma.client.findMany();
      return allClients;
    } catch (error) {
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  };

  async remove(id: string) {
    try {
      const isDelete = await this.prisma.client.delete({ where: { id }});
      if(!isDelete) throw new BadRequestException("No data found");
      return true;
    } catch (error) {
        throw new InternalServerErrorException();
    }
  };
  
}