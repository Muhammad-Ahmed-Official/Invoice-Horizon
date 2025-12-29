import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma:PrismaService){}
  async create(createSettingInput: CreateSettingInput, userId: string) {
    return await this.prisma.companyInfo.create({
      data: {
        ...createSettingInput, 
        user: { connect: { id: userId} },
      },
    });
  };

  async findByUser(userId: string) {
    const setting = await this.prisma.companyInfo.findUnique({ where: { userId } });
    if (!setting) throw new NotFoundException("Setting not found");

    return setting;
  };

  // findOne(id: number) {
  //   return `This action returns a #${id} setting`;
  // }

  // update(id: number, updateSettingInput: UpdateSettingInput) {
  //   return `This action updates a #${id} setting`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} setting`;
  // }
}
