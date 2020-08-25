import React from 'react';

import { useGetUser } from '#graphql';
import getAuthenticatedUserID from '#shared/getAuthenticatedUserID';
import LoadingData from '#shared/LoadingData';

import BackendUserAdminForm from './BackendUserAdminForm';
import BackendUserDeleteForm from './BackendUserDeleteForm';
import BackendUserEmailForm from './BackendUserEmailForm';
import BackendUserInfoForm from './BackendUserInfoForm';
import BackendUserPasswordForm from './BackendUserPasswordForm'

const BackendUser = () => {
    const { user, loading: loadingUser } = useGetUser(getAuthenticatedUserID());

    return loadingUser ? <LoadingData /> : !!Object.keys(user).length && <div>
        <BackendUserInfoForm user={user} />
        <BackendUserEmailForm email={user.email} userId={user._id} />
        <BackendUserPasswordForm userId={user._id} />
        <BackendUserAdminForm userId={user._id} />
        <BackendUserDeleteForm userId={user._id} />
    </div>
};

export default BackendUser;