<template>
	<div>
		<div class="chatbot-search">
			<el-input
				size="small"
				suffix-icon="el-icon-search"
				placeholder="Search chat node..."
				v-model="searchString"
			/>
		</div>
		<el-scrollbar>
			<router-link
				:to="`/chat-bot/${index}`"
				:key="index"
				v-for="(item, index) in 100"
				class="chatbot-title"
				active-class="active"
				>Chat Bot Title {{ index }}</router-link
			>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchString: '',
			};
		},
		name: 'ChatBotAside',
		components: {},
	};
</script>

<style>
	.el-scrollbar__wrap {
		max-height: calc(95vh - 60px);
	}
</style>

<style scoped>
	.chatbot-search {
		padding: 10px;
	}

	.chatbot-title {
		display: block;
		padding: 10px;
		text-decoration: none;
		color: #096dd9;
		font-size: 14px;
	}

	.chatbot-title.active,
	.chatbot-title:hover {
		color: #b37feb;
	}
</style>
