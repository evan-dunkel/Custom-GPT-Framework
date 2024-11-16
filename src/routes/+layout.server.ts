import { prisma } from '$lib/server/prisma';

export async function load() {
	const departments = await prisma.department.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			url: true,
			icon: true,
			cards: {
				select: {
					id: true,
					title: true,
					description: true,
					url: true,
					icon: true,
					messageTemplate: true,
					departmentId: true
				}
			}
		}
	});

	return {
		departments: departments.map((dept) => ({
			...dept,
			cards: dept.cards.map((card) => ({
				...card,
				messageTemplate: card.messageTemplate || ''
			}))
		}))
	};
}
