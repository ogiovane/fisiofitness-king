import {MatPaginatorIntl} from "@angular/material/paginator";

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Itens por pág.';
  customPaginatorIntl.firstPageLabel = 'Primeira pág.';
  customPaginatorIntl.lastPageLabel = 'Última pág.';
  customPaginatorIntl.nextPageLabel = 'Próxima';
  customPaginatorIntl.previousPageLabel = 'Anterior';
  return customPaginatorIntl;
}
