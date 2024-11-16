<script lang="ts">
	import { pageTitle } from '$lib/stores/page';
	import AIForm from '$lib/components/ai-form.svelte';

	$pageTitle = 'SEO Content Optimizer';

	const fields = [
		{
			label: 'Website URL',
			placeholder: 'Enter your website URL'
		},
		{
			label: 'Target Keywords',
			placeholder: 'Enter target keywords'
		},
		{
			label: 'Desired Audience',
			placeholder: 'Who is your target audience?'
		},
		{
			label: 'Competitor Websites',
			placeholder: 'Enter competitor websites (optional)'
		},
		{
			label: 'Content Type',
			placeholder: 'Select content type',
			suggestions: ['Blog Post', 'Landing Page', 'Product Page', 'Service Page']
		}
	];

	function createMessage(values: Record<string, string>) {
		return `Please analyze and optimize the content for:
Website: ${values['Website URL']}
Target Keywords: ${values['Target Keywords']}
Desired Audience: ${values['Desired Audience']}
Competitor Websites: ${values['Competitor Websites']}
Content Type: ${values['Content Type']}

Provide a detailed SEO optimization plan including:
1. Keyword placement strategy
2. Content structure recommendations
3. Meta tag suggestions
4. Competitor gap analysis
5. Actionable improvements`;
	}
</script>

<AIForm
	title="SEO Content Optimizer"
	description="Optimize your content for search engines and target audience."
	{fields}
	messageTemplate={createMessage}
/>
