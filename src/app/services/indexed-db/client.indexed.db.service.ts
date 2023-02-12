import { Injectable, NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private database: string = "indexedDB";
  protected collection: string = "default";
  private db: IDBDatabase | undefined;
  private store: IDBObjectStore | undefined;

  constructor() {}

  public initDB(name: string, collection: string): this {
    this.database = name ?? this.database;
    this.collection = collection ?? this.collection;
    const request = indexedDB.open(this.database, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.store = this.db.createObjectStore(this.collection, { keyPath: 'id' });
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.store = this.db.transaction(this.collection, 'readwrite').objectStore(this.collection);
    };
    return this;
  }

  addData(data: any) {
    if (this.store && this.db) {
      const transaction = this.db.transaction(this.collection, 'readwrite');
      this.store = transaction.objectStore(this.collection);
      this.store.add(data);
    }
  }

  getData(key: string | number) {
    return new Promise((resolve) => {
      if(!this.store || !this.db) {
        return resolve(null);
      }
      const transaction = this.db.transaction(this.collection, 'readwrite');
      this.store = transaction.objectStore(this.collection);
      const request = this.store.get(key);
      request.onsuccess = (event: Event) => {
        const data = (event.target as IDBRequest).result;
        resolve(data ? data : null);
      };
      request.onerror = (event: Event) => {
        resolve(null);
      };
    });
  }

  getAllData() {
    return new Promise((resolve, reject) => {
      if(!this.store || !this.db) {
        return resolve(null);
      }
      const transaction = this.db.transaction(this.collection, 'readwrite');
      this.store = transaction.objectStore(this.collection);
      const request = this.store.getAll();
      request.onsuccess = (event: Event) => {
        const data = (event.target as IDBRequest).result;
        resolve(data);
      };
      request.onerror = (event: Event) => {
        reject(event);
      };
    });
  }

  deleteData(key: string | number) {
    if (this.store && this.db) {
      const transaction = this.db.transaction(this.collection, 'readwrite');
      this.store = transaction.objectStore(this.collection);
      this.store.delete(key);
    }
  }

  clearData() {
    if (this.store && this.db) {
      const transaction = this.db.transaction(this.collection, 'readwrite');
      this.store = transaction.objectStore(this.collection);
      this.store.clear();
    }
  }
}

