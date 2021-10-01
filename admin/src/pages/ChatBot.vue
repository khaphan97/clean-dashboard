<template>
	<el-container class="chatbot-container">
		<el-aside class="chatbot-aside">
			<ChatBotAside />
		</el-aside>
		<el-main>
			<router-view />
		</el-main>
	</el-container>
</template>

<script lang="ts">
	import ChatBotAside from '@/components/ChatBot/ChatBotAside.vue';
	import Vue from 'vue';

	export default Vue.extend({
		name: 'ChatBot',
		components: { ChatBotAside },
	});
</script>

<style>
	.chatbot-container {
		height: 100%;
		overflow: hidden;
	}

	.chatbot-aside {
		border-right: 1px solid #dadada;
		max-height: calc(100vh - 60px);
		overflow: hidden;
	}
</style>
