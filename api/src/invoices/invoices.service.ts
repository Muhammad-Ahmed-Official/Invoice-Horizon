import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService){}
  async create(createInvoiceInput: CreateInvoiceInput, clientId: string) {
    try { 
      const { items, ...invoiceData } = createInvoiceInput;
      const invoice = await this.prisma.invoice.create({
        data: {
          ...invoiceData,
          client: { connect: { id: clientId } },
          items: {
            create: items.map(item => ({
              description: item.description,
              quantity: item.quantity,
              rate: item.rate,
            })),
          },
        },
        include: { items: true },
      });
     return invoice;
    } catch (error) {
      throw new InternalServerErrorException("Failed to create invoice");
    }
  };


  async findAll() {
    try {
      const allClients = await this.prisma.invoice.findMany({ include: { client: { select: { name: true } }, items: true } });
      return allClients;
    } catch (error) {
      throw new InternalServerErrorException("Failed to get invoices");
    }
  };



  async update(id: string, updateInvoiceInput: UpdateInvoiceInput) {
    try {
      const { items, ...data } = updateInvoiceInput;

      return await this.prisma.invoice.update({
        where: { id },
        data: {
          ...data,
          issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
          dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
          items: items
            ? {
                deleteMany: {},
                create: items.map(item => ({
                  description: item.description,
                  quantity: item.quantity,
                  rate: item.rate,
                })),
              }
            : undefined,
        },
        include: { items: true },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to update invoice");
    }
  };


  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.invoice.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') throw new BadRequestException('Client not found');
      }
        throw new InternalServerErrorException();
      }
  };

}


// findOne(id: number) {
//   return `This action returns a #${id} invoice`;
// }
