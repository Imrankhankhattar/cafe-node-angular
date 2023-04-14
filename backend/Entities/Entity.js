class Entity {
    createdAt;
    updatedAt;
    constructor(validationRules) {
        this.createdAt = new Date();
        this.updatedAt = null;
        this.validationRules = validationRules;
    }
    validate(entity) {
        const rules = this.validationRules;
        const errors = [];
      
        for (const key in rules) {
          const rule = rules[key];
          if (rule.required && !entity[key]) {
            errors.push(`${key} is required`);
          }
          if (rule.type && typeof entity[key] !== rule.type) {
            errors.push(`${key} must be of type ${rule.type}`);
          }
          if (rule.pattern && !rule.pattern.test(entity[key])) {
            errors.push(`${key} must match ${key} pattern`);
          }
          if (rule.minLength && entity[key].toString().length < rule.minLength) {
            errors.push(`${key} must be at least ${rule.minLength} characters`);
          }
          if (rule.maxLength && entity[key].toString().length > rule.maxLength) {
            errors.push(`${key} must be at most ${rule.maxLength} characters`);
          }
          if (rule.allowedValues && !rule.allowedValues.includes(entity[key])) {
            errors.push(`${key} must be one of ${rule.allowedValues}`);
          }
        }
        return errors.length ? errors : null;
      }
      

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}
module.exports = Entity;