import type { HackathonDto } from "@/entities/hackathon/model";
import { UserDto } from "@/entities/user/model";
import { BaseDto } from "@/shared/api/types"


export class TeamSpecializationDto extends BaseDto {
  current?: string;
  required?: string;
}

export class TeamDto extends BaseDto {
    constructor () {
        super();
        this.skills = [];
    }
    case_name?: string;
    description?: string;
    hackathon?: HackathonDto;
    is_visible?: boolean;
    photo_url?: string;
    skills?: BaseDto[];
    specializations?: TeamSpecializationDto[];
    url_group?: string;
    user_count?: number = 0;
    users: UserDto[] = [];
  }

  export class CreateRequestDto {
    team_id?: number;
    specialization_ids?: number[] = [];
    message?: string;
  }

  export class CreateTeamDto extends TeamDto {
    case_id?: number;
  }