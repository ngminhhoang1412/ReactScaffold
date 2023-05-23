/* eslint-disable import/prefer-default-export */
export const filterNullFieldOfObject = (obj) => {
    const cloneObj = { ...obj };
    const newObj = {};
    Object.keys(cloneObj).forEach((item) => {
        if (cloneObj[item]) {
            newObj[item] = cloneObj[item];
        }
    });
    return newObj;
};
