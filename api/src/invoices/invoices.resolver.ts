import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { InvoiceResponse } from './entities/invoiceResponse.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InvoiceStats } from './entities/invoiceStatsResponse.entity';

@Resolver(() => InvoiceResponse)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InvoiceResponse)
  createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput, @Args("clientId") clientId:string) {
    return this.invoicesService.create(createInvoiceInput, clientId);
  }

  @Query(() => [InvoiceResponse], { name: 'invoices' })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Query(() => InvoiceStats, { name: 'stats' })
  findStats() {
    return this.invoicesService.findStats();
  }

  @Mutation(() => InvoiceResponse)
  updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoicesService.update(updateInvoiceInput.id, updateInvoiceInput);
  }

  @Mutation(() => Boolean)
  removeInvoice(@Args('id', { type: () => String }) id: string) {
    return this.invoicesService.remove(id);
  }
}
