import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService){}
  async create(createInvoiceInput: CreateInvoiceInput, clientId: string, userId:string) {
    try { 
      const { items, ...invoiceData } = createInvoiceInput;
      const invoice = await this.prisma.invoice.create({
        data: {
          ...invoiceData,
          client: { connect: { id: clientId } },
          user: { connect: { id: userId } },
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


  async findAll(userId: string) {
    try {
      const allClients = await this.prisma.invoice.findMany({ where: { userId: userId }, include: { client: { select: { name: true } }, items: true } });
      return allClients;
    } catch (error) {
      throw new InternalServerErrorException("Failed to get invoices");
    }
  };

  async findStats(userId:string) {
    const inoices = await this.prisma.invoice.findMany({
      where: { userId: userId },
      select: {
        total: true,
        status: true,
      },
    });

    const stats = {
      totalRevenue: 0,
      paidAmount: 0,
      pendingAmount: 0,
      overdueAmount: 0,
    };

    for(const inv of inoices){
      stats.totalRevenue += inv.total;

      if (inv.status === 'PAID') {
        stats.paidAmount += inv.total;
      }

      if (inv.status === 'PENDING') {
        stats.pendingAmount += inv.total;
      }

      if (inv.status === 'OVERDUE') {
        stats.overdueAmount += inv.total;
      }
    }

    return stats;
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
