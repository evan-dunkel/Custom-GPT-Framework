import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query'],
		datasources: {
			db: {
				url: process.env.DATABASE_URL
			}
		}
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;