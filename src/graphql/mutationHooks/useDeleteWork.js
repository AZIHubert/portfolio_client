import { DELETE_WORK } from '../mutations';
import { GET_WORKS } from '../queries';

import { worksVariables, displayedWorksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_WORK, {
    update(proxy, { data: { deleteWork } }){
        if (deleteWork) {
            try{
                const data = proxy.readQuery({ query: GET_WORKS, variables: worksVariables });
                const getWorks = data.getWorks.filter(work => work._id !== variables.workId);
                proxy.writeQuery({ query: GET_WORKS, variables: worksVariables, data: { getWorks } });
            } catch(e) {}
            try{
                const data = proxy.readQuery({ query: GET_WORKS, variables: displayedWorksVariables });
                const getWorks = data.getWorks.filter(work => work._id !== variables.workId);
                proxy.writeQuery({ query: GET_WORKS, variables: displayedWorksVariables, data: { getWorks } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});