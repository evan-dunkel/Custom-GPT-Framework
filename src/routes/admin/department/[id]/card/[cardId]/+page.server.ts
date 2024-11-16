import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const card = await prisma.card.findUnique({
		where: { id: params.cardId },
		include: {
			fields: true,
			department: true
		}
	});

	if (!card) {
		throw error(404, 'Card not found');
	}

	return {
		card
	};
};

export const actions = {
	createField: async ({ request, params }) => {
		const data = await request.formData();

		await prisma.field.create({
			data: {
				label: data.get('name') as string,
				placeholder: data.get('placeholder') as string,
				type: data.get('type') as string,
				required: data.get('required') === 'true',
				cardId: params.cardId,
				suggestions: []
			}
		});
	},

	deleteField: async ({ request }) => {
		const data = await request.formData();

		await prisma.field.delete({
			where: {
				id: data.get('id') as string
			}
		});
	}
};
