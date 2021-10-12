<template>
	<el-dialog
		title="Video Generate"
		:visible.sync="dialogVisible"
		width="70%"
		:before-close="handleClose"
	>
		<el-tabs v-model="activeName">
			<el-tab-pane label="Create" name="create">
				<VideoGenerate ref="VideoGenerate" :callbackId="callbackId" />
			</el-tab-pane>
			<el-tab-pane label="Videos" name="video">
				<VideoHistory ref="VideoHistory" />
			</el-tab-pane>
		</el-tabs>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">Cancel</el-button>
			<el-button type="primary" @click="handleGenerateVideo">Confirm</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import VideoGenerate from './VideoGenerate.vue';
	import VideoHistory from './VideoHistory.vue';
	export default {
		components: { VideoGenerate, VideoHistory },
		props: ['callbackId'],
		data() {
			return {
				dialogVisible: false,
				activeName: 'create',
			};
		},
		methods: {
			handleClose(done) {
				this.$confirm('Are you sure to close this dialog?', 'Warning', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					type: 'warning',
				})
					.then((_) => {
						done();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			async handleGenerateVideo() {
				const { formVideo } = this.$refs.VideoGenerate;
				const { selectedVideo } = this.$refs.VideoHistory;
				const isCreateVideo = selectedVideo ? false : true;

				this.$emit('getModalData', {
					formVideo,
					selectedVideo,
					isCreateVideo,
				});

				this.$message({
					type: 'success',
					message: 'Your data has been save',
				});

				this.dialogVisible = false;
			},
		},
	};
</script>

<style>
	.el-dialog {
		margin-top: 5vh !important;
	}

	.list-video-wrapper .el-scrollbar__wrap {
		max-height: 400px;
	}
</style>
