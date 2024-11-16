import { error } from '@sveltejs/kit';
import { fetchFromStrapi } from '$lib/server/strapi';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const departments = await fetchFromStrapi(
			'departments',
			`?filters[slug][$eq]=${params.department}&populate=cards`
		);

		console.log('Fetched departments:', departments);

		if (!departments.length) {
			console.log('No departments found, using fallback');
			return {
				department: {
					name: params.department,
					description: 'Department description',
					cards: []
				}
			};
		}

		const department = departments[0].attributes;
		const cards = department.cards?.data || [];

		console.log('Department cards:', cards);

		return {
			department: {
				name: department.name,
				description: department.description,
				cards: cards.map((card: any) => ({
					title: card.attributes.title,
					description: card.attributes.description,
					url: card.attributes.url || '#',
					icon: card.attributes.icon || 'FileText',
					status: card.attributes.status || 'active',
					sortOrder: card.attributes.sortOrder || 0
				}))
			}
		};
	} catch (e) {
		console.error('Error loading department:', e);
		throw error(500, 'Error loading department data');
	}
};
