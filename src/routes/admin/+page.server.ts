import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { createSlug } from '$lib/utils';

export async function load() {
	const departments = await prisma.department.findMany({
		include: {
			cards: true
		}
	});
	return { departments };
}

export const actions = {
	createDepartment: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;

		try {
			await prisma.department.create({
				data: {
					title,
					description: data.get('description') as string,
					url: createSlug(title),
					icon: data.get('icon') as string
				}
			});
		} catch (error) {
			return fail(400, { error: 'Failed to create department' });
		}
	},

	deleteDepartment: async ({ request }) => {
		const data = await request.formData();

		try {
			await prisma.department.delete({
				where: {
					id: data.get('id') as string
				}
			});
		} catch (error) {
			return fail(400, { error: 'Failed to delete department' });
		}
	}
};
