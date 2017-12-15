import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { mergeMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

export abstract class BaseService<T extends { id: number }> {
  protected abstract baseUrl: string;
  public items: Observable<T[]>;
  protected loaded = false;
  protected _items: BehaviorSubject<T[]>;
  protected dataStore: {
    items: T[];
  };

  constructor(protected http: HttpClient) {
    this.dataStore = { items: [] };
    this._items = <BehaviorSubject<T[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  load() {
    return Observable.from([!this.loaded]).pipe(
      mergeMap(loaded => {
        if (loaded) {
          return this.http.get(this.baseUrl);
        } else {
          return Observable.of(this.dataStore.items);
        }
      }),
      map((items: T[]) => {
        this.loaded = true;
        this.dataStore.items = items;
        this._items.next([...this.dataStore.items]);
        return items;
      }),
    );
  }
  add(item: T): Observable<T> {
    return this.http.post(this.baseUrl, item).map((newItem: T): T => {
      this.dataStore.items.push(newItem);
      this._items.next([...this.dataStore.items]);
      return newItem;
    });
  }

  update(item: T): Observable<T> {
    return this.http
      .put(`${this.baseUrl}/${item.id}`, item)
      .map((updatedItem: T): T => {
        const index = this.dataStore.items.findIndex(
          existingItem => existingItem.id === item.id,
        );
        this.dataStore.items[index] = item;
        this._items.next([...this.dataStore.items]);
        return updatedItem;
      });
  }

  delete(item: T): Observable<T> {
    return this.http.delete(`${this.baseUrl}/${item.id}`).map((): T => {
      const index = this.dataStore.items.findIndex(
        existingItem => existingItem.id === item.id,
      );
      this.dataStore.items.splice(index, 1);
      this._items.next([...this.dataStore.items]);
      return item;
    });
  }
}
