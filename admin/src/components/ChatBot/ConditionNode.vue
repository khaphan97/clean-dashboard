<template>
  <el-row :gutter="10">
    <el-col :span="24" class="conds-group">
      <h3 style="text-align:center">CONDITIONS</h3>
      <transition-group name="fade">
        <div class="btn-wrapper" v-for="(cond, index) in condition" :key="`${index}abc`">
          <div class="btn-item">
            <span class="btn-close-icon" @click="handleRemoveCondition(index)">
              <i class="el-icon-close"></i>
            </span>
            <h4 style="text-align: center">Condition {{ index + 1 }}</h4>
            <el-row :span="24" :gutter="30">
              <el-col :span="8">
                <el-form-item label="Property">
                  <el-input placeholder="Input property..." v-model="cond.property"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Operator">
                  <el-select
                    placeholder="Select operator ...."
                    v-model="cond.operator"
                    class="cond-operator"
                  >
                    <el-option
                      v-for="(operator, index) in condOperator"
                      :key="index"
                      :value="operator"
                    >
                      {{ operator }}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Value">
                  <el-input placeholder="Input value..." v-model="cond.value"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </transition-group>
      <div style="text-align: center; margin : 20px 0 ">
        <el-button icon="el-icon-plus" circle @click="handleAddCondition"></el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { condOperator } from '@/constants/formData';
export default {
  name: 'condition-node',
  props: ['conditionNode'],
  data() {
    return {
      condition: [],
      condOperator,
    };
  },
  methods: {
    handleAddCondition() {
      this.condition.push({
        property: '',
        value: '',
        operator: '',
      });
    },
    handleRemoveCondition(index) {
      this.condition.splice(index, 1);
    },
  },
  watch: {
    conditionNode: {
      handler(val) {
        this.condition = val;
      },
    },
  },
};
</script>

<style>
.conds-group {
  border: 1px solid #dadada;
  padding: 10px;
}

.cond-operator {
  width: 100%;
}
</style>
