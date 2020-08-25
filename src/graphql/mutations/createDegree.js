import gql from 'graphql-tag';

export default gql`
    mutation createDegree(
        $city: String!
        $degree: String!
        $school: String!
        $schoolLink: String
        $year: Int!
    ) {
        createDegree(
            city: $city
            degree: $degree
            school: $school
            schoolLink: $schoolLink
            year: $year
        ){
            OK
            errors{
                message
                path
            }
            degree{
                _id
                city
                degree
                school
                schoolLink
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