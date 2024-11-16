import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const department = await prisma.department.findUnique({
			where: { url: params.department },
			include: { cards: true }
		});

		if (!department) {
			throw error(404, 'Department not found');
		}

		return {
			department
		};
	} catch (e) {
		console.error('Error loading department:', e);
		throw error(500, 'Error loading department');
	}
};
