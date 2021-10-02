<template>
  <div class="form-wrapper">
    <h2 class="form-title">{{ nodeId || 'Add New Node' }}</h2>
    <el-form label-position="top" class="form-container">
      <!-- Form Data Type, UI -->
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="TYPE">
            <el-radio-group v-model="formData.type">
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
            <el-input v-model="formData.name" placeholder="Input node name..." />
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
            <el-form-item label="Video Title" v-model="formData.videoTitle">
              <el-input placeholder="Input Video Title..." />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Video Url" v-model="formData.videoUrl">
              <el-input placeholder="Input Video Url..." />
            </el-form-item>
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
      <ButtonNode ref="ButtonComponent" />
      <!-- End Button -->

      <ConditionNode />
    </el-form>
  </div>
</template>

<script>
import { uiData, typeData } from '@/constants/formData';
import ButtonNode from './ButtonNode.vue';
import ConditionNode from './ConditionNode.vue';

export default {
  components: { ButtonNode, ConditionNode },
  name: 'form-component',
  data() {
    return {
      nodeId: null,
      formData: {
        type: 'text',
        ui: 'regular',
        name: '',
        text: '',
        buttons: [],
        regex: '',
        videoTitle: '',
        videoUrl: '',
      },
      uiData,
      typeData,
    };
  },
  watch: {
    '$route.params.id': {
      handler(val) {
        this.nodeId = val;
      },
    },
  },
  mounted() {
    this.$watch('$refs.ButtonComponent.buttons', new_value => {
      this.formData.buttons = new_value;
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
