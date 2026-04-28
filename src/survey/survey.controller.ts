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
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

class SurveyMetaDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;
}

class PaginatedSurveyResponseDto {
  @ApiProperty({ type: [CreateSurveyDto] }) // Using CreateSurveyDto as a proxy for the Survey model
  data: any[];

  @ApiProperty()
  meta: SurveyMetaDto;
}


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
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of surveys.',
    type: PaginatedSurveyResponseDto,
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.surveyService.findAll(page ? +page : 1, limit ? +limit : 10);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a survey by ID' })
  @ApiResponse({ status: 200, description: 'The survey has been successfully retrieved.', type: CreateSurveyDto })
  @ApiResponse({ status: 404, description: 'Survey not found.' })
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a survey' })
  @ApiResponse({ status: 200, description: 'The survey has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Survey not found.' })
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a survey' })
  @ApiResponse({ status: 200, description: 'The survey has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Survey not found.' })
  remove(@Param('id') id: string) {
    return this.surveyService.remove(id);
  }
}

