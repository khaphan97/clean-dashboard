<template>
  <el-dialog
    title="Video Generate"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form>
      <el-row> </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getListTemplates } from '@/api/synthesia';
export default {
  data() {
    return {
      dialogVisible: false,
      templates: [],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  async created() {
    const result = await getListTemplates();
    console.log(result);
  },
};
</script>
