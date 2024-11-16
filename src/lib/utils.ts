import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

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

export const flyAndScale = (
	node: Element,
	params: { y: number; duration?: number; delay?: number } = { y: 8 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 150,
		delay: params.delay ?? 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y, 0]);
			const scale = scaleConversion(t, [0, 1], [0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(0, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
