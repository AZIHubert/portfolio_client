import gql from 'graphql-tag';

export default gql`
    mutation deleteContent(
        $contentId: ID!
    ) {
        deleteContent(
            contentId: $contentId
        )
    }
`;