import gql from 'graphql-tag';

export const botData = gql`
  query Query($id: ID) {
    botData(id: $id) {
      content {
        name
        ui
        type
        videoTitle
        videoUrl
        text
        buttons {
          text
          event
          data
        }
        condition {
          property
          value
          operator
        }
        regex
      }
    }
  }
`;
