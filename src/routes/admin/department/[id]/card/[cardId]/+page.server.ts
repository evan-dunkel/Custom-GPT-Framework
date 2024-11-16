import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { extractVariables } from '$lib/utils';

// Define interfaces for our field types
interface BaseField {
	id: string;
	label: string;
	placeholder: string;
	type: string;
	required: boolean;
	suggestions: string[];
}

interface ExistingField extends BaseField {
	cardId: string;
}

interface NewField extends BaseField {
	cardId: string;
}

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

	console.log('Server Load - Card Fields:', card.fields);
	return { card };
};

export const actions = {
	updateCard: async ({ request, params }) => {
		const formData = await request.formData();
		const fieldsJson = formData.get('fields')?.toString();
		const messageTemplate = formData.get('messageTemplate')?.toString() || '';

		try {
			const fields = JSON.parse(fieldsJson || '[]');
			const templateVariables = extractVariables(messageTemplate);

			// Filter out fields that aren't in the template variables
			const validFields = fields.filter((field) => templateVariables.includes(field.label));

			const result = await prisma.$transaction(async (tx) => {
				// Update card first
				const updatedCard = await tx.card.update({
					where: { id: params.cardId },
					data: {
						title: formData.get('title')?.toString(),
						description: formData.get('description')?.toString(),
						icon: formData.get('icon')?.toString(),
						messageTemplate
					}
				});

				// Delete existing fields
				await tx.field.deleteMany({
					where: { cardId: params.cardId }
				});

				if (validFields.length > 0) {
					const createdFields = [];
					for (const field of validFields) {
						const createdField = await tx.field.create({
							data: {
								id: field.id,
								label: field.label,
								placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
								type: field.type || 'text',
								required: Boolean(field.required),
								suggestions: Array.isArray(field.suggestions) ? field.suggestions : [],
								cardId: params.cardId
							}
						});
						createdFields.push(createdField);
					}
					return { card: updatedCard, fields: createdFields };
				}

				return { card: updatedCard, fields: [] };
			});

			return { success: true };
		} catch (err) {
			console.error('Error updating card:', err);
			throw error(500, {
				message: 'Failed to update card',
				error: err instanceof Error ? err.message : String(err)
			});
		}
	}
};
