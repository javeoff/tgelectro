import { Injectable } from '@nestjs/common/decorators';
import { AnyObject } from 'immer/dist/types/types-internal';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

import { ListName } from '@pages/admin/enums/ListName';
import { getInitialValuesState } from '@common/utils/getInitialValuesState';

@Injectable()
export class AdminEditFormFactory {
  public getForm(item: AnyObject, type: ListName): Record<string, string> {
    // eslint-disable-next-line no-console
    console.log({
      ...getInitialValuesState(type),
      ...omitBy(omitBy(item, isUndefined), isNull),
    });

    return {
      ...getInitialValuesState(type),
      ...omitBy(omitBy(item, isUndefined), isNull),
    };
  }
}
