import gql from 'graphql-tag';

export default gql`
    query{
        getGeneral{
            biography
            email
            phone
            facebook
            instagram
            linkedin
            adressStreet
            adressZip
            adressCountry
            updatedAt
            updatedBy{
                _id
                username
            }
        }   
    }
`;