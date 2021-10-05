<template>
  <div class="video-wrapper" :class="{ animated: isAnimated }">
    <div class="btn-audio">
      <img src="../assets/volume.png" alt="" v-if="!isMuted" @click="handleToggleVolume" />
      <img src="../assets/mute-speaker.png" alt="" v-else @click="handleToggleVolume" />
    </div>
    <video
      ref="videoPlayer"
      controls
      data-setup='{"userActions": {"doubleClick": false }}'
      class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause vjs-fill bg-video"
      :id="`${videoId}`"
      :videoId="videoId"
      :autoplay="autoplay"
      @click="togglePause"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import { mapGetters } from 'vuex';
export default {
  props: ['videoId', 'videoURL', 'isAnimated'],
  data() {
    return {
      player: null,
      isMuted: false,
      isPause: false,
    };
  },
  computed: {
    ...mapGetters({
      autoplay: 'chat/autoplay',
      timeout: 'chat/timeout',
    }),
  },
  methods: {
    handleToggleVolume() {
      this.isMuted = !this.isMuted;
      this.player.muted(this.isMuted);
    },
    togglePause() {
      event.stopPropagation();
      this.isPause = !this.isPause;
      // Implement for mobile only
      this.isPause ? this.player.pause() : this.player.play();
    },
  },
  mounted() {
    this.player = videojs(this.videoId, {
      fill: true,
      fullscreenToggle: false,
    });

    this.player.src({ type: 'video/mp4', src: this.videoURL });
    this.player.on('play', () => {
      this.$emit('showTitle');
    });
  },
  beforeDestroy() {
    if (this.player) {
      setTimeout(() => {
        this.player.dispose();
      }, this.timeout);
    }
  },
};
</script>

<style>
.video-js {
  border-radius: 20px;
}
.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.btn-audio {
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 20;
  opacity: 0;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
}

.video-wrapper.animated .video-js .vjs-tech {
  opacity: 0.8;
}
.video-wrapper.animated .btn-audio {
  animation: fadeIn 0.5s ease-in-out forwards;
}

/* Overdrive Player CSS */

.vjs-control-bar {
  display: none !important;
}

.video-js .vjs-tech {
  object-fit: cover !important;
}
</style>
