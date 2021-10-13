<template>
  <el-dialog
    title="Video Generate"
    width="50%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    v-if="dialogVisible"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="Create" name="create">
        <VideoGenerate ref="VideoGenerate" :callbackId="callbackId" />
      </el-tab-pane>
      <el-tab-pane label="Videos" name="video">
        <VideoHistory ref="VideoHistory" />
      </el-tab-pane>
      <el-tab-pane label="Upload" name="upload">
        <VideoUpload ref="VideoUpload" />
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="handleGenerateVideo" v-if="activeName === 'create'"
        >Confirm</el-button
      >
      <el-button type="primary" @click="handleSelectVideo" v-else-if="activeName === 'video'"
        >Save</el-button
      >
      <el-button type="primary" @click="handleUploadVideo" v-else :loading="isLoading"
        >Upload</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import VideoGenerate from './VideoGenerate.vue';
import VideoHistory from './VideoHistory.vue';
import VideoUpload from './VideoUpload.vue';
import { getSignatureKey, saveVideoHistory } from '../../api/cloudinary';
import axios from 'axios';

export default {
  components: { VideoGenerate, VideoHistory, VideoUpload },
  props: ['callbackId'],
  data() {
    return {
      dialogVisible: false,
      activeName: 'create',
      isLoading: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(_ => {
          done();
        })
        .catch(err => {
          console.log(err);
        });
    },
    async handleGenerateVideo() {
      const { formVideo } = this.$refs.VideoGenerate;

      this.$emit('handleCreateVideo', {
        formVideo,
      });
      this.successMessage();
    },

    handleSelectVideo() {
      const { selectedVideo } = this.$refs.VideoHistory;
      this.$emit('handleSelectedVideo', {
        selectedVideo,
      });
      this.successMessage();
    },
    async handleUploadVideo() {
      const { videoFile } = this.$refs.VideoUpload;
      const timestamp = (Date.now() / 1000) | 0;

      this.isLoading = true;
      const { data } = await getSignatureKey(timestamp);

      let formVideo = new FormData();
      formVideo.append('file', videoFile);
      formVideo.append('api_key', '184887413631269');
      formVideo.append('timestamp', timestamp);
      formVideo.append('signature', data);

      const video = await axios.post(
        'https://api.cloudinary.com/v1_1/khaphanhuy/video/upload',
        formVideo
      );
      this.isLoading = false;

      await saveVideoHistory({ nodeName: this.$route.params.id, videoUrl: video.data.secure_url });
      this.$refs.VideoHistory.handleAddNewVideo(video.data.secure_url);
      this.dialogVisible = false;
      this.successMessage();

      this.$emit('handleUploadVideo', {
        selectedVideo: video.data.secure_url,
        videoHistory: this.$refs.VideoHistory.listVideos,
      });
    },

    successMessage() {
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
  max-height: 450px;
}
</style>
