import { prisma } from '$lib/server/prisma';

export async function load() {
	const departments = await prisma.department.findMany();
	console.log(
		'Available departments:',
		departments.map((d) => ({ title: d.title, url: d.url }))
	);
	return { departments };
}
