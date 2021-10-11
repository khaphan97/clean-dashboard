<template>
  <el-dialog
    title="Video Generate"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-row>
      <el-form>
        <el-form-item label="Callback ID">
          <el-input type="text" :value="callbackId" placeholder="abc@example.com" disabled />
        </el-form-item>

        <el-form-item label="Description">
          <el-input type="text" v-model="formVideo.description" placeholder="Video description" />
        </el-form-item>

        <el-form-item label="Template">
          <el-select v-model="formVideo.templateId" filterable placeholder="Select template...">
            <el-option
              v-for="template in templates"
              :key="template.id"
              :label="template.title"
              :value="template.id"
            />
          </el-select>
        </el-form-item>

        <template v-if="selectedTemplate && selectedTemplate.variables.length > 0">
          <h3>Template Data</h3>
          <el-form-item
            v-for="(index, variable) in selectedTemplate.variables"
            :key="index"
            :label="variable"
          >
            <el-input type="text" v-model="formVideo.templateData[variable]" />
          </el-form-item>
        </template>

        <el-form-item label="Test Mode">
          <el-switch v-model="formVideo.test"> </el-switch>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="handleGenerateVideo">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getListTemplates } from '@/api/synthesia';
import convertToSlug from '@/utils/convertToSlug';

export default {
  props: ['callbackId'],
  data() {
    return {
      dialogVisible: false,
      templates: [],
      formVideo: {
        test: true,
        description: '',
        templateId: '',
        templateData: {},
        visibility: 'public',
      },
      selectedTemplate: null,
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
      this.$message({
        type: 'success',
        message: 'Your data has been save',
      });
      this.dialogVisible = false;
    },
  },
  async created() {
    const { data } = await getListTemplates();
    this.templates = data.templates.templates;
  },
  watch: {
    'formVideo.templateId': {
      handler(val) {
        this.selectedTemplate = this.templates.find(temp => temp.id === val);

        this.selectedTemplate.variables.reduce((acc, v) => {
          acc[v] = '';
          return acc;
        }, this.formVideo.templateData);
      },
    },
  },
};
</script>

<style>
.el-dialog {
  margin-top: 5vh !important;
}
</style>
