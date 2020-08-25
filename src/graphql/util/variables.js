export const blocksVariables = (partId) => ({
    filter: {
        part: { eq: partId }
    },
    sort: [
        { field: 'index' }
    ]
});

export const contentsVariables = blockId => ({
    filter: {
        block: { eq: blockId }
    },
    sort: [
        { field: 'index' }
    ]
});

export const degreesVariables = {
    sort: [
        { field: 'year', order: 'DESC' },
        { field: 'degree' }
    ]
};

export const employmentsVariables = {
    sort: [
        { field: 'yearFrom', order: 'DESC' },
        { field: 'yearTo', order: 'DESC' }
    ]
};

export const imagesVariables = {
    sort: [
        { field: 'title' },
        { field: 'createdAt' }
    ]
};

export const partsVariables = workId => ({
    filter: {
        work: { eq: workId }
    },
    sort: [
        { field: 'index' }
    ]
});

export const traineeshipsVariables = {
    sort: [
        { field: 'year', order: 'DESC' },
        { field: 'company' }
    ]
};

export const typesVariables = {
    sort: [
        { field: 'title' }
    ]
};

export const usersVariables = userId => ({
    sort: [
        { field: 'username' }
    ],
    filter: {
        _id: { ne: userId }
    }
});

export const worksVariables = {
    sort: [
        { field: 'index' }
    ]
};

export const displayedWorksVariables = {
    sort: [
        { field: 'index' }
    ],
    filter: {
        display: true
    },
};

export const workshopsVariables = {
    sort: [
        { field: 'year', order: 'DESC' },
        { field: 'artist' }
    ]
};