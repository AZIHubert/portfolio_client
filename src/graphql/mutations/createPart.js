import gql from 'graphql-tag';

export default gql`
    mutation createPart(
        $workId: ID!
        $justifyContent: String
        $backgroundColor: String!
        $disableBackground: Boolean!
        $alignItems: String
        $disablePaddingSm: Boolean
        $paddingTop: Int
        $paddingBottom: Int
        $spacing: Int
    ) {
        createPart(
            workId: $workId
            justifyContent: $justifyContent
            alignItems: $alignItems
            disablePaddingSm: $disablePaddingSm
            paddingTop: $paddingTop
            paddingBottom: $paddingBottom
            spacing: $spacing
            backgroundColor: $backgroundColor
            disableBackground: $disableBackground
        ){
            OK
            errors{
                message
                path
            }
            part{
                _id
                index
                backgroundColor
                disableBackground
                justifyContent
                alignItems
                disablePaddingSm
                paddingTop
                paddingBottom
                spacing
                createdAt
                createdBy{
                    _id
                    email
                }
                updatedAt
                updatedBy{
                    _id
                    email
                }
            }
        }
    }
`;