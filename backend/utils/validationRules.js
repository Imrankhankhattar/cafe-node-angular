const userRules = {
    name: { required: true, type: 'string' },
    email: { required: true, pattern: /^\S+@\S+\.\S+$/, type: 'string' },
    password: { required: true, minLength: 6, type: 'string' },
    status: { type: 'string', allowedValues: ['active', 'inactive'] },
    contact: { type: 'string' },
    role: { type: 'string', allowedValues: ['admin', 'user'] }
};
const updateUserRules = {
    name: { type: 'string' },
    email: { required: true, pattern: /^\S+@\S+\.\S+$/, type: 'string' },
    password: { minLength: 6, type: 'string' },
    status: { type: 'string', allowedValues: ['active', 'inactive'] },
    contact: { type: 'string' },
    role: { type: 'string', allowedValues: ['admin', 'user'] }
};

const getValidationRules = (type) => {
    if (type === 'user') {
        return userRules;
    }
}
const getUpdateValidationRules = (entity, type) => {
    if (type === 'user') {
        for (const key in entity) {
            if (updateUserRules[key]) {
                entity[key] = updateUserRules[key];
            }
        }
        return entity;
    }
}

module.exports = {
    getValidationRules,
    getUpdateValidationRules
}