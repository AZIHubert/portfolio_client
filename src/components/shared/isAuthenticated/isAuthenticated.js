import decode from 'jwt-decode';

export default () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const token = localStorage.getItem('token');

    try {
        decode(refreshToken)
        decode(token);
    } catch(err) {
        return false;
    }
    return true;
};