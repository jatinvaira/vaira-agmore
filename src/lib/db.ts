// import {PrismaClient} from '@prisma/client'

// declare global {
//     var prisma: PrismaClient | undefined
// }

// export const db = globalThis.print || new PrismaClient()

// if(process.env.NODE_ENV !== 'production') 
//     globalThis.prisma = db

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const isProduction = process.env.NODE_ENV === 'production';

const db = globalThis.prisma || new PrismaClient();

if (!isProduction) {
  globalThis.prisma = db;
}

export { db };