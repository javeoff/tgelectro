import { Injectable } from '@nestjs/common/decorators';
import { AnyObject } from 'immer/dist/types/types-internal';

@Injectable()
export class AdminEditFormFactory {
  public getForm(item: AnyObject): Record<string, string> {
    if (item.fabricator && item.category) {
      return {
        ...item,
        fabricator: String((item?.fabricator as { id: number }).id) || '',
        category: String((item?.category as { id: number }).id) || '',
      };
    }

    const form = Object.fromEntries(
      Object.entries(item).map(([key, value]) => [key, String(value)]),
    );

    delete form.fabricators;
    delete form.products;
    delete form.categories;

    return { ...form, id: item.id };
  }
}
