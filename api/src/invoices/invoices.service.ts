import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService){}
  async create(createInvoiceInput: CreateInvoiceInput, clientId: string) {
    const { items, ...invoiceData } = createInvoiceInput;
    const invoice = await this.prisma.invoice.create({
      data: {
        ...invoiceData,
        client: {
          connect: { id: clientId },
        },
        items: {
          create: items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            // price: item.price,
            rate: item.rate,
          })),
        },
      },
    });
   return invoice;
  };


  async findAll() {
    try {
      const allClients = await this.prisma.invoice.findMany();
      return allClients;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} invoice`;
  // }

  async update(id: string, updateInvoiceInput: UpdateInvoiceInput) {
    try {
      const isClientExist = await this.prisma.client.update({
        where: { id },
        data: updateInvoiceInput
      });
      return isClientExist;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      const isDelete = await this.prisma.client.delete({ where: { id }});
      if(!isDelete) throw new BadRequestException("No data found");
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
