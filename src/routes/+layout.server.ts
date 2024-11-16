import { fetchFromStrapi } from '$lib/server/strapi';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const response = await fetchFromStrapi('departments');
		console.log('Response from Strapi:', response);

		return {
			departments:
				response?.data?.map((dept: any) => ({
					name: dept.name || 'Unnamed Department',
					slug: dept.slug || '#',
					icon: dept.icon || 'FileText'
				})) || []
		};
	} catch (e) {
		console.error('Error loading departments:', e);
		return {
			departments: []
		};
	}
};
