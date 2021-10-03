<template>
  <el-container class="chatbot-container">
    <el-aside class="chatbot-aside">
      <ChatBotAside :botData="botData" />
    </el-aside>
    <el-main style="padding:10px" v-if="botData">
      <router-view :botData="botData" @handleCreateNode="handleCreateNode" />
    </el-main>
  </el-container>
</template>

<script>
import ChatBotAside from '../components/ChatBot/ChatBotAside.vue';
import { botData } from '../graphql/queries';
import { createContent } from '../graphql/mutations';

export default {
  name: 'ChatBot',
  data() {
    return {
      botData: null,
    };
  },
  apollo: {
    botData: {
      query: botData,
      variables: {
        id: '615458a83bcdffe4da541e21',
      },
    },
  },
  methods: {
    handleCreateNode({ nodeId, formData }) {
      if (!nodeId) {
        this.$apollo
          .mutate({
            mutation: createContent,
            variables: {
              idContent: '615458a83bcdffe4da541e21',
              dto: formData,
            },
          })
          .then(data => {
            this.botData = data.data.createContent;
            this.$message({
              type: 'success',
              message: 'Add new node success',
            });
            return true;
          })
          .catch(error => {
            this.$message({
              type: 'danger',
              message: error.message,
            });
            return false;
          });
      }
    },
  },

  components: { ChatBotAside },
};
</script>

<style>
.chatbot-container {
  height: 100%;
  overflow: hidden;
}

.chatbot-aside {
  border-right: 1px solid #dadada;
  max-height: calc(100vh - 60px);
  overflow: hidden;
}
</style>
