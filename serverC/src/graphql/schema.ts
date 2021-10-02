import { gql } from 'apollo-server';
const typeDef = gql`
  type Content {
    content: [Node]
  }

  type Node {
    name: String
    ui: String
    type: String
    videoTitle: String
    videoUrl: String
    text: String
    buttons: [Button]
    condition: [Condition]
    regex: String
  }

  type Button {
    text: String
    event: String
    data: String
  }

  type Condition {
    property: String
    value: String
    operator: String
  }

  input ButtonInput {
    text: String
    event: String
    data: String
  }

  input ConditionInput {
    property: String
    lang: String
    operator: String
  }

  input NodeInput {
    name: String
    ui: String
    type: String
    videoTitle: String
    videoUrl: String
    text: String
    buttons: [ButtonInput]
    condition: [ConditionInput]
    regex: String
  }

  input ContentInput {
    content: [NodeInput]
  }

  type Query {
    getContentById(id: ID): Content
    # getHistory(userId: String): User
  }

  type Mutation {
    createContent(idContent: String, dto: NodeInput): Content
    updateContent(idContent: String, updatedNode: NodeInput): Content
    deleteContent(idContent: String, name: String): Content
    # storeHistory(userId: String, chatArr: chatArrInput): User
  }

  # type Chat {
  #   name: String
  #   text: String
  #   isBotReply: Boolean
  #   isShowItem: Boolean
  #   isShowList: Boolean
  #   regex: String
  #   buttons: [Button]
  #   condition: [Condition]
  # }

  # type User {
  #   userId: String
  #   name: String
  #   chatArr: [Chat]
  # }
  # input ChatInput {
  #   name: String
  #   text: String
  #   isBotReply: Boolean
  #   isShowItem: Boolean
  #   isShowList: Boolean
  #   regex: String
  #   buttons: [ButtonInput]
  #   condition: [ConditionInput]
  # }

  # input chatArrInput {
  #   chatArr: [ChatInput]
  # }
`;

export default typeDef;
