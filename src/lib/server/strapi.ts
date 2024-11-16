import { STRAPI_URL, STRAPI_TOKEN } from '$env/static/private';

export async function fetchFromStrapi(endpoint: string) {
	const url = `${STRAPI_URL}/api/${endpoint}`;
	console.log('Fetching from:', url);

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${STRAPI_TOKEN}`,
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		console.log('Strapi data:', data);
		return data;
	} catch (error) {
		console.error('Error fetching from Strapi:', error);
		throw error;
	}
}
