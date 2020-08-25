export const workNormalize = work => ({
    ...work,
    date: new Date(work.date, 1, 1),
    thumbnail: work.thumbnail ? work.thumbnail : {},
    types: work.types.sort((a, b) =>  a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
});

export const userNormalize = user => ({
    ...user,
    profilePicture: user.profilePicture ? user.profilePicture : {}
});

export const errorsNormalize = errors => {
    const newErrors = {};
    errors.forEach(error => newErrors[error.path] = error.message);
    return newErrors;
};