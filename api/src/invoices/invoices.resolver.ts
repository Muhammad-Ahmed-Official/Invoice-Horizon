import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { InvoiceResponse } from './entities/invoiceResponse.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvoiceStats } from './entities/invoiceStatsResponse.entity';

@Resolver(() => InvoiceResponse)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InvoiceResponse)
  createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput, @Args("clientId") clientId:string, @Context() ctx) {
    return this.invoicesService.create(createInvoiceInput, clientId, ctx.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [InvoiceResponse], { name: 'invoices' }, )
  findAll(@Context() ctx) {
    return this.invoicesService.findAll(ctx.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => InvoiceStats, { name: 'stats' })
  findStats(@Context() ctx) {
    return this.invoicesService.findStats(ctx.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InvoiceResponse)
  updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoicesService.update(updateInvoiceInput.id, updateInvoiceInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  removeInvoice(@Args('id', { type: () => String }) id: string) {
    return this.invoicesService.remove(id);
  }
}
