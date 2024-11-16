import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const card = await prisma.card.findFirst({
		where: {
			url: params.card,
			department: {
				url: params.department
			}
		},
		include: {
			fields: true,
			department: true
		}
	});

	if (!card) {
		throw error(404, 'Card not found');
	}

	return { card };
};
