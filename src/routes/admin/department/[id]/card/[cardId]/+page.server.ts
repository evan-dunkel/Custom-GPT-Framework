import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

		console.log('Raw fields JSON:', fieldsJson); // Debug raw JSON

		try {
			const fields = JSON.parse(fieldsJson || '[]');
			console.log('Parsed fields:', fields); // Debug parsed fields

			const result = await prisma.$transaction(async (tx) => {
				// Update card first
				const updatedCard = await tx.card.update({
					where: { id: params.cardId },
					data: {
						title: formData.get('title')?.toString(),
						description: formData.get('description')?.toString(),
						icon: formData.get('icon')?.toString(),
						messageTemplate: formData.get('messageTemplate')?.toString()
					}
				});

				// Delete existing fields
				await tx.field.deleteMany({
					where: { cardId: params.cardId }
				});

				if (fields && fields.length > 0) {
					// Create new fields one at a time to better track any issues
					const createdFields = [];
					for (const field of fields) {
						console.log('Creating field:', field); // Debug each field
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
					console.log('Created fields:', createdFields); // Debug created fields
					return { card: updatedCard, fields: createdFields };
				}

				return { card: updatedCard, fields: [] };
			});

			console.log('Transaction completed:', result);
			return { success: true };
		} catch (err) {
			console.error('Error updating card:', err);
			console.error('Error details:', {
				message: err.message,
				code: err.code,
				meta: err.meta
			});
			throw error(500, {
				message: 'Failed to update card',
				error: err instanceof Error ? err.message : String(err)
			});
		}
	}
};
