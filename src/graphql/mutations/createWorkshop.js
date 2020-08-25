import gql from 'graphql-tag';

export default gql`
    mutation createWorkshop(
        $artist: String!
        $artistLink: String
        $body: String!
        $year: Int!
    ) {
        createWorkshop(
            artist: $artist
            artistLink: $artistLink
            body: $body
            year: $year
        ){
            OK
            errors{
                message
                path
            }
            workshop{
                _id
                artist
                artistLink
                body
                year
                createdAt
                createdBy{
                    _id
                    username
                }
                updatedAt
                updatedBy{
                    _id
                    username
                }
            }
        }
    }
`;