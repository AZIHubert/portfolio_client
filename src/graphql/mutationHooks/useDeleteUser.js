import { DELETE_USER } from '../mutations';
import { GET_USERS } from '../queries';

import { errorsNormalize, usersVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_USER, {
    update(proxy, { data: { deleteUser: { OK, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_USERS, variables: usersVariables(variables.userId) });
                const getUsers = data.getUsers.filter(user => user._id !== variables.userId);
                proxy.writeQuery({ query: GET_USERS, variables: usersVariables(variables.userId), data: { getUsers } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});