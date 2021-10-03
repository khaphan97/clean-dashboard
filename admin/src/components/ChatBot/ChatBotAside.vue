<template>
  <div>
    <div class="chatbot-search">
      <el-button @click="handleNavigate" class="btn-add" type="primary">Thêm mới</el-button>
      <el-input
        size="small"
        suffix-icon="el-icon-search"
        placeholder="Search chat node..."
        v-model="searchString"
      />
    </div>
    <el-scrollbar v-if="botData">
      <router-link
        :to="`/chat-bot/edit/${node.name}`"
        :key="index"
        v-for="(node, index) in botData.content"
        class="chatbot-title"
        active-class="active"
        >{{ node.name }}</router-link
      >
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: ['botData'],
  data() {
    return {
      searchString: '',
      updateId: 0,
    };
  },
  name: 'ChatBotAside',
  components: {},
  methods: {
    handleNavigate() {
      const path = '/chat-bot/add';
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
};
</script>

<style>
.el-scrollbar__wrap {
  max-height: calc(85vh - 60px);
}
</style>

<style scoped>
.chatbot-search {
  padding: 10px;
}

.btn-add {
  width: 100%;
  margin-bottom: 10px;
}

.chatbot-title {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #096dd9;
  font-size: 14px;
}

.chatbot-title.active,
.chatbot-title:hover {
  color: #b37feb;
}
</style>
