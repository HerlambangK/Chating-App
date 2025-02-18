// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

	build: {
		transpile: ['@headlessui/vue'],
	},

	telemetry: false,

	// Non-SSR mode
	ssr: false,

	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
		},
	},

	// vite: {
	// 	server: {
	// 		proxy: {
	// 			'/api': {
	// 				target: process.env.API_BASE_URL || 'http://localhost:3000',
	// 				changeOrigin: true,
	// 				rewrite: (path) => path.replace(/^\/api/, ''),
	// 			},
	// 		},
	// 	},
	// },

	compatibilityDate: '2025-02-14',
});
