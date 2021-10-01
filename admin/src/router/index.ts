import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: () => import('@/layouts/MasterLayout.vue'),
		children: [
			{
				path: '',
				name: 'Dash Board',
				component: () => import('@/pages/DashBoard.vue'),
			},
			{
				path: 'chat-bot',
				component: () => import('@/pages/ChatBot.vue'),
				children: [
					{
						path: '',
						name: 'Bot Data',
						component: () => import('@/components/ChatBot/EmptyNode.vue'),
					},
					{
						name: 'Bot Data Details',
						path: ':id',
						component: () => import('@/components/ChatBot/EmptyNode.vue'),
					},
				],
			},
			// {
			// 	path: 'chat-bot/:id',
			// 	name: 'Bot Details',
			// 	component: () => import('@/pages/ChatBot.vue'),
			// },
			{
				path: 'user',
				name: 'User',
				component: () => import('@/pages/UserPage.vue'),
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
