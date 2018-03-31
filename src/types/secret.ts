/**
 *
 * Shape of default object exported by config file ( /src/secret.ts )
 *
 * this is consumed by ./src/backend/postgres/db.ts
 *
 */
export interface Secret {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}
