import { Injectable } from '@angular/core';
import { dateUtils } from "../../../../shared/utils/dateutils";

@Injectable()
export class DateHelperService {
  readonly DATE_FORMAT = 'yyyy-MM-dd';
  utils = dateUtils;
}
