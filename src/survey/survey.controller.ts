import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new survey' })
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all surveys with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.surveyService.findAll(page ? +page : 1, limit ? +limit : 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey by ID' })
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a survey' })
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a survey' })
  remove(@Param('id') id: string) {
    return this.surveyService.remove(id);
  }
}
