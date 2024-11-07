import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const anthropic = createAnthropic({
	apiKey: env.ANTHROPIC_API_KEY ?? ''
});

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY ?? ''
});

export const POST = (async ({ request }) => {
	try {
		const { messages, model, service = 'openai' } = await request.json();

		if (!messages) {
			return new Response('Missing messages field', { status: 400 });
		}

		let result;

		if (service === 'anthropic') {
			result = await streamText({
				model: anthropic(model || 'claude-3-sonnet'),
				messages
			});
		} else if (service === 'openai') {
			result = await streamText({
				model: openai(model || 'gpt-4'),
				messages
			});
		} else {
			return new Response('Invalid service', { status: 400 });
		}

		return result.toDataStreamResponse();
	} catch (error) {
		console.error('Chat API error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}) satisfies RequestHandler;
