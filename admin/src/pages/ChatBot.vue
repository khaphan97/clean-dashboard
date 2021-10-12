<template>
	<el-container v-loading="!botData">
		<el-container class="chatbot-container" v-if="botData">
			<el-aside class="chatbot-aside">
				<ChatBotAside :botData="botData" />
			</el-aside>
			<el-main style="padding:10px">
				<router-view
					@handleCreateNode="handleCreateNode"
					@handleDeleteNode="handleDeleteNode"
					:isLoading="isLoading"
				/>
			</el-main>
		</el-container>
		<el-container v-else class="loading-container">
			Loading...
		</el-container>
	</el-container>
</template>

<script>
	import ChatBotAside from '../components/ChatBot/ChatBotAside.vue';
	import { mapGetters, mapMutations } from 'vuex';
	import { botData } from '../graphql/queries';
	import { createContent, deleteContent, updateContent } from '../graphql/mutations';
	import { stripTypenames } from '../helpers/stripTypenames';
	import { generateVideo } from '@/api/synthesia';

	const idContent = '615458a83bcdffe4da541e21';

	export default {
		name: 'ChatBot',
		data() {
			return {
				isLoading: false,
			};
		},
		computed: {
			...mapGetters({
				botData: 'chat/botData',
			}),
		},
		methods: {
			...mapMutations({
				setBotData: 'chat/SET_BOT_DATA',
			}),

			handleCreateNode({ args, done }) {
				this.isLoading = true;
				this.apolloCreateNode(args, done);

				// Handle uplod video
				if (args.isCreateVideo) {
					generateVideo({ data: args.formVideoData });
				}
			},

			handleDeleteNode(nodeId) {
				this.isLoading = true;
				this.$apollo
					.mutate({
						mutation: deleteContent,
						variables: {
							idContent,
							name: nodeId,
						},
					})
					.then((data) => {
						this.setBotData(data.data.deleteContent);
						this.$message({
							type: 'success',
							message: 'Delete node success',
						});
						this.isLoading = false;
						this.$router.push({ path: '/chat-bot' });
					})
					.catch((error) => {
						this.$message({
							type: 'error',
							message: error.graphQLErrors[0].message,
						});
						this.isLoading = false;
					});
			},

			apolloCreateNode(args, done) {
				if (!args.nodeId) {
					this.$apollo
						.mutate({
							mutation: createContent,
							variables: {
								idContent,
								dto: args.formData,
							},
						})
						.then((data) => {
							this.setBotData(data.data.createContent);
							this.$message({
								type: 'success',
								message: 'Add new node success',
							});
							this.isLoading = false;
							return done(true);
						})
						.catch((error) => {
							this.$message({
								type: 'error',
								message: error.graphQLErrors[0].message,
							});
							this.isLoading = false;
							return done(false);
						});
				} else {
					this.$apollo
						.mutate({
							mutation: updateContent,
							variables: {
								idContent,
								updatedNode: stripTypenames(args.formData),
							},
						})
						.then((data) => {
							this.setBotData(data.data.updateContent);
							console.log(data);
							this.$message({
								type: 'success',
								message: 'Edit node success',
							});
							this.isLoading = false;
						})
						.catch((error) => {
							this.$message({
								type: 'error',
								message: error.message,
							});
							this.isLoading = false;
						});
				}
			},
		},
		created() {
			this.$apollo
				.query({
					query: botData,
					variables: {
						id: idContent,
					},
				})
				.then((res) => {
					this.setBotData(res.data.botData);
				})
				.catch((error) => {
					this.$message({
						type: 'error',
						message: error.graphQLErrors[0].message,
					});
				});
		},
		components: { ChatBotAside },
	};
</script>

<style>
	.chatbot-container {
		height: 100%;
		overflow: hidden;
	}

	.chatbot-aside {
		border-right: 1px solid #dadada;
		height: calc(100vh - 60px);
		overflow: hidden;
	}

	.loading-container {
		height: calc(100vh - 60px);
		width: 100%;
	}
</style>
