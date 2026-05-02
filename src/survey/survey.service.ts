import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const {
      members,
      crops,
      cropProductions,
      processedProducts,
      livestocks,
      livestockIncomeFromOwn,
      livestockActivityOnFarm,
      offFarmIncome,
      roleInProduction,
      ...surveyData
    } = createSurveyDto;

    return this.prisma.survey.create({
      data: {
        ...surveyData,
        members: members ? { create: members } : undefined,
        crops: crops ? { create: crops } : undefined,
        cropProductions: cropProductions
          ? {
              create: cropProductions.map((prod) => ({
                cropName: prod.cropName,
                cropVarieties: {
                  create: prod.cropVarieties,
                },
              })),
            }
          : undefined,
        processedProducts: processedProducts
          ? { create: processedProducts }
          : undefined,
        livestocks: livestocks ? { create: livestocks } : undefined,
        livestockIncomeFromOwn: livestockIncomeFromOwn
          ? { create: livestockIncomeFromOwn }
          : undefined,
        livestockActivityOnFarm: livestockActivityOnFarm
          ? { create: livestockActivityOnFarm }
          : undefined,
        offFarmIncome: offFarmIncome ? { create: offFarmIncome } : undefined,
        roleInProduction: roleInProduction
          ? {
              create: roleInProduction.map((role) => ({
                ...role,
                activityTrack: {
                  create: role.activityTrack,
                },
              })),
            }
          : undefined,
      },
      include: {
        members: true,
        crops: true,
        cropProductions: {
          include: {
            cropVarieties: true,
          },
        },
        processedProducts: true,
        livestocks: true,
        livestockIncomeFromOwn: true,
        livestockActivityOnFarm: true,
        offFarmIncome: true,
        roleInProduction: {
          include: {
            activityTrack: true,
          },
        },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.survey.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          district: true,
          village: true,
          latitude: true,
          longitude: true,
          elevation: true,
          surveyNo: true,
          interviewDate: true,
          interviewerName: true,
          dataEntryClerk: true,
        },
      }),
      this.prisma.survey.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.survey.findUnique({
      where: { id },
      include: {
        members: true,
        crops: true,
        cropProductions: {
          include: {
            cropVarieties: true,
          },
        },
        processedProducts: true,
        livestocks: true,
        livestockIncomeFromOwn: true,
        livestockActivityOnFarm: true,
        offFarmIncome: true,
        roleInProduction: {
          include: {
            activityTrack: true,
          },
        },
      },
    });
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    // Note: Update with nested relations can be complex in Prisma (delete/re-create or update by ID).
    // For simplicity, we update the main survey data here.
    // If relations need to be updated, it should be handled specifically.
    const {
      members,
      crops,
      cropProductions,
      processedProducts,
      livestocks,
      livestockIncomeFromOwn,
      livestockActivityOnFarm,
      offFarmIncome,
      roleInProduction,
      ...surveyData
    } = updateSurveyDto;

    return this.prisma.survey.update({
      where: { id },
      data: surveyData as any, // Simple update for now
    });
  }

  async remove(id: string) {
    return this.prisma.survey.delete({
      where: { id },
    });
  }
}
