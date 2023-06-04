const itemsModel = require("../../../models/Inventory/itemsModel");

const createNewItemsController = async (req, res) => {
    try {
        const url = req.protocol + '://' + req.get('host');
        const reqItems = {
            item_group_id: req.body.item_group_id,
            item_name: req.body.item_name,
            unit: req.body.unit,
            length: req.body.length,
            width: req.body.width,
            height: req.body.height,
            weight: req.body.weight,
            manufacturer: req.body.manufacturer,
            brand: req.body.brand,
            selling_price: req.body.selling_price,
            cost_price: req.body.cost_price,
            description: req.body.description,
            opening_stock: req.body.opening_stock,
            reorder_point: req.body.reorder_point,
            preferred_vendor: req.body.preferred_vendor,
            image_of_item: req.file ? (url + '/images/' + req.file.filename) : (''),
            added_date: req.body.added_date
        }
        const items = new itemsModel(reqItems);
        const data = await items.save();
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = createNewItemsController