import { UserDto } from "@/entities/user/model";
import { BaseDto } from "@/shared/api/types"


export class TeamSpecializationDto extends BaseDto {
  current?: string;
  required?: string;
}

export class TeamUserDto extends UserDto {
  isCapitan?: boolean;
}

export class TeamDto extends BaseDto {
    constructor () {
        super();
        this.skills = [];
    }
    case_name?: string;
    description?: string;
    hackathon?: BaseDto;
    is_visible?: boolean;
    photo_url?: string;
    skills?: BaseDto[];
    specialization?: TeamSpecializationDto[];
    url_group?: string;
    user_count?: number = 0;
    users?: UserDto[] = [];
  }