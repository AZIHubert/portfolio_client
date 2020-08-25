import gql from 'graphql-tag';

export default gql`
    query getWork($workId: ID){
        getWork(workId: $workId) {
            _id
            title
            titleColor
            index
            date
            display
            thumbnail{
                _id
                url
            }
            parts{
                _id
            }
            types{
                _id
                title
            }
            createdAt
            createdBy{
                _id
                username
                email
            }
            updatedAt
            updatedBy{
                _id
                username
            }
        }
    }
`;