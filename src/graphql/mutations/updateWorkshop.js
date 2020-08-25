import gql from 'graphql-tag';

export default gql`
    mutation updateWorkshop(
        $workshopId: ID!
        $artist: String
        $artistLink: String
        $body: String
        $year: Int
    ) {
        updateWorkshop(
            workshopId: $workshopId
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