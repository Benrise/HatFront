import { BaseDto } from "@/shared/api/types";

export class CaseDto extends BaseDto {
    owner?: string;
    resources?: string;
    result?: string;
    task?: string;
  }
