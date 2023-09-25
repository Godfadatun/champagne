/* eslint-disable no-console */
import dotenv from 'dotenv';

dotenv.config();

function throwIfUndefined(secret: string): string {
  if (!process.env[secret]) {
    console.log(`Please set ${secret} environment variable`);
    process.exit(1);
  }
  return process.env[secret] as string;
}

export const PORT = throwIfUndefined('PORT');
export const BASE_URL = throwIfUndefined('BASE_URL');
export const NUMA_BASE_URL = throwIfUndefined('NUMA_BASE_URL');
export const NUMA_AUTH_URL = throwIfUndefined('NUMA_AUTH_URL');
export const NUMA_CLIENTID = throwIfUndefined('NUMA_CLIENTID');
export const NUMA_CLIENT_SECRET = throwIfUndefined('NUMA_CLIENT_SECRET');
