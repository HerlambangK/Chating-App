import { createRouter, useBase } from 'h3';
import { initSoket } from '../socket';
const router = createRouter();
router.get(
	'/socket.io',
	defineEventHandler((event) => {
		initSoket(event);
	})
);

export default useBase('/api', router.handler);
