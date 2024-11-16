import { writable } from 'svelte/store';

export interface DepartmentCard {
	title: string;
	description: string;
	url: string;
	icon: string;
	cardStatus: 'active' | 'development';
}

export interface Department {
	name: string;
	slug: string;
	description: string;
	cards: DepartmentCard[];
}

export const departments = writable<Department[]>([]);

export async function fetchDepartmentCards(slug: string) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_STRAPI_URL}/api/departments?filters[slug]=${slug}&populate=cards`
		);
		const data = await response.json();
		return data.data[0].attributes.cards;
	} catch (error) {
		console.error('Error fetching department cards:', error);
		return [];
	}
}

export async function fetchDepartments() {
	try {
		const response = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/departments`);
		const data = await response.json();
		departments.set(data.data.map((d) => d.attributes));
	} catch (error) {
		console.error('Error fetching departments:', error);
	}
}
