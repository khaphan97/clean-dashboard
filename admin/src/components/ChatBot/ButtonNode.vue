<template>
  <el-row :gutter="10" class="button-node">
    <el-col :span="24" class="btn-group">
      <h3 style="text-align:center">BUTTONS</h3>
      <transition-group name="fade">
        <div class="btn-wrapper" v-for="(button, index) in buttons" :key="`${index}abc`">
          <div class="btn-item">
            <span class="btn-close-icon" @click="handleRemoveButton(index)">
              <i class="el-icon-close"></i>
            </span>
            <h4 style="text-align:center">Button {{ index + 1 }}</h4>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="Event">
                  <el-radio-group v-model="button.event" @change="handleChangeButtonData(index)">
                    <el-radio-button
                      :label="type.label"
                      v-for="(type, index) in eventButton"
                      :key="index"
                    >
                      {{ type.text }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="Text">
                  <el-input v-model="button.text" placeholder="Input button text..." />
                </el-form-item>
              </el-col>

              <template v-if="button.event === 'capture'">
                <el-col :span="12">
                  <el-form-item label="Key">
                    <el-input placeholder="Input capture key..." v-model="button.data.key" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Value">
                    <el-input v-model="button.data.value" placeholder="Input capture value ..." />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="Button Data">
                    <el-select placeholder="Choose button data..." v-model="button.data.next">
                      <el-option :value="name" v-for="name in nodeNames" :key="name">{{
                        name
                      }}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </template>

              <el-col :span="24" v-else>
                <el-form-item label="Button Data">
                  <el-select placeholder="Choose button data..." v-model="button.data">
                    <el-option :value="name" v-for="name in nodeNames" :key="name">{{
                      name
                    }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </transition-group>

      <div style="text-align: center; margin : 20px 0 ">
        <el-button icon="el-icon-plus" circle @click="handleAddButton"></el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { eventButton } from '@/constants/formData';
import { parseButtons } from '@/utils/button';
export default {
  props: ['buttonNode', 'nodeNames'],
  name: 'button-node',
  data() {
    return {
      buttons: parseButtons(this.buttonNode) || [],
      eventButton,
    };
  },
  methods: {
    handleAddButton() {
      this.buttons.push({
        text: '',
        event: '',
        data: '',
      });
    },
    handleRemoveButton(index) {
      this.buttons.splice(index, 1);
    },
    handleChangeButtonData(index) {
      if (this.buttons[index].event === 'capture') {
        this.buttons[index].data = {
          key: '',
          value: '',
          next: '',
        };
      } else {
        this.buttons[index].data = '';
      }
    },
    handleButtonData(index) {
      const button = this.buttons[index];
      return button.event === 'goto' ? button.data : button.data.next;
    },
  },
  watch: {
    buttonNode: {
      handler(val) {
        this.buttons = parseButtons(val);
      },
    },
  },
};
</script>

<style>
.button-node {
  margin: 10px 0;
}

.btn-group {
  border: 1px solid #dadada;
  padding: 10px;
}
.btn-item {
  position: relative;
  padding: 20px;
  border: 1px solid #dadada;
  margin: 20px;
}
.btn-close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.btn-close-icon:hover {
  color: aquamarine;
}
</style>
