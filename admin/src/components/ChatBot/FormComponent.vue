<template>
  <div class="form-wrapper">
    <h2 class="form-title">{{ nodeId || 'Add New Node' }}</h2>
    <el-form label-position="top" class="form-container">
      <!-- Form Data Type, UI -->
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="TYPE">
            <el-radio-group v-model="formData.type" :disabled="nodeId && true">
              <el-radio-button :label="type.label" v-for="(type, index) in typeData" :key="index">
                {{ type.text }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="UI">
            <el-radio-group v-model="formData.ui">
              <el-radio-button :label="type.label" v-for="(type, index) in uiData" :key="index">
                {{ type.text }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- End Form Data Type, UI -->

      <!-- Form Data Name, Text -->
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Node Name">
            <el-input
              v-model="formData.name"
              placeholder="Input node name..."
              :disabled="nodeId && true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Text">
            <el-input v-model="formData.text" placeholder="Input text..." />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- END Form Data Type, UI -->

      <!-- Video Tite, URL -->
      <transition name="fade">
        <el-row :gutter="10" v-if="formData.type === 'video'">
          <el-col :span="12">
            <el-form-item label="Video Title">
              <el-input placeholder="Input Video Title..." v-model="formData.videoTitle" />
            </el-form-item>
          </el-col>

          <el-col :span="12" style="position: relative;">
            <el-form-item label="Video URL">
              <el-input placeholder="https//www.example.com" v-model="formData.videoUrl" disabled />
            </el-form-item>
            <VideoModal
              ref="VideoModal"
              :callbackId="formData.name"
              @handleCreateVideo="handleCreateVideo"
              @handleSelectedVideo="handleSelectedVideo"
            />
            <el-button
              type="primary"
              style="position:absolute; top:0 ; right:7px"
              @click="handleOpenVideoModal"
              >Generate Video</el-button
            >
          </el-col>
        </el-row>
        <el-row v-else>
          <el-form-item label="Regex">
            <el-input placeholder="Input Regex..." v-model="formData.regex"></el-input>
          </el-form-item>
        </el-row>
      </transition>
      <!-- END Video Title, URL-->

      <!-- Button -->
      <ButtonNode ref="ButtonComponent" :buttonNode="formData.buttons" :nodeNames="nodeNames" />
      <!-- End Button -->

      <ConditionNode ref="ConditionComponent" :conditionNode="formData.condition" />

      <el-row style="margin: 30px 0">
        <el-col :span="24" style="margin-bottom: 10px">
          <el-button
            :type="nodeId ? 'success' : 'primary'"
            style="width: 100%;"
            @click="handleClickFormButton"
            :loading="isLoading"
          >
            {{ nodeId ? 'Update' : 'Add' }}
          </el-button>
        </el-col>
        <el-col :span="24" v-if="nodeId">
          <el-button
            type="danger"
            style="width: 100%;"
            @click="handleConfirmDelete"
            :loading="isLoading"
            >Delete</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { uiData, typeData } from '@/constants/formData';
import { mapGetters } from 'vuex';
import ButtonNode from './ButtonNode.vue';
import ConditionNode from './ConditionNode.vue';
import convertToSlug from '@/utils/convertToSlug';
import VideoModal from './VideoModal.vue';

const initFormData = {
  type: 'text',
  ui: 'regular',
  name: '',
  text: '',
  buttons: [],
  condition: [],
  regex: '',
  videoTitle: '',
  videoUrl: '',
  videoHistory: [],
};

export default {
  components: { ButtonNode, ConditionNode, VideoModal },
  name: 'form-component',
  props: ['isLoading'],
  data() {
    return {
      nodeId: this.$route.params.id,
      formData: null,
      uiData,
      typeData,
      formVideo: null,
    };
  },
  methods: {
    async handleClickFormButton() {
      const newFormData = JSON.parse(JSON.stringify(this.formData));
      newFormData.name = convertToSlug(newFormData.name);

      newFormData.buttons.forEach(btn => {
        if (btn.event === 'capture') btn.data = JSON.stringify(btn.data);
      });

      let formVideoData = null;
      if (this.formVideo) {
        formVideoData = {
          ...this.formVideo,
          title: newFormData.videoTitle,
          callbackId: newFormData.name,
        };
      }

      await this.$emit('handleCreateNode', {
        args: {
          nodeId: this.nodeId,
          formData: newFormData,
          formVideoData,
        },
        done: isSuccess => {
          if (isSuccess) {
            this.formData = { ...initFormData };
          }
        },
      });
    },
    async handleConfirmDelete() {
      if (confirm('Are you sure to delete this node ?')) {
        await this.$emit('handleDeleteNode', this.nodeId);
      }
    },
    handleInitFormValues() {
      if (this.nodeId) {
        this.formData = { ...this.botData.content.find(node => node.name === this.nodeId) };
      } else {
        this.formData = JSON.parse(JSON.stringify(initFormData));
      }
    },
    handleOpenVideoModal() {
      this.$refs.VideoModal.dialogVisible = true;
    },
    handleCreateVideo({ formVideo }) {
      this.formData.videoUrl = 'You video will finished in minutes...';
      this.formVideo = formVideo;
    },
    handleSelectedVideo({ selectedVideo }) {
      this.formData.videoUrl = selectedVideo;
      this.formVideo = null;
    },
  },
  computed: {
    ...mapGetters({
      botData: 'chat/botData',
    }),
    nodeNames() {
      return this.botData.content.map(node => node.name);
    },
  },
  watch: {
    '$route.params.id': {
      handler(val) {
        this.nodeId = val;
        this.handleInitFormValues();
      },
    },
  },
  created() {
    this.handleInitFormValues();
  },
  mounted() {
    this.$watch('$refs.ButtonComponent.buttons', new_value => {
      this.formData.buttons = new_value;
    });
    this.$watch('$refs.ConditionComponent.condition', new_value => {
      this.formData.condition = new_value;
    });
  },
};
</script>

<style>
.form-wrapper {
  max-height: calc(95vh - 60px);
  max-width: 100%;
  overflow-y: auto;
}

.form-container {
  padding: 20px;
  border: 1px solid #dadada;
  border-radius: 3px;
}

.form-title {
  text-align: center;
  padding: 10px;
}
</style>
