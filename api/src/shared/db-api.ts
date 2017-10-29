import { Database, RunResult } from 'sqlite3';

export class DbApi<T> {
  constructor(private db: Database) {}

  all(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  get(sql: string, params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  run(sql: string, params: any[]): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(this: RunResult, err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
}
