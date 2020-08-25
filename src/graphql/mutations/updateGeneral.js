import gql from 'graphql-tag';

export default gql`
    mutation updateGeneral(
        $biography: String
        $email: String
        $phone: String
        $facebook: String
        $instagram: String
        $linkedin: String
        $adressStreet: String
        $adressZip: String
        $adressCountry: String
    ) {
        updateGeneral(
            biography: $biography
            email: $email
            phone: $phone
            facebook: $facebook
            instagram: $instagram
            linkedin: $linkedin
            adressStreet: $adressStreet
            adressZip: $adressZip
            adressCountry: $adressCountry
        ){
            OK
            errors{
                message
                path
            }
            general{
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
    }
`;