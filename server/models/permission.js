const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionId: { type: Number, required: true, unique: true},
    permissionName: { type: String, required: true, unique: true }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;