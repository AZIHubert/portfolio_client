import gql from 'graphql-tag';

export default gql`
    mutation updateEmployment(
        $employmentId: ID!
        $body: String
        $city: String
        $company: String
        $companyLink: String
        $yearFrom: Int
        $yearTo: Int
        $currentWork: Boolean!
    ) {
        updateEmployment(
            employmentId: $employmentId
            body: $body
            city: $city
            company: $company
            companyLink: $companyLink
            yearFrom: $yearFrom
            yearTo: $yearTo
            currentWork: $currentWork
        ){
            OK
            errors{
                message
                path
            }
            employment{
                _id
                body
                city
                company
                companyLink
                yearFrom
                yearTo
                currentWork
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