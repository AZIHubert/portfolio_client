import { UPDATE_USER_EMAIL } from '../mutations';
import { GET_USER } from '../queries';

import { errorsNormalize, usersVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_USER_EMAIL, {
    update(proxy, { data: { updateUserEmail: { OK, user, errors } } }){
        if(OK) {
            try {
                proxy.writeQuery({ query: GET_USER, variables: usersVariables(variables.userId), data: { getUser: user } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess(user);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});