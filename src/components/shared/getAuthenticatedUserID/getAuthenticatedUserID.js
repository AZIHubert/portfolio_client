import decode from 'jwt-decode';

export default () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const decodedToken = decode(refreshToken);
        return decodedToken.user._id;
    } catch(err) {
        return false;
    }
};