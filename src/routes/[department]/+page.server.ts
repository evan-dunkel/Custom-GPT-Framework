import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const department = await prisma.department.findUnique({
		where: { url: params.department },
		include: {
			cards: {
				select: {
					id: true,
					title: true,
					description: true,
					url: true,
					icon: true,
					messageTemplate: true,
					departmentId: true,
					createdAt: true,
					updatedAt: true
				}
			}
		}
	});

	if (!department) {
		throw error(404, 'Department not found');
	}

	return { department };
};
