import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

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
      include: {
        items: true, // <<< this fixes the null error
      },
    });
   return invoice;
  };


  async findAll() {
    try {
      const allClients = await this.prisma.invoice.findMany({ include: { items: true } });
      return allClients;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }



  async update(id: string, updateInvoiceInput: UpdateInvoiceInput) {
    try {
      const { items, ...invoiceData } = updateInvoiceInput;
      const isClientExist = await this.prisma.invoice.update({
        where: { id },
        data: {
        ...invoiceData,
        items: items
          ? {
              deleteMany: {}, // remove old items
              create: items.map(item => ({
                description: item.description,
                quantity: item.quantity,
                rate: item.rate,
              })),
            }
          : undefined,
      },
        include: { items: true }
      });
      return isClientExist;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.invoice.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Client not found');
        }
      }
      throw error;
    }
  }
}


// findOne(id: number) {
//   return `This action returns a #${id} invoice`;
// }
