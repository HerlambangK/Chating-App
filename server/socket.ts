// server/index.ts
import { Server, ServerOptions } from 'socket.io';
import type { H3Event } from 'h3';

const options: Partial<ServerOptions> = {
	path: '/api/socket.io',
	serveClient: false,
};

export const io = new Server(options);

export function initSoket(event: H3Event) {
	//@ts-ignore
	io.attach(event.node.res.socket?.server);
	// Attach the Socket.IO server to the HTTP server
	io.of('/chat').on('connection', (socket) => {
		console.log('soket ini', socket);
		socket.emit('connexted', { message: 'You are connected to the chat' });
		socket.on('chat', (text: string) => {
			io.of('/chat').emit('chat', { id: socket?.id, text });
		});

		socket.on('disconnect', () => {
			console.log('User disconnected:', socket.id);
		});
	});
}
