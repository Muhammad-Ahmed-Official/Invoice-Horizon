import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';

@Module({
  providers: [InvoicesResolver, InvoicesService],
})
export class InvoicesModule {}
