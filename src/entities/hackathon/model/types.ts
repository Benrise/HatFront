import type { CaseDto } from "@/entities/case/model";
import { BaseDto } from "@/shared/api/types";

export class TimingsDto {
    start?: string;
    end?: string;
    break?: string;
  }
  
  export class PrizeDto {
    place?: number;
    money_prize?: number;
    alternative_prizes?: string[];
  }

  export class HackathonDto extends BaseDto {
    description?: string;
    about?: string;
    people_from?: number;
    people_to?: number;
    prize_fund?: number;
    prizes?: PrizeDto;
    time_end?: string;
    time_end_registration?: string;
    time_start?: string;
    time_start_registration?: string;
    timings?: TimingsDto;
    url_group?: string;
    url_web?: string;
    team_id?: number;
    is_confirm?: boolean;
    photo_url?: string;
    cases: CaseDto[] = [];
  }