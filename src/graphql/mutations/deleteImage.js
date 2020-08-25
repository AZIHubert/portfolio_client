import gql from 'graphql-tag';

export default gql`
    mutation deleteImage(
        $imageId: ID!
    ) {
        deleteImage(
            imageId: $imageId
        )
    }
`;