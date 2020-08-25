import { UPDATE_USER_ADMIN } from '../mutations';
import { GET_USER } from '../queries';

import { errorsNormalize, usersVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_USER_ADMIN, {
    update(proxy, { data: { updateUserAdmin: { OK, errors, token, refreshToken } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_USER, variables: usersVariables(variables.userId) });
                const getUser = {...data.getUser, isAdmin: true}
                proxy.writeQuery({ query: GET_USER, variables: usersVariables(variables.userId), data: { getUser } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess(token, refreshToken);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});