import gql from 'graphql-tag';

export default gql`
    mutation deleteEmployment(
        $employmentId: ID!
    ) {
        deleteEmployment(
            employmentId: $employmentId
        )
    }
`;