<script lang="ts">
	import { pageTitle } from '$lib/stores/page';
	import AIForm from '$lib/components/ai-form.svelte';

	$pageTitle = 'New Contract';

	const companies = [
		{
			label: 'Esided',
			value: 'Esided Inc., 456 Tech Park, Suite 200, Silicon Valley, CA 94025'
		},
		{
			label: 'Acme Corp',
			value: 'Acme Corporation, 789 Industry Ave, Floor 15, Metro City, MC 54321'
		},
		{
			label: 'TechFlow',
			value: 'TechFlow Solutions, 321 Innovation Dr, Unit 500, Tech Hub, TH 67890'
		}
	];

	const fields = [
		{
			label: 'Client Details',
			placeholder: 'Client Details',
			suggestions: companies
		},
		{
			label: 'Contract Terms',
			placeholder: 'Contract Terms'
		},
		{
			label: 'Approval Process',
			placeholder: 'Approval Process'
		},
		{
			label: 'Delivery Method',
			placeholder: 'Delivery Method'
		}
	];

	function createMessage(values: Record<string, string>) {
		return `As a Sales Manager, please help me create a professional sales contract with the following details:

Client Information: ${values['Client Details']}
Contract Terms: ${values['Contract Terms']}
Approval Process: ${values['Approval Process']}
Delivery Method: ${values['Delivery Method']}

Please generate a detailed contract that includes standard legal protections while incorporating these specific requirements.`;
	}
</script>

<AIForm
	title="New Contract"
	description="Use this tool to generate a new sales contract."
	{fields}
	messageTemplate={createMessage}
/>
