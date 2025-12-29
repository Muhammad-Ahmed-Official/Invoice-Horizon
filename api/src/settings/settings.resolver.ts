import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { SettingResponse } from './entities/settingResponse.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => SettingResponse)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SettingResponse)
  createSetting(@Args('createSettingInput') createSettingInput: CreateSettingInput, @Context() ctx) {
    return this.settingsService.create(createSettingInput, ctx.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => SettingResponse, { name: 'getSetting' })
  findSetting(@Context() ctx) {
    return this.settingsService.findByUser(ctx.req.user.id);
  }

  // @Query(() => Setting, { name: 'setting' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.settingsService.findOne(id);
  // }

  // @Mutation(() => Setting)
  // updateSetting(@Args('updateSettingInput') updateSettingInput: UpdateSettingInput) {
  //   return this.settingsService.update(updateSettingInput.id, updateSettingInput);
  // }

  // @Mutation(() => Setting)
  // removeSetting(@Args('id', { type: () => Int }) id: number) {
  //   return this.settingsService.remove(id);
  // }
}
