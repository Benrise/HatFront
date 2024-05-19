import { BaseDto } from "@/shared/api/types";

export class TimingsDto {
    start?: string;
    end?: string;
    break?: string;
  }
  
  export class PrizesDto {
    first?: number;
    second?: number;
    third?: number;
  }
  
  export class HackathonDto extends BaseDto {
    description?: string;
    people_from?: number;
    people_to?: number;
    prize_fund?: number;
    prizes?: PrizesDto;
    time_end?: string;
    time_end_registration?: string;
    time_start?: string;
    time_start_registration?: string;
    timings?: TimingsDto;
    url_group?: string;
    url_web?: string;
    is_confirm?: boolean;
    photo_url?: string;
  }