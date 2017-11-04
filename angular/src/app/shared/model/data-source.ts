import { DataSource as BaseDataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';

export class DataSource<T> extends BaseDataSource<T> {
  constructor(private items: Observable<T[]>) {
    super();
  }

  connect(): Observable<T[]> {
    return this.items;
  }
  disconnect(): void {}
}
