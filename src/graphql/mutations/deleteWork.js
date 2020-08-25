import gql from 'graphql-tag';

export default gql`
    mutation deleteWork(
        $workId: ID!
    ) {
        deleteWork(workId: $workId)
    }
`;