import gql from 'graphql-tag';

export default gql`
    mutation updateTraineeship(
        $traineeshipId: ID!
        $body: String
        $city: String
        $company: String
        $companyLink: String
        $year: Int
    ) {
        updateTraineeship(
            traineeshipId: $traineeshipId
            body: $body
            city: $city
            company: $company
            companyLink: $companyLink
            year: $year
        ){
            OK
            errors{
                message
                path
            }
            traineeship{
                _id
                body
                city
                company
                companyLink
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