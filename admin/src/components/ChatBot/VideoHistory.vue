<template>
	<el-scrollbar class="list-video-wrapper">
		<el-row style="margin-right: 20px" :gutter="15">
			<el-col
				:span="12"
				v-for="(video, index) in listVideos"
				:key="index"
				style="margin-bottom:15px"
			>
				<div
					class="video-container"
					:class="{ selected: selectedVideo && selectedVideo.id === video.id }"
				>
					<video
						src="https://res.cloudinary.com/khaphanhuy/video/upload/v1633961277/work.mp4"
						class="video-item"
						loop
						@click="handleSelectVideo(video)"
						@mouseover="handlePlayVideo"
						@mouseleave="handlePauseVideo"
					></video>
					<img src="@/assets/checked.png" class="checked-icon" alt="" />
				</div>
			</el-col>
		</el-row>
	</el-scrollbar>
</template>

<script>
	export default {
		data() {
			return {
				selectedVideo: null,
				listVideos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
				videoTimeout: null,
			};
		},
		methods: {
			handleSelectVideo(video) {
				if (this.selectedVideo && this.selectedVideo.id === video.id) {
					this.selectedVideo = null;
					return;
				}
				this.selectedVideo = video;
			},
			handlePlayVideo() {
				const e = event;
				this.videoTimeout = setTimeout(() => {
					e.target.play();
				}, 500);
			},
			handlePauseVideo() {
				clearTimeout(this.videoTimeout);
				event.target.pause();
			},
		},
	};
</script>

<style>
	.video-container {
		overflow: hidden;
		position: relative;
		border: 4px solid white;
		transition: all 0.3s ease-in-out;
		background: black;
	}

	.video-item {
		display: block;
		width: 100%;
		cursor: pointer;
		object-fit: cover !important;
		transition: all 0.3s ease-in-out;
		top: 0;
		left: 0;
	}

	.video-item:hover {
		transform: scale(1.1);
	}

	.video-container.selected {
		border: 4px solid #389e0d;
	}

	.checked-icon {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		top: 10px;
		right: 10px;
		width: 25px;
		transition: all 0.3s ease-in-out;
	}

	.video-container.selected .checked-icon {
		visibility: visible;
		opacity: 1;
	}
</style>
