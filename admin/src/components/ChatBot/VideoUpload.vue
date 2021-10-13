<template>
  <el-scrollbar class="list-video-wrapper">
    <el-row>
      <el-col :span="12">
        <label for="uploadVideo" class="upload-btn">Choose Video</label>
        <input
          id="uploadVideo"
          type="file"
          accept="video/*"
          ref="uploadVideo"
          @change="handleChange"
        />
      </el-col>
      <el-col :span="24" style="margin-top:20px;" v-if="videoFile">
        <div class="video-preview__wrapper">
          <video
            :src="videoPreviewSrc"
            ref="videoPreview"
            controls
            class="video-preview__item"
          ></video>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top:20px;" v-else>
        <div class="empty-video">
          <h3>Select Your Video To Preview Here</h3>
        </div>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      videoPreviewSrc: '',
      videoFile: null,
    };
  },

  methods: {
    handleChange(e) {
      const file = e.target.files[0];
      this.videoFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.videoPreviewSrc = reader.result;
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    },
  },
};
</script>

<style>
#uploadVideo {
  display: none;
}

.upload-btn {
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background: #096dd9;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
.upload-btn:hover {
  background: #69c0ff;
}

.video-preview__wrapper {
  max-height: 300px;
  padding-right: 20px;
}

.empty-video {
  margin: 10px;
  border: 1px dashed #cecece;
  text-align: center;
  height: 300px;
  position: relative;
}

.empty-video h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-preview__item {
  display: block;
  width: 100%;
  max-height: 400px;
}
</style>
