const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email: {type: String},
    digit: {type: String},
    validations: {
        email: {
            valid: {type: Boolean, default: false}, code: String
        }
    }
}, {timestamps: true});

schema.plugin(require('mongoose-bcrypt'));

schema.statics.validateInfo = async function (user, type, code) {
    const { modifiedCount } = await this.updateOne({
        _id: user, [`validations.${type}.valid`]: false, [`validations.${type}.code`]: code,
    }, {$set: {[`validations.${type}.valid`]: true}});

    if (modifiedCount === 0) throw new Error('Invalid code or user already validated');
}

module.exports = mongoose.model("users", schema);