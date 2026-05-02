import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum HouseholdType {
  MW = 'MW',
  MH = 'MH',
  WH = 'WH',
  MA = 'MA',
  FD = 'FD',
  CH = 'CH',
  OH = 'OH',
}

class HouseholdMemberDto {
  @ApiProperty()
  @IsString()
  memberCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yearOfBirth?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  educationYears?: number;

  @ApiProperty()
  @IsBoolean()
  isEnrolled: boolean;

  @ApiProperty()
  @IsBoolean()
  isIncomeEarner: boolean;

  @ApiProperty()
  @IsBoolean()
  isHead: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  farmMonths?: number;
}

class CropDto {
  @ApiProperty()
  @IsString()
  cropName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  areaPlanted?: number;

  @ApiProperty()
  @IsBoolean()
  isConsumed: boolean;

  @ApiProperty()
  @IsBoolean()
  isIncomeGenerated: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  inputsUsed?: string;
}

class ProcessedProductDto {
  @ApiProperty()
  @IsString()
  crop: string;

  @ApiProperty()
  @IsString()
  product: string;
}

class CropVarietyDto {
  @ApiProperty()
  @IsString()
  variety: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  areaSown?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yieldKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seedSource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  product?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  salePercentage?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pricePerKg?: number;
}

class CropProductionDto {
  @ApiProperty()
  @IsString()
  cropName: string;

  @ApiProperty({ type: [CropVarietyDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CropVarietyDto)
  cropVarieties: CropVarietyDto[];
}

class LivestockDto {
  @ApiProperty()
  @IsString()
  animalType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsBoolean()
  isIncomeGenerated: boolean;
}

class GenericSourceDto {
  @ApiProperty()
  @IsString()
  source: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isIncomeEarned?: boolean;
}

class ActivityTrackDto {
  @ApiProperty()
  @IsString()
  activity: string;

  @ApiProperty()
  @IsString()
  performanceWork: string;

  @ApiProperty()
  @IsString()
  task: string;
}

class RoleInProductionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recivedCashFromCrop?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recivedCashFromLiveStock?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  howDeciedCropCash?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  howDeciedLiveStockCash?: string;

  @ApiProperty({ type: [ActivityTrackDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActivityTrackDto)
  activityTrack: ActivityTrackDto[];
}

export class CreateSurveyDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  village?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  elevation?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  surveyNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  interviewDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  interviewerName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dataEntryClerk?: string;

  @ApiPropertyOptional({ enum: HouseholdType })
  @IsOptional()
  @IsEnum(HouseholdType)
  householdType?: HouseholdType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ethnicity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  maleRespondentName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  maleRespondentCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maleRelationToHOH?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  femaleRespondentName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  femaleRespondentCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  femaleRelationToHOH?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  landUnit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalLandAccess?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ownedLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rentedLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  communalLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rainfedLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  irrigatedLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  homeGarden?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  grassland?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fallowLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  forestLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pond?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rentedOutLand?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  numberOfParcels?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  distanceBetweenParcels?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topIncomeSource1?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topIncomeSource2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topIncomeSource3?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topIncomeSource4?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topIncomeSource5?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crop1Importance?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crop2Importance?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  crop3Importance?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  roofMaterial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasThermos?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  floorMaterial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  wallMaterial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cookingEnergy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasRefrigerator?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drinkingWaterSource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hasPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasStove?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toiletType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hasTV?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasStoneMill?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasAlmirah?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasIron?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasRadio?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasSewingMachine?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hasVehicle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasMotorbike?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ownedAssets?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  irrigationType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hiresLabor?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  communityParticipation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasLeadershipRole?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  processingCrop1?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  processingCrop1Activities?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  processingCrop2?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  processingCrop2Activities?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  processingCrop3?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  processingCrop3Activities?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasCreditAccess?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  leisureTimeRating?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  lessPreferredFoodDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  borrowFoodDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limitPortionDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limitAdultFoodDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  reduceMealsDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  foodInsufficiencyMonths?: any;

  @ApiPropertyOptional()
  @IsOptional()
  foodAidMonths?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cerealsDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tubersDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pulsesDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  vitaminAVegDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  leafyVegDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  otherVegDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  vitaminAFruitDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  otherFruitDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  meatDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  organMeatDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fishDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  dairyDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  eggDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  oilDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sugarDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  spicesDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  crop1ConsumptionPattern?: any;

  @ApiPropertyOptional()
  @IsOptional()
  crop2ConsumptionPattern?: any;

  @ApiPropertyOptional()
  @IsOptional()
  crop3ConsumptionPattern?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedCrop?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  testingCrop?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stoppedCrop?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stoppedCropOnSeason?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  expandedCrop?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  reducedCrop?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stopUsingCropVariety?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  newVariety?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isHighYielding?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isBetterQuality?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPreTreatedSeed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isShorterCycle?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isLongerCycle?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDroughtTolerant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFloodTolerant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isSalinityTolerant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isToxicityTolerant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDiseaseResistant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPestResistant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  earlyPreparation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  latePlanting?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  intercropping?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  changeInFarmingTimeOther?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedIntercropping?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedCropCover?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedMulching?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedRotations?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedHedges?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  builtRidgesOrBunds?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedTerraces?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedStoneTerraces?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedContourPloughing?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  improvedIrrigationEfficiency?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  improvedDrainage?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedMicroCatchments?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  tidalWaterControl?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  startedIrrigating?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stoppedIrrigating?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  mechanizedFarming?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  increasedChemicalFertilizer?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  startedManureCompost?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stoppedManureCompost?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  increasedPesticideUse?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  integratedPestManagement?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  integratedCropManagement?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedNewAnimals?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  testingNewAnimals?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stoppedKeepingAnimals?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  introducedNewBreed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  reducedHerdSize?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  increasedHerdSize?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  changedHerdComposition?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  stallKeeping?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  fencing?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  cutAndCarry?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  growingFodderCrops?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  improvedPastures?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  fodderStorage?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  otherLivestockChanges?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  manReceivedClimateInfo?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  womanReceivedClimateInfo?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  manInfoSource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  womanInfoSource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adaptationChangesLast3Years?: string;

  // Relations
  @ApiProperty({ type: [HouseholdMemberDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HouseholdMemberDto)
  members?: HouseholdMemberDto[];

  @ApiProperty({ type: [CropDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CropDto)
  crops?: CropDto[];

  @ApiProperty({ type: [CropProductionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CropProductionDto)
  cropProductions?: CropProductionDto[];

  @ApiProperty({ type: [ProcessedProductDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProcessedProductDto)
  processedProducts?: ProcessedProductDto[];

  @ApiProperty({ type: [LivestockDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LivestockDto)
  livestocks?: LivestockDto[];

  @ApiProperty({ type: [GenericSourceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenericSourceDto)
  livestockIncomeFromOwn?: GenericSourceDto[];

  @ApiProperty({ type: [GenericSourceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenericSourceDto)
  livestockActivityOnFarm?: GenericSourceDto[];

  @ApiProperty({ type: [GenericSourceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenericSourceDto)
  offFarmIncome?: GenericSourceDto[];

  @ApiProperty({ type: [RoleInProductionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleInProductionDto)
  roleInProduction?: RoleInProductionDto[];
}
