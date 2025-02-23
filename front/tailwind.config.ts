import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
		container: {
			screens: {
				sm: "100%", // Full width on small screens
				md: "640px",
				lg: "768px",
				xl: "1024px",
				"2xl": "1280px", // Custom max width for ultra-wide screens
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
