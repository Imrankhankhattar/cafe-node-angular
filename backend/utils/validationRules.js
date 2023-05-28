const userRules = {
    name: { required: true, type: 'string' },
    email: { required: true, pattern: /^\S+@\S+\.\S+$/, type: 'string' },
    password: { required: true, minLength: 6, type: 'string' },
    status: { type: 'boolean', allowedValues: [true, false] },
    contact: { type: 'string' },
    role: { type: 'string', allowedValues: ['admin', 'user'] }
};
const categoryRules = {
    name: { required: true, type: 'string' },
    description: {
        required: true,
        type: 'string'
    }
};
const productRules = {
    name: { required: true, type: 'string' },
    description: {
        required: true,
        type: 'string'
    },
    price: {
        required: true,
        type: 'number'
    },
    categoryId: {
        required: true,
        type: 'number'
    },
    status: {
        type: 'string',
    }
};

const productUpdateRules = {
    name: { type: 'string' },
    description: {
        type: 'string'
    },
    price: {
        type: 'number'
    },
    categoryId: {
        type: 'number'
    },
    status: {
        type: 'string'
    }

}
const categoryUpdateRules = {
    name: { type: 'string' },
    description: {
        type: 'string'
    }
};
const updateUserRules = {
    name: { type: 'string' },
    email: { required: true, pattern: /^\S+@\S+\.\S+$/, type: 'string' },
    password: { minLength: 6, type: 'string' },
    status: { type: 'boolean', allowedValues: [true, false] },
    contact: { type: 'string' },
    role: { type: 'string', allowedValues: ['admin', 'user'] }
};

const getValidationRules = (type) => {
    if (type === 'user') {
        return userRules;
    }
    else if (type === 'category') {
        return categoryRules;
    }
    else if (type === 'product') {
        return productRules;
    }
}
const getUpdateValidationRules = (entity, type) => {
    if (type === 'user') {
        for (const key in entity) {
            if (updateUserRules[key]) {
                entity[key] = updateUserRules[key];
            }
        }
    }
    else if (type === 'category') {
        for (const key in entity) {
            if (categoryUpdateRules[key]) {
                entity[key] = categoryUpdateRules[key];
            }
        }
    }
    else if (type === 'product') {
        for (const key in entity) {
            if (productUpdateRules[key]) {
                entity[key] = productUpdateRules[key];
            }
        }
    }
    return entity;
}

module.exports = {
    getValidationRules,
    getUpdateValidationRules
}