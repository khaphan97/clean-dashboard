import { UserInputError } from 'apollo-server';
const resolvers = {
  Query: {
    getContentById: async (_, { id }, context) => {
      try {
        const result = await context.content.findById(id);
        return result;
      } catch (error) {
        return error.message;
      }
    },
  },
  Mutation: {
    createContent: async (_, { idContent, dto }, context) => {
      try {
        const node = await context.content
          .findOne({ idContent })
          .select({ content: { $elemMatch: { name: dto.name } } });
        console.log(node);
        if (node) return new UserInputError('Node name has exist');

        const result = await context.content.findOneAndUpdate(
          { idContent },
          { $push: { content: { ...dto } } },
          { new: true }
        );

        return result;
      } catch (err) {
        return err.message;
      }
    },

    updateContent: async (_, { idContent, updatedNode }, context) => {
      const result = await context.content.findOneAndUpdate(
        { idContent, 'content.name': updatedNode.name },
        {
          $set: {
            'content.$': updatedNode,
          },
        },
        { new: true }
      );
      return result;
    },

    deleteContent: async (_, { idContent, name }, context) => {
      console.log(name);
      const result = await context.content.findOneAndUpdate(
        { idContent },
        {
          $pull: {
            content: { name },
          },
        },
        { new: true }
      );
      return result;
    },
  },
};

export default resolvers;
