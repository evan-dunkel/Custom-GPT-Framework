import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function createSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function extractVariables(template: string = ''): string[] {
	const curlyBraceMatches = template.match(/\{([^}]+)\}/g) || [];
	const squareBracketMatches = template.match(/\[([^\]]+)\]/g) || [];

	const curlyVariables = curlyBraceMatches.map((match) => match.slice(1, -1));
	const squareVariables = squareBracketMatches.map((match) => match.slice(1, -1));

	// Combine both arrays and remove duplicates
	return [...new Set([...curlyVariables, ...squareVariables])];
}
