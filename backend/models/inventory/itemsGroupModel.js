const mongoose = require('mongoose');

const itemsGroupSchema = mongoose.Schema({
    item_group_label: { type: String, required: true, unique: true }
});

const itemsGroupModel = mongoose.model('item-groups', itemsGroupSchema);

module.exports = itemsGroupModel;