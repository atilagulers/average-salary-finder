import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  readonly salary: number;

  @IsString()
  readonly job: string;

  @IsString()
  readonly location: string;
}
