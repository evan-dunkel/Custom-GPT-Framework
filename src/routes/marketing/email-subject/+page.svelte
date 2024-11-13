<script lang="ts">
	import { pageTitle } from '$lib/stores/page';
	import AIForm from '$lib/components/ai-form.svelte';

	$pageTitle = 'Email Subject Line Generator';

	const fields = [
		{
			label: 'Current Subject Line',
			placeholder: 'Enter your current subject line'
		},
		{
			label: 'Target Audience',
			placeholder: 'Who is your target audience?'
		},
		{
			label: 'Key Message',
			placeholder: "What's the main message?"
		},
		{
			label: 'Desired Tone',
			placeholder: 'What tone would you like to use?',
			suggestions: ['Professional', 'Friendly', 'Urgent', 'Conversational']
		},
		{
			label: 'Call to Action',
			placeholder: 'What action should the reader take?',
			suggestions: ['Learn More', 'Register Now', 'Limited Time', 'Get Started']
		}
	];

	function createMessage(values: Record<string, string>) {
		return `Rewrite the email subject lines for maximum impact. As a copywriter in the marketing department, you will transform ordinary email subject lines into captivating ones that drive engagement and boost open rates.

Follow these steps:
1. Identify the current subject line: '${values['Current Subject Line']}'
2. Understand the target audience: '${values['Target Audience']}'
3. Focus on the key message to be conveyed: '${values['Key Message']}'
4. Apply the desired tone: '${values['Desired Tone']}'
5. Ensure the subject line includes a clear call to action: '${values['Call to Action']}'

The new subject line should be direct, specific, and tailored to stand out in inboxes. Present your output in a concise and compelling format.`;
	}
</script>

<AIForm
	title="Email Subject Line Generator"
	description="Transform ordinary email subject lines into captivating ones that drive engagement."
	{fields}
	messageTemplate={createMessage}
/>
