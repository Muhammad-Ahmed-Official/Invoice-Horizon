import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { ClientResponse } from './entities/clientResponse.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => ClientResponse)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ClientResponse)
  createClient(@Args('createClientInput') createClientInput: CreateClientInput) {
    return this.clientsService.create(createClientInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ClientResponse], { name: 'clients' })
  findAll() {
    return this.clientsService.findAll();
  }

  // @Query(() => ClientResponse, { name: 'client' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.clientsService.findOne(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ClientResponse)
  updateClient(@Args('updateClientInput') updateClientInput: UpdateClientInput) {
    return this.clientsService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => Boolean)
  removeClient(@Args('id', { type: () => String }) id: string) {
    return this.clientsService.remove(id);
  }
}
