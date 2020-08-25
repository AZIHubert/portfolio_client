import gql from 'graphql-tag';

export default gql`
    query getUsers(
        $skip: Int,
        $limit: Int,
        $sort: [UserSort!],
        $filter: UserFilter
    ) {
        getUsers(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            username
            firstname
            lastname
            email
            createdAt
            updatedAt
            isAdmin
            profilePicture{
                _id
                url
            }
        }
    }
`;