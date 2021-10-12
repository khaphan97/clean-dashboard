<template>
  <el-scrollbar class="list-video-wrapper">
    <el-row style="margin-right: 20px" :gutter="15" v-if="listVideos.length > 0">
      <el-col
        :span="12"
        v-for="(video, index) in listVideos"
        :key="index"
        style="margin-bottom:15px"
      >
        <div
          class="video-container"
          :class="{ selected: selectedVideo && selectedVideo === video }"
        >
          <video
            :src="video"
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
    <el-row v-else>
      <el-col :span="24">
        <el-empty description="There are no videos in here..."></el-empty>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      selectedVideo: null,
      listVideos: [],
      videoTimeout: null,
    };
  },
  computed: {
    ...mapGetters({
      botData: 'chat/botData',
    }),
  },
  methods: {
    handleSelectVideo(video) {
      if (this.selectedVideo && this.selectedVideo === video) {
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
  created() {
    const currentNode = this.botData.content.find(node => node.name === this.$route.params.id);
    if (currentNode) {
      this.listVideos = currentNode.videoHistory;
      this.selectedVideo = currentNode.videoUrl;
    }
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
