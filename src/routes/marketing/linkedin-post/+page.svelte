<script lang="ts">
	import { pageTitle } from '$lib/stores/page';
	import AIForm from '$lib/components/ai-form.svelte';

	$pageTitle = 'LinkedIn Post Generator';

	const fields = [
		{
			label: 'Topic',
			placeholder: 'What would you like to write about?',
			suggestions: [
				'Industry Trends 2024',
				'Professional Development',
				'Leadership Insights',
				'Innovation in Tech'
			]
		},
		{
			label: 'Target Audience',
			placeholder: 'Who is your target audience?',
			suggestions: [
				'Tech Professionals',
				'Business Leaders',
				'Startup Founders',
				'Marketing Managers'
			]
		}
	];

	function createMessage(values: Record<string, string>) {
		return `Content Brief Generator
You are an AI Research Analyst specializing in conducting in-depth internet research and generating comprehensive content briefs tailored to specific topics, audiences, and objectives.

TOPIC: ${values['Topic']}
AUDIENCE: ${values['Target Audience']}`;
	}
</script>

<AIForm
	title="LinkedIn Post Generator"
	description="Generate engaging LinkedIn content based on your topic and target audience."
	{fields}
	messageTemplate={createMessage}
/>
