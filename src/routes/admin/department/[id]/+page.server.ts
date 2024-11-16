import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createSlug } from '$lib/utils';
import * as icons from 'lucide-svelte';

export const load: PageServerLoad = async ({ params }) => {
	const department = await prisma.department.findUnique({
		where: { id: params.id },
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

	return {
		department
	};
};

export const actions = {
	createCard: async ({ request, params }) => {
		const data = await request.formData();
		const title = data.get('title') as string;

		await prisma.card.create({
			data: {
				title,
				description: data.get('description') as string,
				url: createSlug(title),
				icon: data.get('icon') as string,
				messageTemplate: data.get('messageTemplate') as string,
				departmentId: params.id
			}
		});
	},

	deleteCard: async ({ request }) => {
		const data = await request.formData();

		await prisma.card.delete({
			where: {
				id: data.get('id') as string
			}
		});
	}
};
