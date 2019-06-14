import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Injectable()
export class PtBrMatPaginatorIntl extends MatPaginatorIntl {

  itemsPerPageLabel = 'Qtd. por página';
  nextPageLabel = 'Próximo';
  previousPageLabel = 'Anterior';

  getRangelLabel(page: any, pageSize: any, length: any): string {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' / ' + length;
  };

}
