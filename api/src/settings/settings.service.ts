import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma:PrismaService){}
  async create(createSettingInput: CreateSettingInput, userId: string) {
    try {
      return await this.prisma.companyInfo.create({
        data: {
          ...createSettingInput, 
          user: { connect: { id: userId } },
        },
        select: {
          companyName: true,
          email: true,
          phone: true,
          address: true,
          taxRate: true,
          paymentTerms: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to create settings");       
    }
  }

  async findByUser(userId: string) {
    try {
      const setting = await this.prisma.companyInfo.findUnique({ where: { userId } });
      if (!setting) throw new NotFoundException("Setting not found");
      return setting ;
    } catch (error) {
      throw new InternalServerErrorException("Failed to get settings");
    }
  };

  async update(updateSettingInput: UpdateSettingInput, userId:string) {
    try {
      const updatedSetting = await this.prisma.companyInfo.update({ 
        where: { userId },
        data: {
          ...updateSettingInput
        },
      });
      return updatedSetting;
    } catch (error) {
      throw new InternalServerErrorException("Failed to update settings");
    }
  };


  // findOne(id: number) {
  //   return `This action returns a #${id} setting`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} setting`;
  // }
}
