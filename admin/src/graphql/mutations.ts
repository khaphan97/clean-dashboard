import gql from 'graphql-tag';

export const createContent = gql`
  mutation Mutation($idContent: String, $dto: NodeInput) {
    createContent(idContent: $idContent, dto: $dto) {
      content {
        name
        ui
        type
        videoTitle
        videoUrl
        videoHistory
        text
        buttons {
          text
          event
          data
        }
        condition {
          value
          property
          operator
        }
        regex
      }
    }
  }
`;

export const updateContent = gql`
  mutation Mutation($idContent: String, $updatedNode: NodeInput) {
    updateContent(idContent: $idContent, updatedNode: $updatedNode) {
      content {
        name
        ui
        type
        videoTitle
        videoUrl
        videoHistory
        text
        buttons {
          text
          event
          data
        }
        condition {
          value
          property
          operator
        }
        regex
      }
    }
  }
`;
export const deleteContent = gql`
  mutation Mutation($idContent: String, $name: String) {
    deleteContent(idContent: $idContent, name: $name) {
      content {
        name
        ui
        type
        videoTitle
        videoUrl
        videoHistory
        text
        buttons {
          text
          event
          data
        }
        condition {
          value
          property
          operator
        }
        regex
      }
    }
  }
`;
