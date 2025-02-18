import type { WebSocket } from 'ws';

declare module '#app' {
	interface NuxtApp {
		$socket: WebSocket;
	}
}

export {};
