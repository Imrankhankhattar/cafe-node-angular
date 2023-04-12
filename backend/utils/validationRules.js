const rules = {
    name: { required: true },
    email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
    password: { required: true, minLength: 6, type: 'string' },
    status: { type: 'string', allowedValues: ['active', 'inactive'] },
    contact: { type: 'string' },
    role: { type: 'string', allowedValues: ['admin', 'user'] }
};
const getValidationRules = (entity) => {
    for (const key in entity) {
        if (rules[key]) {
            entity[key] = rules[key];
        }
    }
    return entity;
}

module.exports = { getValidationRules }