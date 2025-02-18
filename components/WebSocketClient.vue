<template>
	<div class="relative w-full max-w-4xl mx-auto">
		<div
			class="relative flex flex-col-reverse h-[calc(100vh_-_8rem)] overflow-y-auto"
		>
			<div
				v-for="chat in chats"
				key="i"
				:class="chat.itsMe ? 'justify-end pl-10' : 'pr-10'"
				class="relative flex mb-3"
			>
				<div
					class="inline-flex border rounded-t-xl px-3 py-2"
					:class="
						chat.itsMe
							? 'bg-green-500/10 border-green-500 rounded-bl-xl'
							: 'bg-blue-300/10 border-blue-300 rounded-br-xl'
					"
				>
					{{ chat.content }}
				</div>
			</div>
		</div>
		<div>
			<label for="chat" class="sr-only">Your message</label>
			<div
				class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
			>
				<textarea
					id="chat"
					v-model="message"
					rows="1"
					class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Your message..."
				></textarea>
				<button
					type="submit"
					@click="sendMessage"
					class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
				>
					<svg
						class="w-5 h-5 rotate-90 rtl:-rotate-90"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 20"
					>
						<path
							d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
						/>
					</svg>
					<span class="sr-only">Send message</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { io, Socket } from 'socket.io-client';

	interface Chat {
		content: string;
		itsMe: boolean;
	}
	const message = ref('');
	const chats = ref<Chat[]>([]);
	const soket = ref<Socket>();

	function sendMessage() {
		console.log('message.value', message.value);
		soket.value?.emit('chat', message.value);
		chats.value.unshift({
			content: message.value,
			itsMe: true,
		});
		nextTick(() => {
			message.value = '';
		});
	}

	onMounted(() => {
		soket.value = io('/chat', {
			path: '/api/socket.io',
		});
		console.log('soket.value', soket.value);
		// console.log('soket', soket);
		soket.value.on('chat', (response: Record<'id' | 'text', string>) => {
			if (soket.value?.id === response.id) {
				return;
			}
			chats.value.unshift({
				content: response.text,
				itsMe: false,
			});
		});
	});

	onBeforeUnmount(() => soket.value?.disconnect());
</script>

<style scoped></style>
