<template>
	<el-menu
		:default-active="$route.matched[1].path"
		class="el-menu-vertical-demo"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b"
		:router="true"
	>
		<el-menu-item :index="route.path" v-for="(route, index) in menuItems" :key="index">
			<i :class="route.icon"></i>
			<span>{{ route.text }}</span>
		</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		data() {
			return {
				menuItems: [
					{ icon: 'el-icon-menu', text: 'Dash Board', path: '/' },
					{ icon: 'el-icon-chat-dot-square', text: 'Bot Data', path: '/chat-bot' },
					{ icon: 'el-icon-user-solid', text: 'User', path: '/user' },
				],
			};
		},
	};
</script>

<style>
	.el-menu {
		height: 100vh;
		position: sticky;
		top: 0;
	}
</style>
